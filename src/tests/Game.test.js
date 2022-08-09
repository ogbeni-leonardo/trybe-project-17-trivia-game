import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import triviaMock from './mocks/triviaMock';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

import Game from '../pages/Game';

describe('Teste da página Game', () => {
  global.fetch = jest.fn(async () => ({
    json: async () => triviaMock,
  }));

  it('Verifica se todos os elementos estão sendo renderizados na tela', async () => {
    renderWithRouterAndRedux(<Game />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    expect(screen.getByTestId('question-category')).toBeInTheDocument();
    expect(screen.getByTestId('question-text')).toBeInTheDocument();
    expect(screen.getByTestId('answer-options')).toBeInTheDocument();
    expect(screen.getByTestId('correct-answer')).toBeInTheDocument();
    expect(screen.getByTestId('wrong-answer-0')).toBeInTheDocument();
    expect(screen.getByTestId('wrong-answer-1')).toBeInTheDocument();
    expect(screen.getByTestId('wrong-answer-2')).toBeInTheDocument();
  });

  it('Verifica se as informações retornadas pela API estão presentes na tela', async () => {
    renderWithRouterAndRedux(<Game />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    expect(screen.getByTestId('question-category'))
      .toHaveTextContent('Entertainment: Film');
    expect(screen.getByTestId('question-text')).toHaveTextContent(
      'What is the name of the dog that played Toto in the 1939 '
        + 'film &quot;The Wizard of Oz&quot;?'
    );
    expect(screen.getByTestId('correct-answer')).toHaveTextContent('Terry');
    expect(screen.getByTestId('wrong-answer-0')).toHaveTextContent('Tommy');
    expect(screen.getByTestId('wrong-answer-1')).toHaveTextContent('Teddy');
    expect(screen.getByTestId('wrong-answer-2')).toHaveTextContent('Toto');
  });

  it('Verifica se todos os botões ficam desabilitados ao selecionar uma resposta', async () => {
    renderWithRouterAndRedux(<Game />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const correctAnswer = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer);

    await waitFor(() => {
      [
        'correct-answer',
        'wrong-answer-0',
        'wrong-answer-1',
        'wrong-answer-2',
      ].forEach((element) => expect(screen.getByTestId(element)).toBeDisabled());
    });
  });

  it('Verifica se a próxima trivia é exibida quando o botão next for clicado', async () => {
    renderWithRouterAndRedux(<Game />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const correctAnswer = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer);

    const nextButton = screen.getByTestId('btn-next');
    expect(nextButton).toBeInTheDocument();

    userEvent.click(nextButton);

    expect(screen.getByTestId('question-category'))
      .toHaveTextContent('Entertainment: Video Games');
    expect(screen.getByTestId('question-text')).toHaveTextContent(
      'Capcom&#039;s survival horror title Dead Rising, canonically '
        + 'starts on what day of September 2006?'
    );
  });

  it('Verifica se a página é redirecionada quando o botão next estiver desabilitado', async () => {
    const { history } = renderWithRouterAndRedux(<Game />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    for (let i = 0; i < 5; i += 1) {
      const correctAnswer = screen.getByTestId('correct-answer');
      userEvent.click(correctAnswer);

      const nextButton = screen.getByTestId('btn-next');
      userEvent.click(nextButton);
    }
    expect(history.location.pathname).toBe('/feedback');
  });
});
