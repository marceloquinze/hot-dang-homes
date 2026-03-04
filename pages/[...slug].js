import { gql } from "@apollo/client"
import client from "client"
import { getPageStaticProps } from "../utils/getPageStaticProps";
import { Page } from "./components/Page";

export default Page;

export const getStaticProps = getPageStaticProps;
// getStaticProps is required when using getStaticPaths

export const getStaticPaths = async () => {
	const {data} = await client.query({
		query: gql`
			query AllPagesQuery {
				pages {
					nodes {
						uri
					}
				}
				properties {
					nodes {
						uri
					}
				}
			}		
		`,
	});

	return {
		// getStaticPaths returns an array of routes we want to make available on our app
		paths: [...data.pages.nodes, ...data.properties.nodes]
			// we don't need the home page since it's being rendered using the index.js file
			.filter( page => page.uri !== "/")
			.map( page => ({
				params: {
					// remove o primeiro e último "/"
					// depois quebra pela barra, gerando um array
					slug: page.uri.substring(1, page.uri.length -1).split("/")
					// para cada página gerada neste array, será renderizado um Page component
				}
		})),
		fallback: "blocking",
		// blocking = the page will be generated on the server-side (there can be more than 10 pages returned from the API)
		// false = the page will be generated on the client-side
	}
}