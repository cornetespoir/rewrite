'use client'
import { useFetch, useFventListener } from "@/hooks";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { SearchContext } from "@/app/SearchContext";
import { PostResults } from "@/app/types";

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

  function onSearch(e: any): void {
    if (!overrideTimestamp) {
      setPreviousTimestamp('')
      setTimestamp('')
    }
    if (e.key != 'Enter') return
    const value = (e.target as HTMLInputElement).value
    if (value == null || value === tag) return
    setTag(value)
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


  useEffect(() => {
    if (data?.response != null)
      setPostData(data.response)
  }, [data])


  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])


  const { filters } = useContext(SearchContext)
  const removeLink = localStorage.getItem('removeLinks') == 'true' ? true : false

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
    const params = new URLSearchParams(searchParams);
    params.set('before', `${newDate}`);
    router.push(pathname + '?' + params)
    setOverrideTimestamp(true)
    setTimestamp(`${newDate}`)
  }

  const isSearchPage = params.get('tag') != null && params.get('tag') != ''
  useFventListener('keyup', onSearch, searchRef)

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
        </div>
        {isSearchPage && (
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