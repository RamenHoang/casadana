import { getHeroImages } from './getHeroImages';
import { getHomeGalleryImages } from './getHomeGalleryImages';
import HomePage from './HomePage';

export default function Page() {
  const heroImages = getHeroImages();
  const galleryImages = getHomeGalleryImages();
  return <HomePage heroImages={heroImages} galleryImages={galleryImages} />;
}
