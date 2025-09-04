import Hero from "@/components/frontpage/Hero";
import Featured from "@/components/frontpage/Featured";
import CTA from "@/components/frontpage/CTA";
import NewArrivals from "@/components/frontpage/NewArrivals";
import FAQ from "@/components/frontpage/FAQ";
import Categories from "@/components/frontpage/Categories";
import Newsletter from "@/components/frontpage/Newsletter";
import FeaturedProducts from "@/components/frontpage/FeaturedProducts";
import FeaturedBrand from "@/components/frontpage/FeaturedBrand";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Hero />
      <Featured />
      <CTA />
      <FeaturedProducts />
      <NewArrivals />
      <Categories />
      {/*
      <FeaturedBrand />
      */}
      <FAQ />
      <Newsletter />
    </main>
  );
}
