import { useEffect, useReducer } from "react";

import axios from "axios";
import { Movie } from "../types";

interface State {
  data: Movie[] | null;
  error: string | null;
  loading: boolean;
  hasMore: boolean;
}

const initialState: State = {
  data: null,
  error: null,
  loading: false,
  hasMore: true,
};

enum ActionType {
  LOADING,
  SUCCESS,
  FAILED,
  NO_MORE_DATA,
}

type Action =
  | { type: ActionType.LOADING }
  | { type: ActionType.SUCCESS; payload: { movies: Movie[]; hasMore: boolean } }
  | { type: ActionType.FAILED; payload: string }
  | { type: ActionType.NO_MORE_DATA };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.LOADING:
      return { ...state, loading: true, error: null };
    case ActionType.FAILED:
      return { ...state, loading: false, error: action.payload };
    case ActionType.SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: state.data ? [...state.data, ...action.payload.movies] : action.payload.movies,
        hasMore: action.payload.hasMore,
      };
    case ActionType.NO_MORE_DATA:
      return { ...state, hasMore: false, loading: false };
    default:
      return initialState;
  }
};
const useMoviesList = (offset: number) => {
  const [{ data, loading, error, hasMore }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (hasMore) {
      fetchMoviesList();
    }
  }, [offset]);

  const fetchMoviesList = async () => {
    dispatch({ type: ActionType.LOADING });
    try {
      const res = await axios.get(`http://localhost:8080/movies/list/popular?offset=${offset}`);
      const { movies, hasMore } = res.data;

      if (movies.length === 0) {
        dispatch({ type: ActionType.NO_MORE_DATA });
      } else {
        dispatch({ type: ActionType.SUCCESS, payload: { movies, hasMore } });
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: ActionType.FAILED, payload: "Something went wrong" });
    }
  };

  return { data, loading, error, hasMore };
};

export default useMoviesList;
