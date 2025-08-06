import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, FreeMode} from 'swiper/modules';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/mousewheel';
// import 'swiper/scss/freemode';
import 'swiper/scss';

import styles from './styles.module.scss';

import MovieCard from '../../MovieCard/index';

interface prop{
    movies: Movie[],
    nearEnd?: () => void,
    maxMovies?: number
}


const Swipe = ({ movies, nearEnd, maxMovies = 1000}: prop) => {

    return (
        <section className={styles.section}>
            <Swiper
                modules={[Navigation, Pagination, Mousewheel, FreeMode]}
                className={styles.carrosel}
                slidesPerView={3.5}
                spaceBetween={20}
                navigation={true}
                freeMode={true}
                mousewheel={{enabled:true, forceToAxis:true ,thresholdDelta:1}}
                pagination={{ clickable: true, dynamicBullets: true }}
                onReachEnd={() => {
                    if (movies.length <= maxMovies && nearEnd)
                        nearEnd();

                }}
                breakpoints={{
                    0: {
                        slidesPerView: 2.5,
                        spaceBetween: 5,
                        pagination: false,
                        navigation: false,
                        mousewheel:false
                    },
                    500: {
                        slidesPerView: 3.5,
                        spaceBetween: 8
                    },
                    768: {
                        slidesPerView: 5.5,
                        spaceBetween: 15
                    }
                }}
            >
                {movies.map((movie, idx) => (
                    <SwiperSlide className={styles.item} key={movie.id ?? idx}>
                        <MovieCard movie={movie} />
                    </SwiperSlide>
                ))}

            </Swiper>
        </section>
    )
}

export default Swipe;


