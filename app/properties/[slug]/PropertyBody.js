'use client';

import { useLang } from '../../LangContext';
import { UI, messengerUrl } from '../../content';
import BackLink from './BackLink';

export default function PropertyBody({ property }) {
  const { lang } = useLang();
  const t = UI[lang];

  return (
    <div className="container property-page-body">
      <h1>{property ? property.name : 'Casadana Homestay'}</h1>
      {property && <p className="property-page-addr">{property.addr}</p>}
      <p className="property-page-copy">{t.comingSoonBody}</p>
      <a className="btn-dark" href={messengerUrl} target="_blank" rel="noreferrer">
        {t.bookHero}
      </a>
      <BackLink style={{ fontSize: 13, color: '#af6a35', marginTop: 8 }}>
        {t.backHome}
      </BackLink>
    </div>
  );
}
