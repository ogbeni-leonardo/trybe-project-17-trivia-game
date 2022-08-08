import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

import Feedback from '../pages/Feedback';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 4,
    score: 413,
    gravatarEmail: '',
  },
};

describe('Teste da página de Feedback', () => {
  it('Verifica se todos os componentes estão sendo renderizados na tela', () => {
    renderWithRouterAndRedux(<Feedback />);

    expect(screen.getByTestId('feedback-text')).toBeInTheDocument();
    expect(screen.getByTestId('feedback-total-score')).toBeInTheDocument();
    expect(screen.getByTestId('feedback-total-question')).toBeInTheDocument();
    expect(screen.getByTestId('btn-play-again')).toBeInTheDocument();
    expect(screen.getByTestId('btn-ranking')).toBeInTheDocument();
  });

  it('Verifica se as informações renderizadas estão corretas', () => {
    renderWithRouterAndRedux(<Feedback />, INITIAL_STATE);

    const feedbackText = screen.getByTestId('feedback-text');
    const feedbackTotalScore = screen.getByTestId('feedback-total-score');

    expect(feedbackText).toHaveTextContent(/well done!/i);
    expect(feedbackTotalScore).toHaveTextContent(4);
  });

  it('Verifica se ao clicar no botão de jogar novamente a página é redirecionada', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />, INITIAL_STATE);

    const rankingButton = screen.getByTestId('btn-play-again');
    userEvent.click(rankingButton);

    expect(history.location.pathname).toBe('/');
  });

  it('Verifica se ao clicar no botão de ranking a página é redirecionada', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />, INITIAL_STATE);

    const rankingButton = screen.getByTestId('btn-ranking');
    userEvent.click(rankingButton);

    expect(history.location.pathname).toBe('/ranking');
  });
});
