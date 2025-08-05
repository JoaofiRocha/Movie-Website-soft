// Add this line if @types/mirage is not available
// declare module 'mirage';
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
                overview: 'Sample overview',
                popularity: 100,
                poster_path: '/sample-poster.jpg',
                rating: 7.5,
                release_year: '2024'
            })
        },

        seeds(server : any) {
            server.create('movie', { title: 'filme bom', id: 123 });
            server.create('movie', { title: 'filme ruim', id: 1234 });
        },

        routes() {
            this.get('https://api.themoviedb.org/3/movie/popular', (schema: any) => {
                return schema.movies.all();
            });
        }
    });

    return server;
}