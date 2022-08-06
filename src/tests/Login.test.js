import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Login from '../pages/Login';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import createHash from '../services/userHash';

const tokenMock = {
  response_code: 0,
  response_message: 'Token Generated Successfully!',
  token: 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6',
};

describe('Testa a tela de login', () => {
  global.fetch = jest.fn(async () => ({ json: async () => tokenMock }));

  it('Verifica se todos os componentes estão sendo renderizados na tela', () => {
    renderWithRouterAndRedux(<Login />);

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const playButton = screen.getByRole('button', { name: /play/i });
    const settingsButton = screen.getByRole('button', { name: /settings/i });

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(playButton).toBeInTheDocument();
    expect(settingsButton).toBeInTheDocument();
  });

  it('Verifica se os valores digitados estão presentes nos inputs', () => {
    renderWithRouterAndRedux(<Login />);

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');

    userEvent.type(nameInput, 'test');
    userEvent.type(emailInput, 'test@test.com');

    expect(nameInput).toHaveValue('test');
    expect(emailInput).toHaveValue('test@test.com');
  });

  it('Verifica se o botão "Play" está desabilitado se os inputs forem inválidos', () => {
    renderWithRouterAndRedux(<Login />);

    const playButton = screen.getByRole('button', { name: /play/i });
    expect(playButton).toBeDisabled();

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');

    userEvent.type(nameInput, 'test');
    expect(playButton).toBeDisabled();

    userEvent.type(emailInput, 'test@test.com');
    expect(playButton).toBeEnabled();
  });

  it('Verifica se o nome e email são salvos no estado global', async () => {
    const { store } = renderWithRouterAndRedux(<Login />);

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const playButton = screen.getByRole('button', { name: /play/i });

    userEvent.type(nameInput, 'Tester');
    userEvent.type(emailInput, 'test@test.com');
    userEvent.click(playButton);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const userHash = createHash('test@test.com');

    expect(store.getState().player.name).toBe('Tester');
    expect(store.getState().player.gravatarEmail).toBe(userHash);
  });

  it('Verifica se o token é armazenado no localStorage', async () => {
    renderWithRouterAndRedux(<Login />);

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const playButton = screen.getByRole('button', { name: /play/i });

    userEvent.type(nameInput, 'Tester');
    userEvent.type(emailInput, 'test@test.com');
    userEvent.click(playButton);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    expect(localStorage.getItem('token')).toBe(tokenMock.token);
  });

  it('Verifica se ao clicar no botão "Play" redireciona para "/game"', async () => {
    const { history } = renderWithRouterAndRedux(<Login />);

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const playButton = screen.getByRole('button', { name: /play/i });

    userEvent.type(nameInput, 'Tester');
    userEvent.type(emailInput, 'test@test.com');
    userEvent.click(playButton);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    expect(history.location.pathname).toBe('/game');
  });
});
