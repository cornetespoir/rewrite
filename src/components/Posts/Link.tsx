import { Text } from "./Text";
import { ReactElement } from "react"

interface LinkProps {
    content?: string
    source_url?: string
    title?: string
    summary?: string
    source_title?: string
}

const Link = ({ content, source_title, source_url, title, summary }: LinkProps): ReactElement => {
    return (
        <>
            <a className='link-post' href={source_url}>
               <h2>{title}</h2>
               <span>{source_title}</span>
            </a>
            <Text body={content} />
        </>
    )
}

export { Link }