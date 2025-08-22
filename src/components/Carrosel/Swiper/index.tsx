import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, FreeMode, Virtual } from 'swiper/modules';
import styles from './styles.module.scss';
import MovieCard from '../../MovieCard/index';

interface prop {
  movies: Poster[];
  nearEnd?: () => void;
  maxMovies?: number;
  ref?: React.RefObject<any>;
  type?: 'movie' | 'tv';
  className?: string;
  virtual?: boolean;
}

const Swipe = ({
  className,
  movies,
  nearEnd,
  maxMovies = 1000,
  ref,
  type = 'movie',
  virtual,
}: prop) => {
  return (
    <div className={`${styles.section} ${className}`}>
      <Swiper
        modules={[Navigation, Pagination, Mousewheel, FreeMode, ...(virtual ? [Virtual] : [])]}
        className={styles.carrosel}
        slidesPerView={3.5}
        spaceBetween={20}
        navigation={true}
        freeMode={true}
        mousewheel={{ enabled: true, forceToAxis: true, thresholdDelta: 1 }}
        pagination={{ clickable: true, dynamicBullets: true }}
        onReachEnd={() => {
          if (movies.length <= maxMovies && nearEnd) nearEnd();
        }}
        onSwiper={(swiper) => (ref ? (ref.current = swiper) : null)}
        virtual={virtual ?? false}
        breakpoints={{
          0: {
            slidesPerView: 2.5,
            spaceBetween: 5,
            navigation: false,
            mousewheel: false,
          },
          500: {
            slidesPerView: 3.5,
            spaceBetween: 8,
          },
          768: {
            slidesPerView: 5.5,
            spaceBetween: 15,
          },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide className={styles.item} key={movie.id}>
            <MovieCard movie={movie} type={movie.type as 'movie' | 'tv' ?? type} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Swipe;