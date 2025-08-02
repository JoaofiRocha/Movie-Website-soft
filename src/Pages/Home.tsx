import DisplayMovie from '../components/DisplayMovie/DisplayMovie';

const Home = () => {




    return (
        <main className="main-app">
            <DisplayMovie/>
            <h1> Vamos Pesquisar por:   </h1>
            <button className='btn'> Teste</button>
            <textarea className='search --focus' placeholder='TEste'></textarea>
            <textarea>aa</textarea>
        </main>
    )
}

export default Home