import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import banner1 from "../../assets/images/banners/banner1.png";
import banner2 from "../../assets/images/banners/banner2.png";
import banner3 from "../../assets/images/banners/banner3.png";

const banners = [
  { id: 1, src: banner1, alt: "Banner 1" },
  { id: 2, src: banner2, alt: "Banner 2" },
  { id: 3, src: banner3, alt: "Banner 3" },
];

function BannerCarousel() {
  return (
    <Swiper modules={[Autoplay]} autoplay={{ delay: 3000 }} loop={true}>
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <img
            src={banner.src}
            alt={banner.alt}
            className="w-[1200] h-[400px]"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default BannerCarousel;
