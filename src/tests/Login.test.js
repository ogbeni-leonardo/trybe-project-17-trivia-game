import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Login from '../pages/Login';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testa a tela de login', () => {
    it('Testa o input de nome', () => {
        renderWithRouterAndRedux(<Login />);
        const nameInput = screen.getByTestId('input-player-name');

        expect(nameInput).toBeInTheDocument();

        userEvent.type(nameInput, 'test');

        expect(nameInput).toHaveValue('test');
    });

    it('Testa o input de email', () => {
        renderWithRouterAndRedux(<Login />);
        
        const emailInput = screen.getByTestId('input-gravatar-email');

        expect(emailInput).toBeInTheDocument();

        userEvent.type(emailInput, 'test');

        expect(emailInput).toHaveValue('test');
    });

    it('Testa se o botão "Play" é renderizado', () => {
        renderWithRouterAndRedux(<Login />);

        const playButton = screen.getByRole('button', { name: 'Play' });

        expect(playButton).toBeInTheDocument();
    });

    it('Testa se o botão "Play" é desabilitado se não tiver nada nos inputs', () => {
        renderWithRouterAndRedux(<Login />);
        
        const playButton = screen.getByRole('button', { name: 'Play' });

        expect(playButton).toBeDisabled();
    });

    it('Testa se o botão "Play" é desabilitado se não tiver nada em name, mas tiver em email', () => {
        renderWithRouterAndRedux(<Login />);

        const nameInput = screen.getByTestId('input-player-name');
        const playButton = screen.getByRole('button', { name: 'Play' });

        userEvent.type(nameInput, 'test');

        expect(playButton).toBeDisabled();
    });

    it('Testa se o botão "Play" é desabilitado se não tiver nada em email, mas tiver em name', () => {
        renderWithRouterAndRedux(<Login />);

        const emailInput = screen.getByTestId('input-gravatar-email');
        const playButton = screen.getByRole('button', { name: 'Play' });

        userEvent.type(emailInput, 'test');

        expect(playButton).toBeDisabled();
    });

    it('Testa se o botão "Play" é habilitado se tiver texto no input email e no name', () => {
        renderWithRouterAndRedux(<Login />);

        const nameInput = screen.getByTestId('input-player-name');
        const emailInput = screen.getByTestId('input-gravatar-email');
        const playButton = screen.getByRole('button', { name: 'Play' });

        userEvent.type(nameInput, 'test');
        userEvent.type(emailInput, 'test');

        expect(playButton).not.toBeDisabled();
    });

    it('Testa se name e email são salvos no estado global', async () => {
        const { store } = renderWithRouterAndRedux(<Login />);
                
        const nameInput = screen.getByTestId('input-player-name');
        const emailInput = screen.getByTestId('input-gravatar-email');
        const playButton = screen.getByRole('button', { name: 'Play' });
        
        userEvent.type(nameInput, 'Tester');
        userEvent.type(emailInput, 'test@test.com');
        console.log(nameInput.value);
        
        userEvent.click(playButton);
        jest.spyOn(global, 'fetch');
        await waitFor(() => {expect(store.getState().player.name).toBe('Tester')});
    });

    it('Testa se ao clicar no botão "play" redireciona para "/game"', () => {
        const { history } = renderWithRouterAndRedux(<Login />);
        console.log(history.location.pathname);

        const nameInput = screen.getByTestId('input-player-name');
        const emailInput = screen.getByTestId('input-gravatar-email');
        const playButton = screen.getByRole('button', { name: 'Play' });

        userEvent.type(nameInput, 'test');
        userEvent.type(emailInput, 'test');

        userEvent.click(playButton);

        expect(history.location.pathname).toBe('/game');
    });
});


        // const { store, history } = renderWithRouterAndRedux(<Login />);
        // console.log(store.getState());
        // console.log(history);