import * as ACTIONS from './../actions/quotes';
const initialState = {
  selected: null,
  key: '',
  data: [],
  fetching_quotes: false,
};

export const quotes = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_KEY:
      return { ...state, key: action.result };
    case ACTIONS.SELECT_QUOTE:
      return { ...state, selected: action.result };
    case ACTIONS.FETCH_QUOTE_SUCCESS:
      return {
        ...state,
        data: state.data.concat(action.result)
      };
    case ACTIONS.FETCHING_QUOTES:
      return { ...state, fetching_quotes: true };
    case ACTIONS.RESET_QUOTES:
      return { ...state, data: [], selected: null };
    case ACTIONS.FETCH_QUOTE_ERROR:
      return state;
    case ACTIONS.FETCH_QUOTES_SUCCESS:
      return { ...state, fetching_quotes: false };
    default:
      return state;
  }
}
