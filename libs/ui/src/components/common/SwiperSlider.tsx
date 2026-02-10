import React from 'react';

// Import Swiper styles
import 'swiper/css';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import type { SwiperModule } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';

interface SwiperSliderProps {
  slides: React.ReactNode[];
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  navigation?: boolean;
  pagination?: boolean;
  scrollbar?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  breakpoints?: {
    [width: number]: {
      slidesPerView: number | 'auto';
      spaceBetween?: number;
    };
  };
  className?: string;
  slideClassName?: string;
}

export const SwiperSlider: React.FC<SwiperSliderProps> = ({
  slides,
  slidesPerView = 5,
  spaceBetween = 30,
  navigation = true,
  pagination = true,
  scrollbar = false,
  loop = false,
  autoplay = false,
  autoplayDelay = 3000,
  breakpoints,
  className = '',
  slideClassName = '',
}) => {
  // Determine which modules to use
  const modules: SwiperModule[] = [];
  if (navigation) modules.push(Navigation);
  if (pagination) modules.push(Pagination);
  if (scrollbar) modules.push(Scrollbar);
  if (autoplay) modules.push(Autoplay);

  return (
    <Swiper
      modules={modules}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      navigation={navigation}
      pagination={pagination ? { clickable: true } : false}
      scrollbar={scrollbar ? { draggable: true } : false}
      loop={loop}
      autoplay={
        autoplay ? { delay: autoplayDelay, disableOnInteraction: false } : false
      }
      breakpoints={breakpoints}
      className={`swiper-slider ${className}`}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className={`swiper-slide ${slideClassName}`}>
          {slide}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperSlider;
