import { useEffect, useRef } from 'react';
import { EffectFade, Parallax } from 'swiper/modules';

// import { useApi } from '../../context/ApiContext';
// import { getApiUrl } from '../../utils/api';
import { Icon, CustomButton, Carousel } from '@lib/ui';

const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);
  // const { userSlug } = useApi();

  useEffect(() => {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const bgElement = document.querySelector('.bg-scroll-animate');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove(
              'opacity-0',
              'translate-y-10',
              'blur-sm',
              'scale-110'
            );
            entry.target.classList.add(
              'opacity-100',
              'translate-y-0',
              'blur-0',
              'scale-100'
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((el) => observer.observe(el));
    if (bgElement) observer.observe(bgElement);

    const handleScroll = (e: Event) => {
      const el = bgElement as HTMLElement;
      if (!el) return;
      const target = e.target as HTMLElement;
      const currentScrollY = target.scrollTop;
      el.style.backgroundPositionY = `${currentScrollY * 0.3}px`;
    };

    const scrollContainer = document.querySelector('.main-canvas');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // const outletName = userSlug?.name || 'Order It';
  const outletName = 'Order It';

  // Use cover_image from API if available, else fallback
  // const heroBanner = userSlug?.cover_image
  //   ? getApiUrl(userSlug.cover_image)
  //   : '/homepage-hero-banner.png';

  const heroBanner =
    'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80';

  // Use mid_page_slider from API if available, else hardcoded fallbacks
  // const sliderImages =
  //   userSlug?.mid_page_slider && userSlug.mid_page_slider.length > 0
  //     ? userSlug.mid_page_slider
  //         .sort((a, b) => a.order - b.order)
  //         .map((item) => getApiUrl(item.image))
  //     : [
  //         'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
  //         'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
  //         'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
  //       ];

  const sliderImages = [
    'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
  ];

  const scrollToNext = () => {
    document
      .getElementById('next-section')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="overflow-x-hidden">
      {/* Hero Section */}
      <div
        className="bg-scroll-animate h-[85vh] bg-cover bg-center opacity-0 transition-all duration-[1500ms] ease-out"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="flex h-full flex-col items-center justify-center bg-black/30 px-4 text-center text-white backdrop-blur-[2px]">
          <h2 className="scroll-reveal translate-y-10 text-2xl font-light tracking-[0.2em] uppercase opacity-0 blur-sm transition-all duration-1000 ease-out md:text-[54px]">
            Welcome To
          </h2>
          <h1 className="scroll-reveal translate-y-10 text-6xl leading-none font-bold tracking-[8px] uppercase opacity-0 blur-sm transition-all duration-1000 ease-out md:text-[110px]">
            {outletName}
          </h1>
          <span className="scroll-reveal mt-4 translate-y-10 text-xl font-light italic opacity-0 blur-sm transition-all duration-1000 ease-out md:text-[34px]">
            It’s all about Good Food , Good Food and Good Food
          </span>
          <div className="mt-12 transition-all duration-1000 ease-out translate-y-10 opacity-0 scroll-reveal blur-sm">
            <CustomButton
              label="Explore More"
              onClick={scrollToNext}
              className="group relative flex items-center gap-3 overflow-hidden border border-white bg-transparent !px-8 !py-4 text-lg font-light tracking-widest uppercase text-white transition-all duration-500 hover:bg-white hover:text-black"
              icon={
                <Icon
                  name="ArrowRight"
                  className="transition-transform group-hover:translate-x-1"
                />
              }
            />
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div id="next-section" className="relative py-20 md:py-32">
        <div className="absolute inset-0 z-0 bg-[#121212]" />

        <div className="relative z-10 flex flex-col items-center w-full py-12 lg:flex-row lg:py-0">
          <div className="flex w-full flex-col justify-center text-white lg:w-1/2 px-6 md:px-12 lg:pl-[10vw] lg:pr-16">
            <h2 className="scroll-reveal mb-2 translate-y-10 text-3xl font-light tracking-wide opacity-0 blur-sm transition-all duration-1000 ease-out md:text-[44px]">
              Welcome To
            </h2>
            <h1 className="scroll-reveal translate-y-10 text-5xl leading-tight font-bold tracking-tight opacity-0 blur-sm transition-all duration-1000 ease-out md:text-[80px]">
              {outletName}
            </h1>
            <p className="scroll-reveal mt-8 translate-y-10 text-lg leading-relaxed font-light text-gray-400 opacity-0 blur-sm transition-all duration-1000 ease-out md:text-[24px]">
              Experience culinary excellence with every bite. We bring you the
              finest flavors crafted with passion and fresh ingredients.
            </p>
            <div className="mt-12 transition-all duration-1000 ease-out translate-y-10 opacity-0 scroll-reveal blur-sm">
              <CustomButton
                label="Book a Table"
                className="w-fit border border-orange bg-transparent !px-8 !py-3 text-sm tracking-widest uppercase text-orange transition-all duration-300 hover:bg-orange hover:text-white"
              />
            </div>
          </div>

          <div className="relative z-10 flex justify-center w-full px-6 mt-20 lg:w-1/2 lg:justify-start md:px-12 lg:px-0 lg:pl-20 lg:mt-0">
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-0.5 backdrop-blur-sm shadow-2xl w-full max-w-[400px]">
              <Carousel
                modules={[EffectFade, Parallax]}
                className="aspect-square min-h-[400px] w-full mx-auto rounded-xl"
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                swiperOptions={{
                  effect: 'fade',
                  parallax: true,
                  autoplay: { delay: 5000, disableOnInteraction: false },
                  pagination: { clickable: true },
                  loop: true,
                }}
              >
                {(Slide) => (
                  <>
                    {sliderImages.map((src, index) => (
                      <Slide key={index}>
                        <div
                          className="absolute inset-0 transition-transform duration-1000"
                          data-swiper-parallax="20%"
                        >
                          <img
                            src={src}
                            alt={`slide-${index}`}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        {/* Parallax elements within the slide */}
                        <div className="absolute z-10 hidden bottom-12 left-12 md:block">
                          <h3
                            className="text-4xl font-black text-white"
                            data-swiper-parallax="-300"
                          >
                            {outletName} Signature
                          </h3>
                          <div
                            className="w-20 h-1 mt-2 bg-orange"
                            data-swiper-parallax="-200"
                          />
                        </div>
                      </Slide>
                    ))}
                  </>
                )}
              </Carousel>

              {/* Custom Navigation */}
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute z-20 p-3 text-white transition-all -translate-y-1/2 border rounded-full cursor-pointer left-4 top-1/2 border-white/20 bg-black/20 backdrop-blur-md hover:bg-orange hover:border-orange"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute z-20 p-3 text-white transition-all -translate-y-1/2 border rounded-full cursor-pointer right-4 top-1/2 border-white/20 bg-black/20 backdrop-blur-md hover:bg-orange hover:border-orange"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
