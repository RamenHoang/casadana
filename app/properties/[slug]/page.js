import { propertiesData } from '../../content';
import { getGalleryImages } from './getGalleryImages';
import PropertyGallery from './PropertyGallery';
import BackLink from './BackLink';

export function generateStaticParams() {
  return propertiesData.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const property = propertiesData.find((p) => p.slug === params.slug);
  return { title: property ? `${property.name} — Casadana Homestay` : 'Casadana Homestay' };
}

export default function PropertyPage({ params }) {
  const property = propertiesData.find((p) => p.slug === params.slug);
  const images = getGalleryImages(params.slug, property ? property.img : '/assets/hero-exterior.jpg');

  return (
    <div className="property-page">
      <PropertyGallery images={images} alt={property ? property.name : 'Casadana'} />

      <div className="container property-page-body">
        <h1>{property ? property.name : 'Casadana Homestay'}</h1>
        {property && <p className="property-page-addr">{property.addr}</p>}
        <p className="property-page-copy">
          This property page is being prepared — full room details and booking will live here.
          In the meantime, message us on Messenger for photos, rates and availability.
        </p>
        <a className="btn-dark" href="https://m.me/casadana.home" target="_blank" rel="noreferrer">
          BOOK VIA MESSENGER
        </a>
        <BackLink style={{ fontSize: 13, color: '#af6a35', marginTop: 8 }}>
          ← Back to home
        </BackLink>
      </div>
    </div>
  );
}
