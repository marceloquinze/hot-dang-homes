import { useEffect, useState } from "react";
import {Results} from "./Results";
import { Pagination } from "./Pagination";

export const PropertySearch = () => {
	// use useEffect to fetch data from the API when the component mounts
	useEffect(() => {
		// calls an async function that fetches data from the API
		const search = async () => {
			const response = await fetch(`/api/search`);
			const data = await response.json(); // returns the properties object (returned by the API in search.js, destructured from {data} in the handler)
			console.log("SEARCH DATA: ", data);

			// updates the local state
			setProperties(data.properties);
			setTotalResults(data.total);
		}

		search();
		
	}, []);

	// create a local state to store the results (properties) coming from the API
	const [properties, setProperties] = useState([]);
	// and total...
	const [totalResults, setTotalResults] = useState(0);

	// number of pages
	const pageSize = 3;


	return (
		// the results component accepts one prop: the array of properties, available from the API when the component mounts (search function above) and stored as local state [properties, setProperties]
		<div>
			<Results properties={properties} />
			<Pagination totalPages={Math.ceil(totalResults / pageSize)} />
		</div>
	);
};