import { describe, test, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import type { Movie } from '../../../types/types';
import SearchDropdown from './SearchDropdown';

const mockMovies: Movie[] = [
    {
        id: 617126,
        overview: "Against the vibrant backdrop of a 1960s-inspired, retro-futuristic world, Marvel's First Family is forced to balance their roles as heroe…",
        popularity: 299.6551,
        poster_path: "/x26MtUlwtWD26d0G0FXcppxCJio.jpg",
        rating: 7.325,
        release_year: "2025",
        title: "The Fantastic 4: First Steps"
    },
    {
        id: 552524,
        overview: "The wildly funny and touching story of a lonely Hawaiian girl and the fugitive alien who helps to mend her broken family.",
        popularity: 357.7813,
        poster_path: "/tUae3mefrDVTgm5mRzqWnZK6fOP.jpg",
        rating: 7.334,
        release_year: "2024",
        title: "Lilo & Stitch",
    },
    {
        id: 404,
        overview: '',
        popularity: 2,
        poster_path: '',
        rating: 0,
        release_year: '',
        title: ''
    }
];

vi.mock('../../../util/tmdb', () => ({
    getTMDBImageUrl: vi.fn((path: string, size: string = 'w500') => `https://image.tmdb.org/t/p/${size}${path}`)
}));

describe('SearchDropdown', () => {
    test('renders movies on the SearchDropdown', () => {
        const { getByText } = render(
            <BrowserRouter>
                <SearchDropdown movies={mockMovies} />
            </BrowserRouter>
        );

        expect(getByText('The Fantastic 4: First Steps')).toBeInTheDocument();
        expect(getByText('7.325')).toBeInTheDocument();
        expect(getByText('2025')).toBeInTheDocument();
        expect(getByText('Lilo & Stitch')).toBeInTheDocument();
        expect(getByText('7.334')).toBeInTheDocument();
        expect(getByText('2024')).toBeInTheDocument();
    });

    test('renders correct image src and alt attributes', () => {
        const { container } = render(
            <BrowserRouter>
                <SearchDropdown movies={mockMovies} />
            </BrowserRouter>
        );

        const images = container.querySelectorAll('img');
        expect(images).toHaveLength(2);

        expect(images[0]).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w45/x26MtUlwtWD26d0G0FXcppxCJio.jpg');
        expect(images[0]).toHaveAttribute('alt', expect.stringContaining('The Fantastic 4: First Steps'));

        expect(images[1]).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w45/tUae3mefrDVTgm5mRzqWnZK6fOP.jpg');
        expect(images[1]).toHaveAttribute('alt', expect.stringContaining('Lilo & Stitch'));
    });

    test('movie cards contain correct navigation links', () => {
        const { container } = render(
            <BrowserRouter>
                <SearchDropdown movies={mockMovies} />
            </BrowserRouter>
        );

        const links = container.querySelectorAll('.search__dropdown__item');
        expect(links[0]).toHaveAttribute('href', 'https://www.themoviedb.org/movie/617126')
    });

    test('renders no dropdown items if movies list is empty', () => {
        const { queryAllByRole } = render(
            <BrowserRouter>
                <SearchDropdown movies={[]} />
            </BrowserRouter>
        );

        expect(queryAllByRole('link')).toHaveLength(0);
    });


});