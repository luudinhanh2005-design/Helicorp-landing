import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Features from "@/components/Features";
import Products from "@/components/Products";
import Specs from "@/components/Specs";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CartDrawer from "@/components/CartDrawer";
import Chatbot from "@/components/Chatbot";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Brands />
      <Features />
      <Products />
      <Specs />
      <Newsletter />
      <Footer />
      <CartDrawer />
      <Chatbot />
      <AnalyticsTracker />
    </>
  );
}