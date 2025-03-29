import { SearchContext } from '@/app/SearchContext'
import { PostData } from '@/app/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useContext } from 'react'

interface InfoProps {
    data: PostData
}
const Info = ({ data }: InfoProps) => {
    const {
        post_url: postUrl,
        date,
        blog_name: name,
        reblog_key: reblogKey,
        note_count: notes,
        tags
    } = data

    const {
        setTag,
    } = useContext(SearchContext)

    function reblogUrl(url: string): string {
        let path = ''
        if (url.includes('/blog/view')) {
            const postURLString = url.substring(postUrl.indexOf(`${name}/`) + 5);
            path = postURLString.substring(postURLString.lastIndexOf('/'));
        }
        else {
            const postURLString = url.substring(postUrl.indexOf('post/') + 5);
            path = postURLString.substring(0, postURLString.lastIndexOf('/'));
        }
        return `https://tumblr.com/reblog${path}/${reblogKey}`
    }

    const postedDate = new Date(date ?? 0).toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    function switchTags(tagName: string) {
        const params = new URLSearchParams(searchParams);
        params.set('tag', tagName);
        params.delete('before')
        router.push(pathname + '?' + params)
        setTag(tagName)
    }
    return (
        <div className='post-info'>
            <div className='post-date'>{postedDate}</div>
            <div className='reblog'>
                <a href={postUrl} className='note-count'>{notes} note{notes != 1 && 's'}</a>
                <a href={reblogUrl(postUrl)} className='reblog-link' rel='noreferrer' target='_blank'>
                    <svg className='feather'
                        xmlns='http://www.w3.org/2000/svg'
                        width='24' height='24' viewBox='0 0 24 24'
                        fill='none' stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <polyline points='17 1 21 5 17 9' />
                        <path d='M3 11V9a4 4 0 0 1 4-4h14' />
                        <polyline points='7 23 3 19 7 15' />
                        <path d='M21 13v2a4 4 0 0 1-4 4H3' />
                    </svg> Reblog
                </a>
            </div>
            <div className='tags'>
                {tags?.map((tagged, index) => (
                    <button
                        key={index}
                        onClick={() => switchTags(tagged)}>
                        {tagged}
                    </button>
                ))}
            </div>
        </div>
    )
}

export { Info }