"use client"
import { useContext, useState } from "react"
import { SearchContext } from "@/app/SearchContext"
import { Post } from "./Posts/Post"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Info } from "./Posts/Info"
import { User } from "./Posts/User"
import { LoadingIndicator } from "./LoadingIndicator"

interface PostsProps {

}
const PostsWrapper = ({ }: PostsProps) => {
    const {
        postData,
        loading,
        setTimestamp,
        timestamp,
        previousTimestamp,
        setLastState,
        lastState,
        setPreviousTimestamp
    } = useContext(SearchContext)
    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams()

    if (postData == null) return

    function onNavigate() {
        if (postData?.[postData.length - 1].timestamp != null) {
            const params = new URLSearchParams(searchParams);
            params.set('before', `${postData?.[postData.length - 1].timestamp}`);
            router.push(pathname + '?' + params)
            setPreviousTimestamp(timestamp)
            setTimestamp(postData[postData.length - 1].timestamp.toString())
            setLastState({ tag: lastState.tag, timestamp: postData[postData.length - 1].timestamp.toString() })
        }
    }

    function onPrevious() {
        if (postData?.[postData.length - 1].timestamp != null) {
            window.history.back()
            setPreviousTimestamp(timestamp)
            setTimestamp(previousTimestamp)
        }
    }
    const params = new URLSearchParams(searchParams);

    const isFirstPage = params.get('before') == null || params.get('before') === ''

    console.log(postData)
    return (
        <section>
            {loading && (
                <LoadingIndicator />
            )}
            {!loading && postData.length > 0 && postData.map((data) => {
                return (
                    <article
                        key={data.id}
                        id={`post-${data.id}`}
                        className={`post-type-${data.type}`}
                    >
                        <User data={data.blog} />
                        <div className='content'>
                            <Post data={data} />
                        </div>
                        <Info data={data} />
                    </article>
                )
            }
            )}
            {!loading && postData.length < 1 && <article style={{ textAlign: 'center' }}>There are no posts detected using this tag</article>}
            {!loading && postData.length > 0 && postData.length === 20 && (
                <footer>
                    {!isFirstPage && (
                        <button
                            onClick={onPrevious}>
                            Previous Page
                        </button>
                    )}
                    <button
                        onClick={onNavigate}>
                        Next Page
                    </button>
                </footer>

            )}
        </section>
    )
}

export { PostsWrapper }