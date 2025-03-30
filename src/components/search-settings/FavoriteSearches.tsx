"use client"

import { SearchContext } from "@/app/SearchContext"
import { useContext } from "react"

interface FavoritesProps {
    searchFavorite: (favorite: string) => void
}
const FavoriteSearches = ({ searchFavorite }: FavoritesProps) => {
    const { favorites, setFavorites } = useContext(SearchContext)

    if (favorites == null || favorites.length < 1) return null
    const handleFavorite = (favorite: string) => {
        searchFavorite(favorite)
    }

    const deleteFavorite = (id: string) => setFavorites(favorites.filter((favorite) => favorite != id));

    return (
        <div className='options'>
            <div className='favorites'>
                <div>
                    <h3>Go back to your favorites</h3>
                    <p>Click on a tag to go back to any of your saved tags</p>
                </div>
                <div className='favorite-list'>
                    {favorites?.map((favorite, index) =>
                        <div className='favorite' key={index}>
                            <button onClick={() => handleFavorite(favorite)}>{favorite}</button>
                            <button className='delete' onClick={() => deleteFavorite(favorite)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2">
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    <line x1="10" y1="11" x2="10" y2="17" />
                                    <line x1="14" y1="11" x2="14" y2="17" />
                                </svg>
                                <span className="sr-text">delete</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

}

export { FavoriteSearches }