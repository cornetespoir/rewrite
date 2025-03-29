import { Text } from "./Text";
import { ReactElement } from "react"

interface PhotoProps {
    content?: string
    photos?: []
}



const Photo = ({ content, photos }: PhotoProps): ReactElement => {
    return (
        <>
            {photos?.map((photo, index) => (
                <img key={index} src={photo['original_size']['url']} alt='' />
            ))}
            <Text body={content} />
        </>
    )
}

export { Photo }