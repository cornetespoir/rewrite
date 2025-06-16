import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { useSearchParams } from "next/navigation"
import { useFetch } from "@/hooks";
import { PostData, PostResults } from "./types";
import { SearchContextType } from "./SearchContext";

const THE_KEY = process.env.NEXT_PUBLIC_REACT_APP_TUMBLR_API_KEY;

const SearchContext = createContext<SearchContextType| undefined>(undefined)

export const SearchDataProvider = ({ children }: { children: ReactNode }) => {
    const searchParams = useSearchParams()
    // default states
    const [tag, setTag] = useState(searchParams.get('tag')?.toString() ?? '')
    const [filters, setFilters] = useLocalStorage('filters')
    const [currentPage, setCurrentPage] = useState(0)
    const [favorites, setFavorites] = useLocalStorage('favorites')
    const [lastState, setLastState] = useLocalStorage('lastState')
    const [timestamp, setTimestamp] = useState(searchParams.get('before')?.toString() ?? '')
    const [pages, setPages] = useLocalStorage('pages')
    const [removeLink, setRemoveLink] = useLocalStorage('removeLink')
    const params = new URLSearchParams(searchParams);

    const isFirstPage = params.get('before') == null || params.get('before') === ''
    const isSearchPage = params.get('tag') !== '' && params.get('tag') != null
    const {
        data,
        loading
    } = useFetch<PostResults>(`https://api.tumblr.com/v2/tagged?api_key=${THE_KEY}&tag=${tag}&before=${timestamp}`, tag ?? '')
    const [postData, setPostData] = useState<PostData[] | []>([])
    const initialValues = {
        isFirstPage,
        pages,
        setPages,
        isSearchPage,
        postData,
        currentPage,
        setCurrentPage,
        data,
        setPostData,
        loading,
        timestamp,
        setTimestamp,
        tag,
        setTag,
        filters,
        setFilters,
        removeLink,
        setRemoveLink,
        lastState,
        setLastState,
        favorites,
        setFavorites
    }

    useEffect(() => {
        if (data?.response != null) {
            setPostData(data.response)
        }
    }, [data])

    useEffect(() => {
    setPages([{page: 0, timestamp: ''}])
    setCurrentPage(0)
    setTimestamp('')
  }, [tag])


    return (
        <SearchContext.Provider value={initialValues}>{children}
        </SearchContext.Provider>
    )
}

/**
 * Force context to be used inside of context provider
 */
export const useSearchDataContext = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('must be used within the SearchDataProvider')
  }
  return context
}
