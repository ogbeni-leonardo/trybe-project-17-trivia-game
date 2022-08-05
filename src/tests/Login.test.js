import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

describe('Testa a tela de login', () => {
    it('Testa o input de nome', () => {
        render(<BrowserRouter><App /></BrowserRouter>);
        const nameInput = screen.getByTestId('input-player-name');

        expect(nameInput).toBeInTheDocument();

        userEvent.type(nameInput, 'test');

        expect(nameInput).toHaveValue('test');
    });

    it('Testa o input de email', () => {
        render(<BrowserRouter><App /></BrowserRouter>);
        const emailInput = screen.getByTestId('input-gravatar-email');

        expect(emailInput).toBeInTheDocument();

        userEvent.type(emailInput, 'test');

        expect(emailInput).toHaveValue('test');
    });

    it('Testa se o botão "Play" é renderizado', () => {
        render(<BrowserRouter><App /></BrowserRouter>);
        const playButton = screen.getByRole('button', { name: 'Play' });

        expect(playButton).toBeInTheDocument();
    });

    it('Testa se o botão "Play" é desabilitado se não tiver nada nos inputs', () => {
        render(<BrowserRouter><App /></BrowserRouter>);
        const playButton = screen.getByRole('button', { name: 'Play' });

        expect(playButton).toBeDisabled();
    });

    it('Testa se o botão "Play" é desabilitado se não tiver nada em name, mas tiver em email', () => {
        render(<BrowserRouter><App /></BrowserRouter>);
        const nameInput = screen.getByTestId('input-player-name');
        const playButton = screen.getByRole('button', { name: 'Play' });

        userEvent.type(nameInput, 'test');

        expect(playButton).toBeDisabled();
    });

    it('Testa se o botão "Play" é desabilitado se não tiver nada em email, mas tiver em name', () => {
        render(<BrowserRouter><App /></BrowserRouter>);
        const emailInput = screen.getByTestId('input-gravatar-email');
        const playButton = screen.getByRole('button', { name: 'Play' });

        userEvent.type(emailInput, 'test');

        expect(playButton).toBeDisabled();
    });

    it('Testa se o botão "Play" é habilitado se tiver texto no input email e no name', () => {
        render(<BrowserRouter><App /></BrowserRouter>);
        const nameInput = screen.getByTestId('input-player-name');
        const emailInput = screen.getByTestId('input-gravatar-email');
        const playButton = screen.getByRole('button', { name: 'Play' });

        userEvent.type(nameInput, 'test');
        userEvent.type(emailInput, 'test');

        expect(playButton).not.toBeDisabled();
    });
});