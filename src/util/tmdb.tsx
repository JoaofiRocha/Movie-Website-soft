export const getTMDBImageUrl = (path: string, size: string = 'w45') => {
    return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const getStarsRating = (rating : number) => {
    let string = '';
    let n = rating;
    while(n > 0){
        if(n > 1){
            string += '★';
            n= n-1;
        }
        else{
            string += '☆';
            n = 0;
        }
    }

    return string;
};