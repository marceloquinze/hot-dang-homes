import { getTextAlign } from "pages/utils/fonts"
import { relativeToAbsoluteUrls } from "pages/utils/relativeToAbsoluteUrls"

export const Paragraph = ({textAlign = "left", textColor, content}) => {
	return (
		<p 
			className={`max-w-5xl mx-auto ${getTextAlign(textAlign)}`}
			style={ {color: textColor } }
			dangerouslySetInnerHTML={ {__html: relativeToAbsoluteUrls(content) } }
		/>
	)
}