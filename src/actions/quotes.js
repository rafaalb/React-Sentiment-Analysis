export const SET_KEY = 'SET_KEY';
export const SELECT_QUOTE = 'SELECT_QUOTE';
export const FETCHING_QUOTES = 'FETCHING_QUOTES';
export const FETCH_QUOTE_SUCCESS = 'FETCH_QUOTE_SUCCESS';
export const FETCH_QUOTE_ERROR = 'FETCH_QUOTE_ERROR';
export const FETCH_QUOTES_SUCCESS = 'FETCH_QUOTES_SUCCESS';
export const RESET_QUOTES = 'RESET_QUOTES';

import client from './../Services/ApiClient';
var Sentiment = require('sentiment');
const sentiment = new Sentiment();

export function setKey(key) {
  return {
    type: SET_KEY,
    result: key
  };
}

export function resetQuotes() {
  return { type: RESET_QUOTES };
}

export function fetchQuoteSuccess(quote) {
  return {
    type: FETCH_QUOTE_SUCCESS,
    result: quote
  };
}

export function fetchQuotesSuccess() {
  return {
    type: FETCH_QUOTES_SUCCESS
  };
}

export function fetchQuoteError() {
  return {
    type: FETCH_QUOTE_ERROR
  };
}

export function fetchingQuotes() {
  return {
    type: FETCHING_QUOTES
  };
}

export function getQuote(quote) {
  const key = quote ? quote : Math.floor((Math.random() * 100000) + 1);
  return (dispatch) => {
    return client.getQuote({ key })
      .then(res => {
        if (res.data.quoteText) {
          const result = sentiment.analyze(res.data.quoteText)
          const data = {
            ...res.data,
            sentiment: result
          };
          return dispatch(fetchQuoteSuccess(data))
        } else {
          return dispatch(fetchQuoteError())
        }
      })
      .catch(err => dispatch(fetchQuoteError()))
  }
}

const dispatchQuotes = (dispatch, quotes) => {
  return quotes.map(quote => dispatch(quote()))
}

export const selectQuote = (quote) => {
  return { type: SELECT_QUOTE, result: quote };
}

export const searchQuote = () => {
  return (dispatch, getState) => {
    const { key } = getState().quotes;
    dispatch(resetQuotes());
    dispatch(fetchingQuotes());
    dispatch(getQuote(key)).then(() => {
      dispatch(fetchQuotesSuccess());
    });
  }
}

export const refreshQuotes = () => {
  return (dispatch) => {
    dispatch(resetQuotes());
    dispatch(getRandomQuotes());
  }
}

export function getRandomQuotes() {
  let quotes = [];
  for (let i = 0; i <= 15; i++) {
    quotes.push(getQuote)
  }
  return (dispatch) => {
    dispatch(fetchingQuotes());
    Promise.all(dispatchQuotes(dispatch, quotes)).then(results => {
      const success = results.reduce((acum, v) => v && v.type === FETCH_QUOTE_SUCCESS ? acum + 1 : acum, 0);
      if (success > 6) {
        dispatch(fetchQuotesSuccess());
      } else {
        setTimeout(() => {
          dispatch(getRandomQuotes());
        }, 4000);
      }
    })
  };
}
