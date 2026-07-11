import Link from 'next/link';
import { propertiesData } from '../../content';

export function generateStaticParams() {
  return propertiesData.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const property = propertiesData.find((p) => p.slug === params.slug);
  return { title: property ? `${property.name} — Casadana Homestay` : 'Casadana Homestay' };
}

export default function PropertyPage({ params }) {
  const property = propertiesData.find((p) => p.slug === params.slug);

  return (
    <div className="placeholder-page">
      <img
        src={property ? property.img : '/assets/hero-exterior.jpg'}
        alt={property ? property.name : 'Casadana'}
        style={{ width: 220, height: 160, objectFit: 'cover', borderRadius: 4, marginBottom: 8 }}
      />
      <h1>{property ? property.name : 'Casadana Homestay'}</h1>
      {property && <p style={{ margin: 0 }}>{property.addr}</p>}
      <p>
        This property page is being prepared — full room details, photos and booking will live here.
        In the meantime, message us on Messenger for photos, rates and availability.
      </p>
      <a
        className="btn-dark"
        href="https://m.me/casadana.home"
        target="_blank"
        rel="noreferrer"
      >
        BOOK VIA MESSENGER
      </a>
      <Link href="/" style={{ fontSize: 13, color: '#af6a35', marginTop: 8 }}>
        ← Back to home
      </Link>
    </div>
  );
}
