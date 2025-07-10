import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto duration-200 bg-brand-light border-b border-brand-green/20">
        <nav className="content-container txt-xsmall-plus text-brand-dark flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex items-center h-full flex-1">
            <SideMenu regions={regions} />
          </div>

          <div className="flex items-center justify-center h-full flex-1">
            <LocalizedClientLink
              className="hover:text-brand-orange transition-colors font-heading"
              href="/account"
              data-testid="nav-account-link"
            >
              Account
            </LocalizedClientLink>
          </div>

          <div className="flex items-center justify-center h-full flex-1">
            <LocalizedClientLink
              className="hover:text-brand-orange transition-colors font-heading"
              href="/search"
              scroll={false}
              data-testid="nav-search-link"
            >
              Search
            </LocalizedClientLink>
          </div>

          <div className="flex items-center justify-end h-full flex-1">
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-brand-orange transition-colors font-heading flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
