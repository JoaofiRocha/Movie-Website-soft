import DisplayMovie from '../components/DisplayMovie';
import MovieCard from '../components/MovieCard';
import { useSearchStore } from '../store/useSearchStore';

const Home = () => {
    const search = useSearchStore((state => state.query));




    return (
        <main className="main-app">
            <DisplayMovie/>
            <h1> Vamos Pesquisar por: {search} </h1>

            <MovieCard movie="title" />

            <button className='btn'> Teste</button>
            <textarea className='search --focus' placeholder='Teste'></textarea>
            <textarea>aa</textarea>
        </main>
    )
}

export default Home