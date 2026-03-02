import { Input } from "pages/components/Input"

export const Filter = () => {
	return (
		<div className="max-w-7xl mx-auto my-5 flex gap-5 border-solid border-slate-400 border-2 p-5 rounded-md">
			<div className="flex-1">
				<div>
					<label htmlFor="has_parking" className="cursor-pointer">
						<input type="checkbox" name="has_parking" id="" />
						<span className="pl-2">has parking</span>
					</label>
				</div>
				<div>
					<label htmlFor="pet_friendly" className="cursor-pointer">
						<input type="checkbox" name="pet_friendly" id="" />
						<span className="pl-2">pet friendly</span>
					</label>
				</div>
			</div>
			<div className="flex-1">
				<span>Min Price</span>
				<Input type="number" />
			</div>
			<div className="flex-1">
				<span>Max Price</span>
				<Input type="number" />
			</div>
			<div>
				<div className="btn">Search</div>
			</div>
		</div>
	)
}