import ChefHero from '../components/chefs/ChefHero';
import ChefSpotlight from '../components/chefs/ChefSpotlight';
import ChefDay from '../components/chefs/ChefDay';
import ChefMenu from '../components/chefs/ChefMenu';
import ChefKitchens from '../components/chefs/ChefKitchens';
import ChefHygiene from '../components/chefs/ChefHygiene';
import ChefCta from '../components/chefs/ChefCta';

export default function ChefsCorner() {
  return (
    <>
      <ChefHero />
      <ChefSpotlight />
      <ChefDay />
      <ChefMenu />
      <ChefKitchens />
      <ChefHygiene />
      <ChefCta />
    </>
  );
}
