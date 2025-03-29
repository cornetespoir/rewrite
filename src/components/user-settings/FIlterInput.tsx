import { SearchContext } from "@/app/SearchContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import React, { useContext } from "react";
import { useState, useEffect } from "react";

const FilterInput = () => {
	const {filters, setFilters} = useContext(SearchContext)
	const [filterItem, setfilterItem] = useState('');
	const [error, setError] = useState(false);
	const [duplicates, setDuplicates] = useState(false);
	const [removeLink, setRemoveLink] = useLocalStorage('removeLink')

	const handleSubmit = (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		if (!filterItem) return;
		const isDuplicate = filters?.some((filter: { filter: string; }) => filter.filter === filterItem);
		if (isDuplicate) {
			setDuplicates(true);
			return;
		}
		if (filters != null) {
			setFilters([{ id: Date.now().toString(36), filter: filterItem }, ...filters])

		}
		else (
			setFilters([{ id: Date.now().toString(36), filter: filterItem }])

		)
		setfilterItem('');
		setDuplicates(false);
	}

	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('filters', JSON.stringify(filters))
		}
	}, [filters])

	const deletefilter = (id: string) => setFilters(filters.filter((filter: { id: string; }) => filter.id !== id));
	const handleToggle = () => setRemoveLink((prev: boolean) => !prev);

	useEffect(() => {
		localStorage.setItem('removeLinks', JSON.stringify(removeLink));
	}, [removeLink])

	useEffect(() => {
		let adderror = setTimeout(() => {
			setError(false);
		}, 2000);
		return () => {
			clearTimeout(adderror);
		};
	}, [error]);

	return (
		<div className="filter-items">
			<h2>Filter content</h2>
			<p>Add words that you want hidden from your searches.
				<small><a target="_blank" rel="noreferrer" title="Read the filtering content guide" href="https://github.com/cornetespoir/findtags-react/wiki/Filtering-Content"> <i className="fa-regular fa-circle-question"></i><span className="sr-text">Learn more about this feature</span></a></small></p>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={filterItem}
					className={duplicates ? 'error-message' : ''}
					onChange={(e) => setfilterItem(e.target.value)}
					placeholder="Enter a filter"
				/>
				<button type="submit" className="btn">
					Add filter
				</button>
			</form>
			{duplicates
				? (
					<p className='error-message'>This word is already being filtered!</p>
				)
				: ''}
			<div className="filter-container flex">
				{filters?.map((filterItem: { id: string; filter: string; }) => {
					const { id, filter } = filterItem;
					return (
						<div key={id} className="filter-card">
							{filter}
							<button style={{cursor: "pointer"}}
								onClick={() => deletefilter(id)}>
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2">
										<polyline points="3 6 5 6 21 6"/>
										<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
										<line x1="10" y1="11" x2="10" y2="17"/>
										<line x1="14" y1="11" x2="14" y2="17"/>
									</svg>
									<span className="sr-text">delete</span></button>
						</div>
					);
				})}
			</div>
			<button className={`toggleNote remove-${removeLink}`} onClick={handleToggle}> 
				{removeLink ? 
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-square">
						<polyline points="9 11 12 14 22 4"/>
						<path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
					</svg>
				:
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-square">
					<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
				</svg>
				}
				Hide filtered post links</button>
		</div>
	);
};

export { FilterInput };