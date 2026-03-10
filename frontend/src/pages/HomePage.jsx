import HeroCarousel from "../components/home/HeroCarousel";
import CategorySection from "../components/home/CategorySection";
import NewArrivals from "../components/home/NewArrivals";
import FAQ from "../components/home/FAQ";
// className="min-h-screen flex flex-col gap-12 bg-gray-50"

const HomePage = () => {
  return (
    <div > 

      <HeroCarousel />

      <CategorySection/>

      <NewArrivals />

      <FAQ />
</div>
  );
};

export default HomePage;