import { Dispatch, SetStateAction } from 'react'
import { LastState, PostData } from './types'


 interface Page {
  timestamp: string
  page: number
}
 export interface SearchContextType  {
    postData?: PostData[] | null,
    setPostData: Dispatch<SetStateAction<PostData[] | []>>,
    loading: boolean,
    timestamp: string,
    setTimestamp: Dispatch<SetStateAction<string>>,
    tag?: string | null,
    setTag: Dispatch<SetStateAction<string>>
    filters: any,
    setFilters: Dispatch<SetStateAction<any>>,
    removeLink: boolean,
    setRemoveLink: Dispatch<SetStateAction<boolean>>,
    lastState: LastState,
    setLastState: Dispatch<SetStateAction<LastState>>
    favorites: string[],
    setFavorites: Dispatch<SetStateAction<string[]>>
    currentPage: number,
    setCurrentPage: Dispatch<SetStateAction<number>>
    isSearchPage: boolean,
    isFirstPage: boolean,
    pages?: Page[],
    setPages: Dispatch<SetStateAction<Page[]>>
  }
