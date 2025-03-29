import { useEffect, type RefObject } from 'react'

const useFventListener = <T extends HTMLElement | Document = HTMLDivElement>(
    eventName: keyof WindowEventMap,
    handler: (e: Event) => void,
    elementRef?: RefObject<T>
) => {
    useEffect(() => {
        if (elementRef != null) {
            const { current: element } = elementRef
            if (!element || !element.addEventListener) return
            element.addEventListener(eventName, handler)
            return () => {
                element.removeEventListener(eventName, handler)
            }
        }
        else {
            window.addEventListener(eventName, handler)
            return () => {
                window.removeEventListener(eventName, handler)
            }
        }
    }, [eventName, elementRef, handler])
}

export { useFventListener }