import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&family=Funnel+Display:wght@300;400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-brand-light">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
