import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-brand-light relative small:min-h-screen">
      <div className="h-16 bg-brand-light border-b border-brand-green/20">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi text-brand-dark flex items-center gap-x-2 uppercase flex-1 basis-0"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block txt-compact-plus text-brand-dark/80 hover:text-brand-orange ">
              Back to shopping cart
            </span>
            <span className="mt-px block small:hidden txt-compact-plus text-brand-dark/80 hover:text-brand-orange">
              Back
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="txt-compact-xlarge-plus text-brand-dark hover:text-brand-orange uppercase font-heading"
            data-testid="store-link"
          >
            OFAM Mills
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">{children}</div>
      <div className="py-4 w-full flex items-center justify-center bg-brand-light">
        <span className="text-brand-dark/60 text-small-regular">
          Powered by OFAM Mills E-commerce
        </span>
      </div>
    </div>
  )
}
