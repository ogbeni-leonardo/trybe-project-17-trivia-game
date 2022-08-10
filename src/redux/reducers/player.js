import {
  SET_PLAYER_NAME,
  SET_PLAYER_EMAIL,
  UPDATE_SCORE,
  INCREMENT_ASSERTIONS,
  RESET_STATE,
  CHANGE_THEME,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
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
    return INITIAL_STATE;
  case CHANGE_THEME:
    return {
      ...state,
      theme: state.theme === 'light' ? 'dark' : 'light',
    };
  default:
    return state;
  }
};

export default player;
