import { faBathtub, faBed, faCar, faDog } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import numeral from "numeral"

export const PropertyCard = ({
		title, 
		destination, 
		bedrooms, 
		bathrooms, 
		price, 
		hasParking, 
		petFriendly, 
		image
	}) => {

	return (
<Link href={destination} className="block h-full">
  <div className="border-2 border-slate-300 p-5 bg-slate-100 hover:bg-slate-200 h-full flex">
    <div className="flex flex-col w-full gap-5">
      {/* Coluna da imagem */}
      <div className="w-full h-[250px] relative flex-shrink-0">
        <Image 
          src={image}
          fill
          alt={title}
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Coluna do conteúdo */}
      <div className="flex flex-col justify-start flex-1 gap-2">
        <div>
          <div className="text-lg font-bold">{title}</div>
          <div className="text-lg">${numeral(price).format("0,0")}</div>
        </div>

        <div className="flex justify-between text-sm mt-2">
          <div>
            <FontAwesomeIcon icon={faBathtub} />
            <span className="pl-2">{bathrooms} bathrooms</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faBed} />
            <span className="pl-2">{bedrooms} bedrooms</span>
          </div>
        </div>

        {(!!hasParking || !!petFriendly) && (
          <div className="flex justify-between text-sm mt-3">
            {!!hasParking && (
              <div>
                <FontAwesomeIcon icon={faCar} /> parking available
              </div>
            )}
            {!!petFriendly && (
              <div>
                <FontAwesomeIcon icon={faDog} /> pet friendly
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
</Link>

	)
}

