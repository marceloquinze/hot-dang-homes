import { gql } from "@apollo/client";
import client from "client";

// This will be treated as an endpoint in our app
const handler = async (req, res) => {
	// req: related to client that made the request. You can pass search filters
	// res: status code, returned data etc
	// then we can return the response from this endpoint to the client that made the request
	try{
		// Apollo client (client.js)
		// data is contained in the GraphQL WP response
		const {data} = await client.query({
			query: gql`
				query AllPropertiesQuery {
					properties(where: {offsetPagination: {size: 3, offset: 0}}) {
						pageInfo {
							offsetPagination {
								total
							}
						}					
						nodes {
							databaseId
							title
							uri
							featuredImage {
								node {
									uri
									sourceUrl
								}
							}
							propertyFeatures {
								bathrooms
								bedrooms
								hasParking
								petFriendly
								price
							}
						}
					}
				}			
			`
		}); 
		return res.status(200).json({
			// returns a JSON response containing the properties data 
			// (databaseId, title, uri, featuredImage, propertyFeatures)
			// it will be called properties in the client
			properties: data.properties.nodes,
			// let's pass the total number of properties to the client too
			total: data.properties.pageInfo.offsetPagination.total
		});
	} catch (e){
		console.log("ERROR: ", e);
		
	}
};

export default handler;