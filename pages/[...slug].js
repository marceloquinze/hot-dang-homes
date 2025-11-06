import { gql } from "@apollo/client"
import client from "client"
import { cleanAndTransformBlocks } from "./utils/cleanAndTransformBlocks";
import { BlockRenderer } from "./components/BlockRenderer";

export default function Page( props ){
	console.log( "Page props: ", props )
	return <div>
		<h1>{props.title}</h1>
		<BlockRenderer blocks={props.blocks} />
	</div>
}

export const getStaticProps = async (context) => {
	console.log("contexct2: ", context)
	//este context é mágico... ele pega o valor de params.slug em getStaticPaths
	// seria porque o arquivo se chama [...slug]?

	const uri = `/${context.params.slug.join("/")}/`
	console.log("URI: ", uri)
	const {data} = await client.query({
		query: gql`
		query PageQuery($uri: String!) {
			nodeByUri(uri: $uri) {
			... on Page {
				id
				title
				blocks(postTemplate: false)
			}
			}
		}`,
		variables: {
			uri
		}
	})
	return {
		props: {
			blocks: cleanAndTransformBlocks(data.nodeByUri.blocks),
			title: data.nodeByUri.title
		}
	}
}

export const getStaticPaths = async () => {
	const {data} = await client.query({
		query: gql`
			query AllPagesQuery {
				pages {
					nodes {
						uri
					}
				}
			}		
		`,
	});

	return {
		paths: data.pages.nodes
			.filter( page => page.uri !== "/")
			.map( page => ({
				params: {
					// remove o primeiro e último "/"
					// depois quebra pela barra, gerando um array
					slug: page.uri.substring(1, page.uri.length -1).split("/")
				}
		})),
		fallback: "blocking",
	}
}