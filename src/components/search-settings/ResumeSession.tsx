"use client"
import { LastState } from "@/app/types";


export interface ResumeProps {
    lastState: LastState
    onResume: any
}
const ResumeSession = ({ lastState, onResume }: ResumeProps) => {
    // if (lastState.tag === '' || lastState.tag == null) { return null }
    // const date = new Date((parseInt(lastState.timestamp)) * 1000) ?? new Date()
    // const day = date.toString() === 'Invalid Date' ? '' : 'before ' + date.toLocaleDateString('en-US', { day: 'numeric', weekday: 'short', year: 'numeric', month: 'short' })

    // return (
    //     <div className='options'>
    //         <div className='last-session'>
    //             <h3>Continue where you left off?</h3>
    //             <p>Your last detected search was for posts tagged <span>{lastState.tag}</span> {day}</p>
    //             <button onClick={onResume}>Resume your last search</button>
    //         </div>

    //     </div>
    // )

    return (
        <> placeholder test</>
    )
}

export { ResumeSession }