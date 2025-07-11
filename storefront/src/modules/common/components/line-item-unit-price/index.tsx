import { getPricesForVariant } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"

type LineItemUnitPriceProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  style?: "default" | "tight"
}

const LineItemUnitPrice = ({
  item,
  style = "default",
}: LineItemUnitPriceProps) => {
  const {
    original_price,
    calculated_price,
    original_price_number,
    calculated_price_number,
    percentage_diff,
  } = getPricesForVariant(item.variant) ?? {}
  const hasReducedPrice = calculated_price_number < original_price_number

  return (
    <div className="flex flex-col text-brand-dark/80 justify-center h-full">
      {hasReducedPrice && (
        <>
          <p>
            {style === "default" && (
              <span className="text-brand-dark/80">Original: </span>
            )}
            <span
              className="line-through text-brand-dark/60"
              data-testid="product-unit-original-price"
            >
              {original_price}
            </span>
          </p>
          {style === "default" && (
            <span className="text-brand-orange">-{percentage_diff}%</span>
          )}
        </>
      )}
      <span
        className={clx("text-base-regular text-brand-dark font-semibold", {
          "text-brand-orange": hasReducedPrice,
        })}
        data-testid="product-unit-price"
      >
        {calculated_price}
      </span>
    </div>
  )
}

export default LineItemUnitPrice
