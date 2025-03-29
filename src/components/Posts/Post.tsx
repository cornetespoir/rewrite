import { PostData } from "@/app/types";
import { Answer } from "./Answer";
import { Link } from "./Link";
import { Text } from "./Text";
import { Photo } from "./Photo";
import { Video } from "./Video";

interface PostProps{
    data: PostData
}
const Post = ({data}:PostProps) => {
    const {
        type, 
        body, 
        answer, 
        question, 
        asking_name, 
        asking_url, 
        source_url,
        title,
        summary,
        source_title,
        caption,
        description,
        photos,
        player
     } = data
    switch (type.toLowerCase()) {
        case 'text':
            return <Text body={body}/>
        case 'photo':
           return  <Photo content={caption} photos={photos}/>
        case 'video':
        return <Video content={caption} player={player} />
        case 'link':
            return <Link content={description} source_url={source_url} source_title={source_title} title={title} summary={summary}/>
        case 'answer':
            return (
            <Answer 
                asking_name={asking_name} 
                asking_url={asking_url} 
                question={question} 
                answer={answer}/>)
        default:
            return type
    }

}

export {Post}