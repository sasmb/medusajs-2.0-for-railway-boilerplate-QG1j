import { Metadata } from "next"

import AboutTemplate from "@modules/about/templates"

export const metadata: Metadata = {
  title: "About OFAM Mills - Our Story & Mission",
  description:
    "Learn about OFAM Mills' journey, mission, and commitment to providing premium agricultural products. Discover our sustainable farming practices and quality standards.",
}

type Props = {
  params: {
    countryCode: string
  }
}

export default async function AboutPage({ params }: Props) {
  return (
    <AboutTemplate countryCode={params.countryCode} />
  )
}