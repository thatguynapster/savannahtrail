import TestimonialsSection from "@/components/testimonials-section";
import DestinationSection from "@/components/destination-section";
import ServicesSection from "@/components/services-section";
import PackagesSection from "@/components/packages-section";
import BookingSection from "@/components/booking-section";
import ToursSection from "@/components/tour-section";
import HeroSection from "@/components/hero-section";

export default function Home() {


  return (
    <>
      <HeroSection />

      {/* <Brands /> */}

      <ServicesSection />

      <DestinationSection />

      <BookingSection />

      <ToursSection />

      {/* <CategoriesSection /> */}

      <PackagesSection />

      <TestimonialsSection />

    </>
  );
}
