import { useEffect, useReducer } from "react";


type State<T> = {
  data: T | null
  loading: boolean
  error: Error | null
}

type Action =
  | { type: 'LOADING' }
  | { type: 'SUCCESS'; payload: any }
  | { type: 'ERROR'; payload: Error }

const dataReducer = <T>(state: State<T>, action: Action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'SUCCESS':
      return { ...state, data: action.payload, loading: false }
    case 'ERROR':
      return { ...state, error: action.payload as Error, loading: false }
    default:
      throw new Error()
  }
}


const useFetch = <T>(url: string, tag?: string): State<T> => {
  const [state, dispatch] = useReducer(dataReducer, {
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (tag == null || tag === '') {
        return
      }
      dispatch({ type: 'LOADING' });
      try {
        const response = await fetch(url);
        const data: T = await response.json();
        dispatch({ type: 'SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'ERROR', payload: error as Error });
      }
    };
    fetchData();
  }, [url, tag]);

  return { ...state };
};

export { useFetch }