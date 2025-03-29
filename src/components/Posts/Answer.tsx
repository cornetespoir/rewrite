import { Text } from "./Text"

interface AnswerProps {
    answer?: string
    asking_name?: string
    asking_url?: string
    question?: string
}

const Answer = ({answer, asking_name, asking_url, question}: AnswerProps) => {
return (
    <div>
        <div className='question'>{asking_name} 
            <Text body={question}/>
        </div>

        <div className='answer'>
            <Text body={answer}/>
        </div>
    </div>
)
}

export {Answer}