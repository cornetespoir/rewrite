'use client'
import { FormEvent, useRef } from "react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { ResumeSession } from "./search-settings/ResumeSession";
import { FavoriteSearches } from "./search-settings";
import { useSearchDataContext } from "@/app/SearchDataContext";

const Search = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const {
    tag,
    setTimestamp,
    setTag,
    setLastState,
    lastState,
    favorites,
    setFavorites } = useSearchDataContext()
  const pathname = usePathname();
  const { replace } = useRouter();
  const brokenRef = useRef<SVGSVGElement>(null)
  const isSearchPage = params.get('tag') != null && params.get('tag') != ''

  /**
   * handles searching for tags
   */
  function onSearch(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    const value = e.currentTarget.tagSearch?.value
    console.log(value)
    if (value == null || value === tag) return
    setTag(value)
    setLastState({ tag: value ?? lastState.tag, timestamp: '' })
    params.delete('before');
    if (value) {
      params.set('tag', value);
    } else {
      params.delete('tag');
    }
    replace(`${pathname}?${params.toString()}`);
    const url = `${pathname}?${params.toString()}`
    history.pushState({}, "", url);
  }

  const router = useRouter()
  const datePicker = (e: { target: any; }) => {
    let date = e.target.value
    date = date.split('-')
    const newDate = new Date(date[1] + "-" + date[2] + "-" + date[0]).getTime() / 1000
    params.set('before', `${newDate}`);
    router.push(pathname + '?' + params)
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
      brokenRef.current?.classList.add('breaking')
      setFavorites(favorites.filter((favorite) => favorite != tag))
    }
    if (favorites == null) {
      brokenRef.current?.classList.remove('breaking')
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
          <form onSubmit={onSearch}>
            <label className='sr-text' htmlFor='tagSearch'>Search for a tumblr post</label>
            <input
              id='tagSearch'
              type='search'
              name='tagSearch'
              placeholder='Search for a keyword/tag'
              defaultValue={searchParams.get('tag')?.toString()} />
          </form>
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
              <button onClick={saveToFavorites} className={isFavorited ? 'save isFavorited' : 'save'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ref={brokenRef} className='broken'>
                  <path fill='white' d="M119.4 44.1c23.3-3.9 46.8-1.9 68.6 5.3l49.8 77.5-75.4 75.4c-1.5 1.5-2.4 3.6-2.3 5.8s1 4.2 2.6 5.7l112 104c2.9 2.7 7.4 2.9 10.5 .3s3.8-7 1.7-10.4l-60.4-98.1 90.7-75.6c2.6-2.1 3.5-5.7 2.4-8.8L296.8 61.8c28.5-16.7 62.4-23.2 95.7-17.6C461.5 55.6 512 115.2 512 185.1l0 5.8c0 41.5-17.2 81.2-47.6 109.5L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9L47.6 300.4C17.2 272.1 0 232.4 0 190.9l0-5.8c0-69.9 50.5-129.5 119.4-141z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24" viewBox="0 0 24 24" fill={isFavorited ? 'salmon' : 'none'} stroke={isFavorited ? 'salmon' : 'white'}
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
      </header>
    </>
  )
}

export { Search }