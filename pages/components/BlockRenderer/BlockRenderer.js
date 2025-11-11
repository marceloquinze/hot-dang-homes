import { theme } from "theme";
import { Cover } from "../Cover";
import { Heading } from "../Heading";
import { Paragraph } from "../Paragraph";
import { CallToActionButton } from "../CallToActionButton";
import { Columns } from "../Columns";
import { Column } from "../Column";
import Image from "next/image";

export const BlockRenderer = ({blocks}) => {
	return blocks.map( block =>{
		switch (block.name) {
			case 'core/columns': {
				return <Columns 
						key={block.id} 
						isStackedOnMobile={block.attributes.isStackedOnMobile}>
							<BlockRenderer blocks={block.innerBlocks} />
						</Columns>
			}
			case 'core/column': {
				return <Column 
						key={block.id} 
						width={block.attributes?.width || ''}>
							<BlockRenderer blocks={block.innerBlocks} />
						</Column>
			}
			case 'core/group':
			case 'core/block': {
				return <BlockRenderer key={block.id} blocks={block.innerBlocks} />
			}
			case 'core/image': {
				return <Image 
						key={block.id} 
						src={block.attributes.url} 
						alt={block.attributes.alt || ""} 
						width={block.attributes.width} 
						height={block.attributes.height}
					/>
			}
			case 'acf/ctabutton': {
				return <CallToActionButton 
						key={block.id} 
						buttonLabel={block.attributes.data.label} 
						destination={block.attributes.data.destination || "/"} 
						align={block.attributes.data.align} 
					/>
			}
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
				return <Cover 
						key={block.id} 
						background={block.attributes.url} >
							<BlockRenderer blocks={block.innerBlocks} />
						</Cover>
			}
			default: 
				console.log("Unknown block: ", block);
				return null;
		}
	})
}