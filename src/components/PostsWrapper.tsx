"use client"
import { Post } from "./Posts/Post"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Info } from "./Posts/Info"
import { User } from "./Posts/User"
import { LoadingIndicator } from "./LoadingIndicator"
import { useUpdateArticles } from "@/hooks"
import { useSearchDataContext } from "@/app/SearchDataContext"
import { usePagination } from "@/hooks/usePagination"

const PostsWrapper = () => {
    const {
        isFirstPage,
        isSearchPage,
        postData,
        pages,
        currentPage,
        loading,
    } = useSearchDataContext()
    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams);

    const { next, previous } = usePagination()
    useUpdateArticles()

    if (postData == null) return

    function onNavigate() {
        params.set('before', `${postData?.[postData.length - 1].timestamp}`);
        router.push(pathname + '?' + params)
        next()
    }

    function onPrevious() {
        if (currentPage > 0) {
        params.set('before', `${pages?.[currentPage - 1].timestamp}`);
        router.push(pathname + '?' + params)
        previous()
        }
    }

    return (
        <section>
            {loading && isSearchPage && (
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
            {!loading && !postData.length && isSearchPage && (
                <div className='last-session'>
                    <h3>No Results Found</h3>
                    <p>There are no posts detected using this tag</p>
                </div>
            )}
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