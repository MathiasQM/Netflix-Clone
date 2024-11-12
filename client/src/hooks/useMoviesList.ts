import { useEffect, useReducer } from "react";

import axios from "axios";
import { Movie } from "../types";

interface State {
  data: Movie[] | null;
  error: string | null;
  loading: boolean;
}

const initialState: State = {
  data: null,
  error: null,
  loading: false,
};

enum ActionType {
  LOADING,
  SUCCCESS,
  FAILED,
}

type Action =
  | { type: ActionType.LOADING }
  | { type: ActionType.SUCCCESS; payload: Movie[] }
  | { type: ActionType.FAILED; payload: string };

const reducer = (_: State, action: Action): State => {
  switch (action.type) {
    case ActionType.LOADING:
      return {
        loading: true,
        error: null,
        data: null,
      };
    case ActionType.FAILED:
      return {
        loading: false,
        error: action.payload,
        data: null,
      };
    case ActionType.SUCCCESS:
      return {
        loading: false,
        error: null,
        data: action.payload,
      };
    default:
      return initialState;
  }
};

const useMoviesList = () => {
  const [{ data, loading, error }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchMoviesList();
  }, []);

  const fetchMoviesList = async () => {
    dispatch({ type: ActionType.LOADING });
    try {
      const res = await axios.get("http://localhost:8080/movies/list/popular");
      dispatch({ type: ActionType.SUCCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: ActionType.FAILED, payload: "Something went wrong" });
    }
  };

  return { data, loading, error };
};

export default useMoviesList;
