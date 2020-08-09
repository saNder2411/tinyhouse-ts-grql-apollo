import { useEffect, useCallback } from 'react';
// Server
import { server } from './server';
// State
import { State, ActionTypes, useFetchReducer } from './useFetchReducer';

interface QueryResult<TData> extends State<TData> {
  refresh: () => void;
}

export const useQuery = <TData = any>(query: string): QueryResult<TData> => {
  const [state, dispatch] = useFetchReducer<TData>();
  const fetch = useCallback(async () => {
    dispatch({ type: ActionTypes.FETCH_INIT });

    try {
      const { data, errors } = await server.fetch<TData>({ query });

      if (errors && errors.length) throw new Error(errors[0].message);

      dispatch({ type: ActionTypes.FETCH_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: ActionTypes.FETCH_FAILURE });
      throw console.error(err);
    }
  }, [query, dispatch]);

  useEffect(() => {
    let didCancel = false;

    if (didCancel) return;

    fetch();

    return () => {
      didCancel = true;
    };
  }, [fetch]);

  return { ...state, refresh: fetch };
};
