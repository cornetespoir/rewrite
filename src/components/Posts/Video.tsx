import { Text } from "./Text";
import { ReactElement } from "react"

interface VideoProps {
    content?: string
    player?: []
}



const Video = ({ content, player }: VideoProps): ReactElement | null => {
    if (player == null) return null
    if (player.length < 3) return null

    return (
        <>
            <Text body={content} />
        </>
    )
}

export { Video }