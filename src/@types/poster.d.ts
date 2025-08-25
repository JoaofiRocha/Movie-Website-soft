interface Poster{
    id: number,
    poster_path: string,
    title: string,
    type: 'movie' | 'tv',
    rating: number,
    area?: string,
  }