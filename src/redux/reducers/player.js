import {
  SET_PLAYER_NAME,
  SET_PLAYER_EMAIL,
  UPDATE_SCORE,
  INCREMENT_ASSERTIONS,
  RESET_STATE,
  CHANGE_THEME,
  SET_AMOUNT,
} from '../actions';

const INITIAL_STATE = {
  amount: 0,
  assertions: 0,
  name: '',
  gravatarEmail: '',
  score: 0,
  theme: 'dark',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PLAYER_NAME:
    return { ...state, name: action.payload };
  case SET_PLAYER_EMAIL:
    return { ...state, gravatarEmail: action.payload };
  case UPDATE_SCORE:
    return { ...state, score: state.score + action.payload };
  case INCREMENT_ASSERTIONS:
    return { ...state, assertions: state.assertions + 1 };
  case RESET_STATE:
    return { ...INITIAL_STATE, theme: state.theme };
  case CHANGE_THEME:
    return {
      ...state,
      theme: state.theme === 'light' ? 'dark' : 'light',
    };
  case SET_AMOUNT:
    return { ...state, amount: action.payload };
  default:
    return state;
  }
};

export default player;
