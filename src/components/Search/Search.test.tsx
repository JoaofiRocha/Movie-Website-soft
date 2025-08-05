import { render, fireEvent, act } from '@testing-library/react';
import { makeServer } from '../../server';
import Search from '.';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, beforeEach } from 'vitest';
import { describe, test, expect} from 'vitest';
import '@testing-library/jest-dom';

const App = () => (
    <BrowserRouter>
        <Search type="search" placeholder='Search for a movie...' />
    </BrowserRouter>
);

let server: any;

beforeEach(() => {
    server = makeServer({ environment: 'test' });
});

afterEach(() => {
    server.shutdown();
});

describe('Search Component', () => {
    test('renders search input', () => {
        const { getByPlaceholderText } = render(<App />);

        const searchInput = getByPlaceholderText('Search for a movie...');
        expect(searchInput).toBeInTheDocument();
    });

    test('updates input value when typing', () => {
        const { getByPlaceholderText } = render(<App />);
        const searchInput = getByPlaceholderText('Search for a movie...');

        fireEvent.change(searchInput, { target: { value: 'filme bom' } });

        expect(searchInput).toHaveValue('filme bom');
    });

    test('can focus input', () => {
        const { getByRole } = render(<App />);
        const searchInput = getByRole('searchbox');

        act(() => { searchInput.focus(); })


        expect(searchInput).toHaveFocus();
    });

    test('search for movie and finds it', async () => {
        server.createList('movie', 3)

        const { getByRole, findByText, queryByText} = render(<App />);
        const searchInput = getByRole('searchbox') as HTMLInputElement;

        expect(queryByText('movie 2')).not.toBeInTheDocument();

        await act(async () => {
            fireEvent.change(searchInput, { target: { value: 'movie 2' } });
        });

        expect(queryByText('movie 2')).not.toBeInTheDocument();

        act(() => {
            searchInput.focus();
        })


        const movieElement = await findByText('movie 2');
        expect(movieElement).toBeInTheDocument();

    });

    test('search for movie and see if api was called once', async () => {
        server.createList('movie', 3);

        const { getByRole } = render(<App />);
        const searchInput = getByRole('searchbox') as HTMLInputElement;

        await act(async () => {
            fireEvent.change(searchInput, { target: { value: 'movie 2' } });
        });

        expect(server.schema.movies.all().length).toBe(3);

    });
});