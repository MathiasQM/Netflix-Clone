import { useEffect, useReducer } from "react";
import axios from "axios";
import { Movie } from "../types";
import { ObjectId } from "mongodb";

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
  SUCCESS,
  FAILED,
}

type Action =
  | { type: ActionType.LOADING }
  | { type: ActionType.SUCCESS; payload: Movie[] }
  | { type: ActionType.FAILED; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.LOADING:
      return { ...state, loading: true, error: null };
    case ActionType.FAILED:
      return { ...state, loading: false, error: action.payload };
    case ActionType.SUCCESS:
      return {
        loading: false,
        error: null,
        data: action.payload,
      };
    default:
      return initialState;
  }
};

const useMyList = (_id: ObjectId) => {
  const [{ data, loading, error }, dispatch] = useReducer(reducer, initialState);

  const addToMyList = async (id: string) => {
    try {
      dispatch({ type: ActionType.LOADING });
      const res = await axios.get(`http://localhost:8080/movies/mylist/add/${id}`, {
        params: { userId: _id },
      });
      console.log(res);
    } catch (err) {
      console.error(err);
      dispatch({ type: ActionType.FAILED, payload: "Could not add to list" });
    }
  };

  const removeFromMyList = async (id: string) => {
    try {
      console.log(id);
      dispatch({ type: ActionType.LOADING });
      const res = await axios.post(`http://localhost:8080/movies/mylist/remove/${id}`);
      if (res.status === 200) {
        console.log(data);
        const updatedList = data?.filter((movie) => movie._id !== id) as Movie[];
        dispatch({ type: ActionType.SUCCESS, payload: updatedList });
      }
      console.log(res);
    } catch (err) {
      console.error(err);
      dispatch({ type: ActionType.FAILED, payload: "Could not add to list" });
    }
  };

  const fetchMyList = async () => {
    dispatch({ type: ActionType.LOADING });
    try {
      const res = await axios.get(`http://localhost:8080/movies/mylist/${_id}`);
      dispatch({ type: ActionType.SUCCESS, payload: res.data.myList });
    } catch (err) {
      console.error(err);
      dispatch({ type: ActionType.FAILED, payload: "Could not load My List" });
    }
  };

  useEffect(() => {
    fetchMyList();
  }, []);

  return { data, loading, error, addToMyList, removeFromMyList };
};

export default useMyList;
