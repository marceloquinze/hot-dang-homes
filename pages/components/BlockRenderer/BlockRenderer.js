import { theme } from "theme";
import { Cover } from "../Cover";
import { Heading } from "../Heading";
import { Paragraph } from "../Paragraph";

export const BlockRenderer = ({blocks}) => {
	return blocks.map( block =>{
		switch (block.name) {
			case 'core/paragraph': {
				return <Paragraph 
						key={block.id}
						content={block.attributes.content} 
						textAlign={block.attributes.textAlign}
						textColor={theme[block.attributes.textColor] || block.attributes.style?.color?.text}
						/>
			}
			case 'core/heading': {
				return <Heading 
						key={block.id} 
						textAlign={block.attributes.textAlign} 
						level={block.attributes.level} 
						content={block.attributes.content} 
						/>
			}
			case 'core/cover': {
				return <Cover key={block.id} background={block.attributes.url} >
					<BlockRenderer blocks={block.innerBlocks} />
				</Cover>
			}
			default: 
				return null;
		}
	})
}