import { UserData } from '@/app/types'

interface UserProps {
    data: UserData
}
const User = ({ data }: UserProps) => {
    const {
       name,
       url
    } = data
    
    return (
        <div className='post-user'>
           <a href={url}><img src={`https://api.tumblr.com/v2/blog/${name}/avatar/128`} alt={`${name}'s avatar`}/> {name}</a>
        </div>
    )
}

export { User }