"use client"
import { SearchContext } from "@/app/SearchContext";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";

export interface ResumeProps {
    router: AppRouterInstance
}
const ResumeSession = ({router}: ResumeProps) => {
    const {lastState, setTag, setTimestamp} = useContext(SearchContext)
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const onResume = () => {
        const params = new URLSearchParams(searchParams);
        params.set('tag', `${lastState.tag}`);
        params.set('before', `${lastState.timestamp}`);
        router.push(pathname + '?' + params)
        setTag(lastState.tag)
        setTimestamp(lastState.timestamp)
    }
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
    const date = new Date((parseInt(lastState.timestamp)) * 1000) ?? new Date()
    const day = date.toString() === 'Invalid Date' ? '': 'before ' + date.toLocaleDateString('en-US', { day: 'numeric', weekday: 'short', year: 'numeric', month: 'short' })

    return (
        <div className='options'>
            <div className='last-session'>
            <h3>Continue where you left off?</h3>
            <p>Your last detected search was for posts tagged <span>{lastState.tag}</span> {day}</p>
            <button onClick={onResume}>Resume your last search</button>
            </div>
           
        </div>
    )
}

export {ResumeSession}