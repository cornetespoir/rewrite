import { Dispatch, SetStateAction, createContext } from 'react'
import { PostData } from './types'


 interface PostDataContextType  {
    postData?: PostData[] | null,
    setPostData: Dispatch<SetStateAction<[]>>,
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>,
    timestamp: string,
    setTimestamp: Dispatch<SetStateAction<string>>,
    previousTimestamp: string,
    setPreviousTimestamp: Dispatch<SetStateAction<string>>,
    tag?: string | null,
    setTag: Dispatch<SetStateAction<string>>
    filters: any,
    setFilters: Dispatch<SetStateAction<any>>

  }
  
   export const SearchContext =  createContext<PostDataContextType>({
    postData: null,
    setPostData: () => { },
    loading: false,
    setLoading: () => { },
    timestamp: '',
    setTimestamp: () => { },
    previousTimestamp: '',
    setPreviousTimestamp: () => { },
    tag: '',
    setTag: () => {},
    filters: [],
    setFilters: () => []
   })
