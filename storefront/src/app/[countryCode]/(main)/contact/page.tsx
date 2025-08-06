import { Metadata } from "next"

import ContactTemplate from "@modules/contact/templates"

export const metadata: Metadata = {
  title: "Contact Us - OFAM Mills Customer Service",
  description:
    "Get in touch with OFAM Mills customer service. We're here to help with any questions about our premium agricultural products.",
}

type Props = {
  params: {
    countryCode: string
  }
}

export default async function ContactPage({ params }: Props) {
  return (
    <ContactTemplate countryCode={params.countryCode} />
}