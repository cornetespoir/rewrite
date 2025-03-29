"use client"

import { ReactNode, useContext, useState } from "react"

import { Header, Search } from "@/components";
import { SearchContext } from "@/app/SearchContext"
import { PostsWrapper } from "@/components/PostsWrapper";
import { useSearchParams } from "next/navigation";
import { Menu } from "@/components/user-settings";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Home() {
  const searchParams = useSearchParams()

  const [postData, setPostData] = useState<[]>([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useLocalStorage('filters');
  const [timestamp, setTimestamp] = useState(searchParams.get('before')?.toString() ?? '')
  const [previousTimestamp, setPreviousTimestamp] = useState(timestamp)
  const [tag, setTag] = useState(searchParams.get('tag')?.toString() ?? '')
  const initialValues = {
    postData,
    setPostData,
    loading,
    setLoading,
    timestamp,
    setTimestamp,
    previousTimestamp,
    setPreviousTimestamp,
    tag,
    setTag,
    filters,
    setFilters
  }
  return (
    <>
      <SearchContext.Provider value={initialValues}>
        <Header />
        <Search />
        <PostsWrapper />
        <Menu stateChanger={setPostData} setLoading={setLoading} />
      </SearchContext.Provider>
    </>
  )
}
