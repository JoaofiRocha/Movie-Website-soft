export const getTMDBImageUrl = (path: string, size: string = 'w45') => {
    return `https://image.tmdb.org/t/p/${size}${path}`;
};