
import { useSearchDataContext } from "@/app/SearchDataContext"

/**
 * Handles next/previous pagination using the SearchDataContext
 */
function usePagination() {
    const { postData, isSearchPage, pages, setCurrentPage, currentPage, setPages, setTimestamp, lastState, setLastState } = useSearchDataContext()

    const next = () => {
        if (postData == null || !isSearchPage) return
            if (postData?.[postData.length - 1].timestamp != null) {
            const newTimestamp = postData[postData.length - 1].timestamp.toString()
            const newpage = {page: currentPage + 1, timestamp: newTimestamp }
            setPages(prev => [...prev, newpage])
            setCurrentPage(prev => prev + 1)
            setTimestamp(newTimestamp)
            setLastState({tag: lastState.tag, timestamp: newTimestamp})
        }
    }

    const previous = () => {
        if (postData == null || !isSearchPage || pages == null) return
           if (postData?.[postData.length - 1].timestamp != null) {
            setTimestamp(pages[currentPage  - 1].timestamp)
            setCurrentPage(prev => prev - 1)
        }
    }

    return { next, previous }
}

export { usePagination }