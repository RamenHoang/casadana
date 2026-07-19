# Server Setup — Ubuntu 22.04

Runbook for deploying the Casadana Homestay site (Next.js 14.2.5) on a fresh Ubuntu 22.04 box.

## 1. Base system update

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git build-essential ufw
```

`build-essential` is a safety net in case `sharp` (native image-processing module) needs to compile instead of using a prebuilt binary.

## 2. Install Node.js 20 LTS

Next.js 14.2.5 requires Node ≥18.17; use 20.x via NodeSource:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v   # should print v20.x
npm -v
```

**If `node -v` prints something old like `v12.22.9`:** that's Ubuntu's own `nodejs` package (from the `universe` repo), not NodeSource's — it got installed instead of, or after, the one above (e.g. the `curl | bash` step silently failed). Fix:

```bash
sudo apt remove -y nodejs npm libnode-dev
sudo apt autoremove -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v   # should now print v20.x
```

## 3. Create a dedicated non-root user (optional but recommended)

```bash
sudo adduser deploy
sudo usermod -aG sudo deploy
su - deploy
```

## 4. Get the code onto the box

```bash
git clone <your-repo-url> casadana
cd casadana
```

## 5. Install dependencies on this machine

```bash
npm ci
```

Don't copy `node_modules` over from another machine (e.g. macOS). `sharp` ships platform-specific native binaries — running `npm ci` here downloads the Linux x64 build automatically. The committed `.next` folder itself is plain JS/HTML/JSON and is portable across platforms, so it doesn't need rebuilding on its own.

## 6. Verify it runs

```bash
npm run start
# in another shell:
curl -I http://localhost:3000
```

Ctrl+C once you see a 200 response. If `.next` is stale relative to the source (something changed after the last local build+commit), run `npm run build` here first.

## 7. Keep it running with pm2

```bash
sudo npm install -g pm2
pm2 start npm --name casadana -- run start
pm2 save
pm2 startup systemd   # prints a command — copy/paste and run it as prompted
```

This restarts the app on crash and on server reboot.

## 8. Install and configure Nginx as a reverse proxy

```bash
sudo apt install -y nginx
```

`/etc/nginx/sites-available/casadana`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/casadana /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 9. Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

## 10. Point DNS

At your domain registrar, add an A record for `your-domain.com` (and `www`) pointing to the server's public IP. Wait for propagation before the next step.

## 11. HTTPS via Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

Certbot edits the Nginx config for you and sets up auto-renewal (check with `systemctl status certbot.timer`).

## 12. Redeploying after future changes

```bash
git pull
npm ci               # only if package.json/lock changed
npm run build        # only if you didn't already build+commit locally
pm2 restart casadana
```

---

**Open decision:** currently `.next` is committed and built locally before each push. Consider whether to keep that manual flow or move to a CI/CD step (GitHub Actions, or a `git pull && npm run build` directly on the server) so a forgotten local build can't ship stale output.
