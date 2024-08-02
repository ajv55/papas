import Image from "next/image";
import Header from "../components/mainPage/header";
import Hero from "../components/mainPage/hero";
import Menu from "../components/mainPage/menu";
import AboutUs from "../components/mainPage/about";
import OrderOnline from "../components/mainPage/order";
import Contact from "../components/mainPage/contact";
import Footer from "../components/mainPage/footer";

export default function Home() {
  return (
    <div className="w-full">
      <Header/>
      <Hero />
      <Menu />
      <AboutUs />
      <OrderOnline />
      <Contact />
      <Footer />
    </div>
  );
}
