import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";


const Slider = ({ images, id }: { images: string[], id: number }) => {
  const navigate = useNavigate();
  return (
    <Swiper
      navigation
      pagination={{ clickable: true }}
      effect="coverflow"
      centeredSlides
      spaceBetween={20}
      coverflowEffect={{
        rotate: 30,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      modules={[Navigation, Pagination, EffectCoverflow]}
      className={styles.mySwiper}
    >
      {images.map((img, index) => (
        <SwiperSlide onClick={() => navigate(`/products/${id}`)} key={index} className={styles.swiperSlide}>
          <img className={styles.slideImage} src={img} alt={`Slide ${index}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
