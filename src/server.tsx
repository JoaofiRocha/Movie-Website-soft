import { Server, Model, Factory } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
    let server = new Server({
        environment,
        models: {
            movie: Model
        },

        factories: {
            movie: Factory.extend({
                title(i: number) {
                    return `movie ${i + 1}`;
                },
                id(i: number) {
                    return i;
                },
                overview: 'overview test',
                popularity: 100,
                poster_path: '/poster.jpg',
                rating: 7.5,
                release_year: '2025'
            })
        },

        seeds(server: any) {
            server.create('movie', { 
                title: 'filme bom', 
                id: 123,
                overview: 'Um filme muito bom',
                popularity: 85.5,
                poster_path: '/filme-bom.jpg',
                rating: 8.5,
                release_year: '2024'
            });
            server.create('movie', { 
                title: 'filme ruim', 
                id: 1234,
                overview: 'Um filme ruim',
                popularity: 25.2,
                poster_path: '/filme-ruim.jpg',
                rating: 3.2,
                release_year: '2023'
            });
        },

        routes() {
            this.get('https://api.themoviedb.org/3/movie/popular', (schema: any) => {
                return schema.movies.all();
            });

            this.get('https://api.themoviedb.org/3/search/movie', (schema: any, request: any) => {
                const query = request.queryParams.query;

                const allMovies = schema.movies.all().models;
                const filteredMovies = allMovies.filter((movie: any) =>
                    movie.title.toLowerCase().includes(query?.toLowerCase() || '')
                );

                return {
                    results: filteredMovies
                };
            });
        }
    });

    return server;
}