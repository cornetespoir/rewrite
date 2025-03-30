'use client'
import { useFetch, useFventListener } from "@/hooks";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { SearchContext } from "@/app/SearchContext";
import { PostResults } from "@/app/types";
import { ResumeSession } from "./search-settings/ResumeSession";
import { FavoriteSearches } from "./search-settings";
const THE_KEY = process.env.NEXT_PUBLIC_REACT_APP_TUMBLR_API_KEY;

const Search = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const {
    setPostData,
    setLoading,
    loading,
    tag,
    setTag,
    setTimestamp,
    timestamp,
    removeLink,
    setLastState,
    lastState,
    favorites,
    setFavorites,
    setPreviousTimestamp
  } = useContext(SearchContext)
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchRef = useRef<HTMLInputElement>(null)
  const [overrideTimestamp, setOverrideTimestamp] = useState(false)
  const {
    data,
    loading: isLoading
  } = useFetch<PostResults>(`https://api.tumblr.com/v2/tagged?api_key=${THE_KEY}&tag=${tag}&before=${timestamp}`, tag ?? '')
  const isSearchPage = params.get('tag') != null && params.get('tag') != ''

  /**
   * handles searching for tags
   */
  function onSearch(e: any): void {
    if (!overrideTimestamp) {
      setPreviousTimestamp('')
      setTimestamp('')
    }
    if (e.key != 'Enter') return
    const value = (e.target as HTMLInputElement).value
    if (value == null || value === tag) return
    setTag(value)
    setLastState({ tag: value ?? lastState.tag, timestamp: '' })
    params.delete('before');
    if (value) {
      params.set('tag', value);
    } else {
      params.delete('tag');
    }
    updateArticles()
    replace(`${pathname}?${params.toString()}`);
    const url = `${pathname}?${params.toString()}`
    history.pushState({}, "", url);
    if (data?.response != null)
      setPostData(data.response)
  }
  useFventListener('keyup', onSearch, searchRef)

  useEffect(() => {
    if (data?.response != null)
      setPostData(data.response)
  }, [data])

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  const { filters } = useContext(SearchContext)

  const updateArticles = () => {
    if (filters)
      filters.forEach((filter: { filter: string; }) => {
        const tags = document.querySelectorAll('article .tags button')
        const captions = document.querySelectorAll('article .content')
        captions.forEach((caption) => {
          if (caption.innerHTML.includes(filter.filter.toLowerCase())) {
            caption.closest('article')?.classList.add('hidden-word')
            const taglist = caption.closest('article')?.querySelector('.tags')
            if (taglist) {
              taglist.innerHTML = filter.filter
            }
            const noteCount = caption.closest('article')?.querySelector('.note-count')
            if (noteCount) {
              if (removeLink === false) {
                noteCount.innerHTML = 'View original post'
              }
              else {
                noteCount.remove()
              }
            }
          }
        })
        tags.forEach((tag) => {
          if (tag.innerHTML.toLowerCase() === (filter.filter.toLowerCase())) {
            tag.closest('article')?.classList.add('hidden')
            tag.classList.add('blocked-tag')
            const noteCount = tag.closest('article')?.querySelector('.note-count')
            if (noteCount) {
              if (removeLink === false) {
                noteCount.innerHTML = 'View original post'
              }
              else {
                noteCount.remove()
              }
            }
          }
        })
      }
      )
  }

  useEffect(() => {
    updateArticles()
  })

  const router = useRouter()
  const datePicker = (e: { target: any; }) => {
    let date = e.target.value
    date = date.split('-')
    const newDate = new Date(date[1] + "-" + date[2] + "-" + date[0]).getTime() / 1000
    setPreviousTimestamp(timestamp)
    params.set('before', `${newDate}`);
    router.push(pathname + '?' + params)
    setOverrideTimestamp(true)
    setLastState({ tag: lastState.tag, timestamp: newDate.toString() })
    setTimestamp(`${newDate}`)
  }

  const onResume = () => {
    params.set('tag', `${lastState.tag}`);
    params.set('before', `${lastState.timestamp}`);
    router.push(pathname + '?' + params)
    setTag(lastState.tag)
    setTimestamp(lastState.timestamp)
  }
  const isFavorited = favorites?.some((favorite: string | null) => favorite === params.get('tag'))

  const saveToFavorites = () => {
    if (tag == null) return
    if (isFavorited) {
      setFavorites(favorites.filter((favorite) => favorite != tag))
    }
    if (favorites == null) {
      setFavorites([tag])
    }
    else {
      const isDuplicate = favorites?.some((favorite) => favorite === tag);
      if (isDuplicate) {
        return
      }
      setFavorites([...favorites, tag])
    }
  }
  const searchFavorite = (favorite: string) => {
    params.set('tag', `${favorite}`)
    params.delete('before')
    router.push(pathname + '?' + params)
    setTag(favorite)
  }


  return (
    <>
      <header>
        <div style={{ position: 'relative' }}>
          <input
            ref={searchRef}
            type="search"
            name="tag-search"
            placeholder='Search for a keyword/tag'
            defaultValue={searchParams.get('tag')?.toString()} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-search">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          {isSearchPage && (
            <>
              <button onClick={saveToFavorites} className='save'>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24" viewBox="0 0 24 24" fill={isFavorited ? 'salmon' : 'none'} stroke={isFavorited ? 'salmon': 'white'}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                <span className='hover-text'>{isFavorited ? `${tag} is already one of your favorite searches` : `Save ${tag} to your favorite searches`}</span>
              </button>
            </>
          )}
        </div>
        {!isSearchPage && (
          <>
            <ResumeSession onResume={onResume} lastState={lastState} />
            <FavoriteSearches searchFavorite={searchFavorite} />
          </>
        )}
        {isSearchPage && (
          <>
            <div className='date-picker'>
              <label htmlFor="start">Search for Posts Before:</label>
              <input
                type="date"
                id="start"
                min='2007-01-01'
                name="start"
                onChange={datePicker}
              />
            </div>
          </>
        )}
        {data?.response && !loading && data.response.length > 0 && (
          <article className='result'>
            <p>
              Showing results for {tag}
            </p>
          </article>
        )}
      </header>
    </>
  )
}

export { Search }