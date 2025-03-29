import { SearchContext } from '@/app/SearchContext'
import { UserData } from '@/app/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useContext } from 'react'

interface UserProps {
    data: UserData
}
const User = ({ data }: UserProps) => {
    const {
       name,
       title,
       url
    } = data

    
    return (
        <div className='post-user'>
           <a href={url}><img src={`https://api.tumblr.com/v2/blog/${name}/avatar/128`}/> {name}</a>
        </div>
    )
}

export { User }