import { useSearchDataContext } from "@/app/SearchDataContext";
import { useEffect } from "react";

export function useUpdateArticles() {
    const { filters, removeLink } = useSearchDataContext()
    const updateArticles = () => {
        if (filters)
            filters.forEach((filter: { filter: string; }) => {
                const tags = document.querySelectorAll('article .tags button')
                const captions = document.querySelectorAll('article .content')
                captions.forEach((caption) => {
                    if (caption.innerHTML.includes(filter.filter.toLowerCase())) {
                        caption.closest('article')?.classList.add('hidden-word')
                        const taglist = caption.closest('article')?.querySelector('.tags')
                        if (taglist) {
                            taglist.innerHTML = filter.filter
                        }
                        const noteCount = caption.closest('article')?.querySelector('.note-count')
                        if (noteCount) {
                            if (removeLink === false) {
                                noteCount.innerHTML = 'View original post'
                            }
                            else {
                                noteCount.remove()
                            }
                        }
                    }
                })
                tags.forEach((tag) => {
                    if (tag.innerHTML.toLowerCase() === (filter.filter.toLowerCase())) {
                        tag.closest('article')?.classList.add('hidden')
                        tag.classList.add('blocked-tag')
                        const noteCount = tag.closest('article')?.querySelector('.note-count')
                        if (noteCount) {
                            if (removeLink === false) {
                                noteCount.innerHTML = 'View original post'
                            }
                            else {
                                noteCount.remove()
                            }
                        }
                    }
                })
            }
            )
    }

    useEffect(() => {
        updateArticles()
    })

}