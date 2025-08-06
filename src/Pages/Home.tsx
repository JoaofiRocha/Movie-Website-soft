import DisplayMovie from '../components/DisplayMovie';
import Carrosel from '../components/Carrosel';
import { useSearchStore } from '../store/useSearchStore';


const Home = () => {
    const search = useSearchStore((state => state.query));
    



    const movie: Movie = {
        id: 1087192,
        overview: "On the rugged isle of Berk, where Vikings and dragons have been bitter enemies for generations, Hiccup stands apart, defying centuries o…",
        popularity: 481.5359,
        poster_path: "/q5pXRYTycaeW6dEgsCrd4mYPmxM.jpg",
        rating: 8.034,
        release_year: "2025",
        title: "How to Train Your Dragon"
    };


    return (
        <main className="main-app">
            <DisplayMovie />
            <h1> Vamos Pesquisar por: {search} </h1>

            <Carrosel/>

            <button className='btn'> Teste</button>
            <textarea className='search --focus' placeholder='Teste'></textarea>
            <textarea>aa</textarea>
        </main>
    )
}

export default Home