import { render, fireEvent } from '@testing-library/react';
import { makeServer } from '../../server';
import Search from './Search';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, beforeEach } from 'vitest';
import { describe, test, expect} from 'vitest';
import '@testing-library/jest-dom';

const App = () => (
    <BrowserRouter>
        <Search type="search" />
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
        const { getByRole } = render(<App/>);

        const searchInput = getByRole('textbox');
        expect(searchInput).toBeInTheDocument();
    });

    test('searches for movies when typing', async () => {
        const { getByRole, findByText } = render(<App/>);

        const searchInput = getByRole('searchbox');
        fireEvent.change(searchInput, { target: { value: 'filme bom' } });

        const movieTitle = await findByText('filme bom');
        expect(movieTitle).toBeInTheDocument();
    });
});