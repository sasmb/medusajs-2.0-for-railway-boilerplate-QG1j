import { HttpTypes } from "@medusajs/types"
import { getProductsList } from "@lib/data/products"
import { ProductsCarousel } from "./products-carousel"

export default async function ProductsShowcase({
  countryCode,
}: {
  countryCode: string
}) {
  // Fetch products from the backend
  const { response } = await getProductsList({
    queryParams: { limit: 8 }, // Get 8 products for the carousel
    countryCode,
  })

  if (!response.products || response.products.length === 0) {
    return null
  }

  // Transform products to carousel format
  const productData = response.products.map((product) => ({
    title: product.title || "Product",
    button: "View Product",
    src: product.thumbnail || (product.images?.[0]?.url) || "",
    handle: product.handle || "", // Keep handle for navigation
  }))

  return (
    <div className="relative overflow-hidden w-full py-20 bg-brand-light">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-bold text-brand-dark tracking-tight font-heading">
          Our Products
        </h2>
        <p className="text-xs text-brand-dark opacity-70 mt-4 max-w-2xl mx-auto">
          Discover our premium selection of flours and grains, crafted with care and tradition
        </p>
      </div>
      
      <ProductsCarousel slides={productData} />
    </div>
  )
} 