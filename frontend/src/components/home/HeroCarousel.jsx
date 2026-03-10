import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Keyboard, Autoplay } from "swiper/modules";

const HeroCarousel = () => {

  const navigate = useNavigate();

  const scrollToNewArrivals = () => {
    document
      .getElementById("new-arrivals")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (

    <section className="max-w-7xl mx-auto">

      <Swiper
        modules={[Navigation, Pagination, Keyboard, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        keyboard
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className="w-full h-[48vh] md:h-[56vh] rounded-xl overflow-hidden shadow-md"
      >

        {/* Slide 1 */}
        <SwiperSlide className="relative bg-gradient-to-r from-blue-200 via-blue-400 to-indigo-400">

          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">

            <h2 className="text-3xl md:text-5xl font-bold mb-3">
              Free Delivery Above ₹499
            </h2>

            <p className="text-lg md:text-xl mb-6 opacity-90">
              Shop your favourite products with free shipping.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold shadow transition"
            >
              Shop Now
            </button>

          </div>

        </SwiperSlide>


        {/* Slide 2 */}
        <SwiperSlide className="relative bg-gradient-to-r from-orange-200 via-red-300 to-pink-400">

          <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">

            <h2 className="text-3xl md:text-5xl font-bold mb-3">
              Mega Summer Sale
            </h2>

            <p className="text-lg md:text-xl mb-6">
              Up to 40% off on electronics and fashion.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold shadow transition"
            >
              View Deals
            </button>

          </div>

        </SwiperSlide>


        {/* Slide 3 */}
        <SwiperSlide className="relative bg-gradient-to-r from-purple-200 via-indigo-300 to-blue-400">

          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">

            <h2 className="text-3xl md:text-5xl font-bold mb-3">
              Discover New Arrivals
            </h2>

            <p className="text-lg md:text-xl mb-6">
              Explore the latest products added to our store.
            </p>

            <button
              onClick={scrollToNewArrivals}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold shadow transition"
            >
              Explore Now
            </button>

          </div>

        </SwiperSlide>

      </Swiper>

    </section>

  );

};

export default HeroCarousel;