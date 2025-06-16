import { useEffect, useReducer } from "react";

type State<T> = {
  data: T | null
  loading: boolean
  error: Error | null,
  reFetch?: () => void
}

type Action =
  | { type: 'LOADING' }
  | { type: 'SUCCESS'; payload: any }
  | { type: 'ERROR'; payload: Error }

const dataReducer = <T>(state: State<T>, action: Action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: null, data: null }
    case 'SUCCESS':
      return { ...state, data: action.payload, loading: false }
    case 'ERROR':
      return { ...state, error: action.payload as Error, loading: false }
    default:
      throw new Error()
  }
}

/**
 * Handles fetching data + caching it
 */
function useFetch <T>(url?: string, timestamp?: string): State<T> {
  const [state, dispatch] = useReducer(dataReducer, {
    data: null,
    loading: true,
    error: null,
  })

  const fetchData = async () => {
   if (url == null || url === '') return

   dispatch({ type: 'LOADING' })

   const cache = await caches.open('findtags-cache')
   const cachedData = await cache.match(url);
    if (cachedData) {
      const json = await cachedData.json();
        dispatch({ type: 'SUCCESS', payload: json })
        return
      }
    try {
      const response = await fetch(url);
      if (!response.ok) {
        dispatch({ type: 'ERROR', payload: { message: 'Tag content not found'} as Error });
        throw new Error(`HTTP Error: ${response.statusText}`)
      }
      cache.put(url, response.clone())
      const data: T = await response.json()
      dispatch({ type: 'SUCCESS', payload: data })
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error as Error })
    }
  }
  useEffect(() => {
    fetchData();
  }, [url, timestamp])

  const reFetch = () => {
    fetchData()
  }

  return { ...state, reFetch}
}

export { useFetch }