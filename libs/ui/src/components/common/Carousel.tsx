import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperOptions } from 'swiper/types';
import type { SwiperModule } from 'swiper/types';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import React from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';

type SlideComponent = typeof SwiperSlide;

interface CarouselProps {
  swiperOptions?: SwiperOptions;
  modules?: SwiperModule[];
  className?: string;
  onSwiper?: React.ComponentProps<typeof Swiper>['onSwiper'];
  children: (Slide: SlideComponent) => React.ReactNode;
}

const defaultModules: SwiperModule[] = [Navigation, Pagination, Autoplay];

export function Carousel({
  swiperOptions,
  modules: extraModules = [],
  className,
  onSwiper,
  children,
}: CarouselProps) {
  return (
    <Swiper
      modules={[...defaultModules, ...extraModules]}
      className={className}
      onSwiper={onSwiper}
      {...swiperOptions}
    >
      {children(SwiperSlide)}
    </Swiper>
  );
}
