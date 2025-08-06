import { genreList } from "./list";

export const getTMDBImageUrl = (path: string, size: string = 'w45') => {
    return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const getStarsRating = (rating: number) => {
    let string = '';
    let n = rating;
    for (let i = 0; i < 10; i++) {
        if (n > 0.5) {
            string += '★';
            n = n - 1;
        }
        else {
            string += '☆';
        }
    }
    return string;
};


export function findGenres(genres: number[]){
    return genres.map( g => findGenre(g));
  }

  export function findGenre(genre: number){
    const found = genreList.find(g => g.id === genre);
    return found ? found.name : undefined;
  }