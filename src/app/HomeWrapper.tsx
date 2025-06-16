"use client"
import { Header } from "@/components";
import { PostsWrapper } from "@/components/PostsWrapper";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { SearchDataProvider } from "./SearchDataContext";

const NoSSRMenu = dynamic<{}>(() => import("@/components/user-settings").then(module => module.Menu), { ssr: false });
const NoSSRSearch = dynamic<{}>(() => import("@/components").then(module => module.Search), { ssr: false, suspense: true, loading: () => <LoadingIndicator /> });

function HomeWrapper() {
 

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setShowScrollTop(true)
      }
      else {
        setShowScrollTop(false)
      }
      return
    })
  }, [])
  
  const [showScrollTop, setShowScrollTop] = useState(false)
  

  return (
    <SearchDataProvider>
      <div>
      <Header />
      <NoSSRSearch />
      <PostsWrapper />
      <NoSSRMenu />
      {showScrollTop && (
        <button className='back-to-top' onClick={scrollToTop}>
          <span className='sr-text'>Scroll back to the top of the page</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" viewBox="0 0 24 24" 
            fill="none" stroke="currentColor" 
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up">
              <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
          </svg>
        </button>)}
      </div>
    </SearchDataProvider>
  )
}

export { HomeWrapper }