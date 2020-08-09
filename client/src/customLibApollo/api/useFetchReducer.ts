import { useReducer } from 'react';

export interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

export enum ActionTypes {
  FETCH_INIT,
  FETCH_SUCCESS,
  FETCH_FAILURE,
}

type Action<TData> =
  | { type: ActionTypes.FETCH_INIT }
  | { type: ActionTypes.FETCH_SUCCESS; payload: TData }
  | { type: ActionTypes.FETCH_FAILURE };

const reducer = <TData>() => (state: State<TData>, action: Action<TData>): State<TData> => {
  switch (action.type) {
    case ActionTypes.FETCH_INIT:
      return { ...state, loading: true };

    case ActionTypes.FETCH_SUCCESS:
      return { loading: false, data: action.payload, error: false };

    case ActionTypes.FETCH_FAILURE:
      return { ...state, loading: false, error: true };

    default:
      throw new Error();
  }
};


export const useFetchReducer = <TData>() => {
  const fetchReducer = reducer<TData>();

  return useReducer(fetchReducer, { loading: false, data: null, error: false });
};
