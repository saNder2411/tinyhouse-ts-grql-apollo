import { server } from './server';
// State
import { State, ActionTypes, useFetchReducer } from './useFetchReducer';


type MutationTuple<TData, TVariables> = [State<TData>, (variables?: TVariables | undefined) => Promise<void>];

export const useMutation = <TData = any, TVariables = any>(query: string): MutationTuple<TData, TVariables> => {
  const [state, dispatch] = useFetchReducer<TData>();

  const fetch = async (variables?: TVariables) => {
    dispatch({ type: ActionTypes.FETCH_INIT });

    try {
      const { data, errors } = await server.fetch<TData, TVariables>({ query, variables });

      if (errors && errors.length) throw new Error(errors[0].message);

      dispatch({ type: ActionTypes.FETCH_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: ActionTypes.FETCH_FAILURE });
      throw console.error(err);
    }
  };

  return [state, fetch];
};
