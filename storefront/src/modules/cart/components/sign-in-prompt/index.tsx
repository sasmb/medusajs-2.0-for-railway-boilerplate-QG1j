import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-brand-light flex items-center justify-between">
      <div>
        <Heading level="h2" className="txt-xlarge text-brand-dark font-heading">
          Already have an account?
        </Heading>
        <Text className="txt-medium text-brand-dark/80 mt-2">
          Sign in for a better experience.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button variant="secondary" className="h-10 bg-brand-green hover:bg-brand-green/90 text-white border-0 font-heading" data-testid="sign-in-button">
            Sign in
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
