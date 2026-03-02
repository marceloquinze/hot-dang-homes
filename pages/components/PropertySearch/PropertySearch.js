import { useEffect, useState } from "react";
import {Results} from "./Results";
import { Pagination } from "./Pagination";
import { useRouter } from "next/router";
import queryString from "query-string"; // parses a query string into an object
import { Filter } from "./Filters/Filters";

export const PropertySearch = () => {
	const router = useRouter();
	// create a local state to store the results (properties) coming from the API
	const [properties, setProperties] = useState([]);
	// and total...
	const [totalResults, setTotalResults] = useState(0);

	// number of pages
	const pageSize = 3;
	
	
	// use useEffect to fetch data from the API when the component mounts
	// this is useful so we have some data displayed when the page loads
	useEffect(() => {
		// calls the search function
		// it has been moved outside of the useEffect hook because it needs to be triggered by some button
		search();
	}, []);
	
	// calls an async function that fetches data from the API
	// this will also be triggered by the handlePageClick function below, which is passed as a prop to the Pagination component
	const search = async () => {
		const {page} = queryString.parse(window.location.search); // comes from the query parameter in the URL ?page=1&param2=value etc (uses the queryString library)
		const response = await fetch(`/api/search`, {
			method: "POST",
			body: JSON.stringify({
				page: parseInt(page || 1), // if page is not defined, default to 1
			})
		});
		const data = await response.json(); // returns the properties object (returned by the API in search.js, destructured from {data} in the handler)
		console.log("SEARCH DATA: ", data);

		// updates the local state
		setProperties(data.properties);
		setTotalResults(data.total);
	}

	const handlePageClick = async (pageNumber) => {
		// uses the useRouter hook to navigate to a new page
		// create a query parameter
		await router.push(`${router.query.slug.join("/")}?page=${ pageNumber }`, null, {
			// don't reload the page
			shallow: true
		});

		// calls the search function
		search();
	}

	return (
		// the results component accepts one prop: the array of properties, available from the API when the component mounts (search function above) and stored as local state [properties, setProperties]
		<div>
			<Filter />
			<Results properties={properties} />
			<Pagination onPageClick={handlePageClick} totalPages={Math.ceil(totalResults / pageSize)} />
		</div>
	);
};