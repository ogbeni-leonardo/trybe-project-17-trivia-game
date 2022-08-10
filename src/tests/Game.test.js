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

  it(
    'Verifica os elementos esperados estão sendo renderizados na tela',
    async () => {
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

  it(
    'Verifica se as informações retornadas pela API estão presentes na tela',
    async () => {
      renderWithRouterAndRedux(<Game />);
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      const category = screen.getByTestId('question-category');
      const question = screen.getByTestId('question-text');
      const correctAnswer = screen.getByTestId('correct-answer');
      const incorrectAnswers = ['wrong-answer-0', 'wrong-answer-1', 'wrong-answer-2']
        .map((id) => screen.getByTestId(id));

      expect(category).toHaveTextContent(/Entertainment: Film/i);
      expect(question).toHaveTextContent(
        /What is the name of the dog that played Toto in the 1939 film &quot;The Wizard of Oz&quot;?/i
      );
      expect(correctAnswer).toHaveTextContent(/Terry/i);
      expect(incorrectAnswers[0]).toHaveTextContent(/Tommy/i);
      expect(incorrectAnswers[1]).toHaveTextContent(/Teddy/i);
      expect(incorrectAnswers[2]).toHaveTextContent(/Toto/i);
  });

  it('Verifica se todos os botões ficam desabilitados ao selecionar uma resposta',
    async () => {
      renderWithRouterAndRedux(<Game />);
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      const incorrectAnswers = ['wrong-answer-0', 'wrong-answer-1', 'wrong-answer-2']
        .map((id) => screen.getByTestId(id));
      
      userEvent.click(incorrectAnswers[0]);

      const correctAnswer = screen.getByTestId('correct-answer');
      await waitFor(() => expect(correctAnswer).toBeDisabled());

      incorrectAnswers.forEach((answer) => expect(answer).toBeDisabled());
  });

  it(
    'Verifica se a próxima trivia é exibida quando o botão Next for clicado',
    async () => {
      renderWithRouterAndRedux(<Game />);
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      userEvent.click(screen.getByTestId('correct-answer'));
      userEvent.click(screen.getByTestId('btn-next'));

      const category = screen.getByTestId('question-category');
      const question = screen.getByTestId('question-text');

      expect(category).toHaveTextContent(/Entertainment: Video Games/i);
      expect(question).toHaveTextContent(
        /Capcom&#039;s survival horror title Dead Rising, canonically starts on what day of September 2006?/i
      );
    }
  );

  it(
    'Verifica se a página é redirecionada quando o botão next estiver desabilitado',
    async () => {
      const { history } = renderWithRouterAndRedux(<Game />);
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      for (let i = 0; i < 5; i += 1) {
        userEvent.click(screen.getByTestId('correct-answer'));
        userEvent.click(screen.getByTestId('btn-next'));
      }

      expect(history.location.pathname).toBe('/feedback');
    }
  );

  it('Verifica se após 35 segundos sem responder todos os botões de '
    + 'resposta são desabilitados', async () => {
      jest.setTimeout(32000);

      renderWithRouterAndRedux(<Game />);
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      const incorrectAnswers = ['wrong-answer-0', 'wrong-answer-1', 'wrong-answer-2']
        .map((id) => screen.getByTestId(id));

      incorrectAnswers.forEach((answer) => expect(answer).toBeEnabled());

      await waitFor(() => {
        expect(screen.getByTestId('correct-answer')).toBeDisabled();
      }, { timeout: 32000 });

      incorrectAnswers.forEach((answer) => expect(answer).toBeDisabled());
    });

  it('Verifica se a página é redirecionada quando o valor da API for inválido', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => ({
        response_code: 0,
        results: [],
      }),
    }));

    const { history } = renderWithRouterAndRedux(<Game />, undefined, '/game');

    expect(history.location.pathname).toBe('/game');
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(history.location.pathname).toBe('/');
  });
});
