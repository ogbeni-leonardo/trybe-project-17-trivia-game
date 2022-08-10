import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

import Ranking from '../pages/Ranking';
import userEvent from '@testing-library/user-event';

const gamersData = [
  { name: 'Alexandre', picture: 'hashDoAlexandre', score: 100 },
  { name: 'Léo', picture: 'hashDoLeo', score: 110 },
  { name: 'Luiz', picture: 'hashDoLuiz', score: 120 },
  { name: 'Lucas', picture: 'hashDoLucas', score: 130 },
  { name: 'Thiago', picture: 'hashDoThiago', score: 140 },
].sort((a, b) => b.score - a.score);

describe('Teste da página de Raking', () => {
  localStorage.setItem('ranking', JSON.stringify(gamersData));

  it('Verifica se todos os dados esperados estão sendo renderizados', () => {
    renderWithRouterAndRedux(<Ranking />);
    
    gamersData.forEach((gamer, index) => {
      const playerName = screen.getByTestId(`player-name-${index}`);
      const playerScore = screen.getByTestId(`player-score-${index}`);

      expect(playerName).toBeInTheDocument();
      expect(playerName).toHaveTextContent(gamer.name);
      expect(playerScore).toBeInTheDocument();
      expect(playerScore).toHaveTextContent(gamer.score);
    });

    const allAvatars = screen.getAllByRole('img');
    allAvatars.forEach((avatar, index) => {
      expect(avatar.src).toBe(`https://www.gravatar.com/avatar/${gamersData[index].picture}`)
    });

    expect(screen.getByTestId('ranking-title')).toBeInTheDocument();
    expect(screen.getByTestId('btn-go-home')).toBeInTheDocument();
  });

  it('Verifica se o clique no botão de Home redireciona para a página principal', () => {
    const { history } =  renderWithRouterAndRedux(<Ranking />);

    userEvent.click(screen.getByTestId('ranking-title'));
    expect(history.location.pathname).toBe('/');
  });
});