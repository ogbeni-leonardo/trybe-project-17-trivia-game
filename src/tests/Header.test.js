import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

import Header from '../components/Header';

const INITIAL_STATE = {
  player: {
    name: 'Group 09',
    assertions: 4,
    score: 413,
    gravatarEmail: '14d4f52f82f4c0b9f4d0b345a433dd4a',
  },
};

describe('Teste do componente Header', () => {
  it('Verifica se os elementos esperados estão sendo renderizados', () => {
    renderWithRouterAndRedux(<Header />);

    expect(screen.getByTestId('header-profile-picture')).toBeInTheDocument();
    expect(screen.getByTestId('header-player-name')).toBeInTheDocument();
    expect(screen.getByTestId('header-score')).toBeInTheDocument();
  });

  it('Verifica se as informações do estado estão sendo renderizadas no componente', () => {
    renderWithRouterAndRedux(<Header />, INITIAL_STATE);

    const gravatarPicture =
      'https://www.gravatar.com/avatar/14d4f52f82f4c0b9f4d0b345a433dd4a';

    const profilePicture = screen.getByTestId('header-profile-picture');
    const playerName = screen.getByTestId('header-player-name');
    const score = screen.getByTestId('header-score');

    expect(profilePicture.src).toBe(gravatarPicture);
    expect(playerName).toHaveTextContent(/group 09/i);
    expect(score).toHaveTextContent(413);
  });
});
