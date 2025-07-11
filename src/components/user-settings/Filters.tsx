'use client'

import { useSearchDataContext } from "@/app/SearchDataContext";

const Filters = () => {
    const { filters, setFilters } = useSearchDataContext()
    const deletefilter = (id: string) => setFilters(filters.filter((filter: { id: string; }) => filter.id !== id));

    return (
        <>
            {filters?.map((filterItem: { id: string; filter: string; }) => {
                const { id, filter } = filterItem;
                return (
                    <div key={id} className="filter-card">
                        {filter}
                        <button className='delete' style={{ cursor: "pointer" }}
                            onClick={() => deletefilter(id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                <line x1="10" y1="11" x2="10" y2="17" />
                                <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                            <span className="sr-text">delete</span></button>
                    </div>
                );
            })}
        </>
    )
}

export { Filters }