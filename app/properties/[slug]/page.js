import { propertiesData } from '../../content';
import { getGalleryImages } from './getGalleryImages';
import Nav from '../../Nav';
import PropertyGallery from './PropertyGallery';
import PropertyBody from './PropertyBody';

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
      <Nav minimal={true} />
      <PropertyGallery images={images} alt={property ? property.name : 'Casadana'} />
      <PropertyBody property={property} />
    </div>
  );
}
