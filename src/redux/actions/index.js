export const SET_PLAYER_NAME = 'SET_PLAYER_NAME';
export const setPlayerName = (payload) => ({ type: SET_PLAYER_NAME, payload });

export const SET_PLAYER_EMAIL = 'SET_PLAYER_EMAIL';
export const setPlayerEmail = (payload) => ({ type: SET_PLAYER_EMAIL, payload });

export const UPDATE_SCORE = 'UPDATE_SCORE';
export const updateScore = (payload) => ({ type: UPDATE_SCORE, payload });

export const INCREMENT_ASSERTIONS = 'INCREMENT_ASSERTIONS';
export const incrementAssertions = () => ({ type: INCREMENT_ASSERTIONS });

export const RESET_STATE = 'RESET_STATE';
export const resetState = () => ({ type: RESET_STATE });
