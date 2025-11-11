import { ButtonLink } from "../ButtonLink"

export const CallToActionButton = ({buttonLabel, destination, align}) => {
	const alignMap = {
		"left": "text-align",
		"center": "text-center",
		"right": "text-right"
	}
	return (
		<div className={alignMap[align]}>
			<ButtonLink destination={destination} label={buttonLabel} />
		</div>
	)
}