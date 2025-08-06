"use client"

import { useScreenSize } from "../../../hooks/use-screen-size"
import { PixelTrail } from "../../../components/ui/pixel-trail"

type AboutTemplateProps = {
  countryCode: string
}

const AboutTemplate: React.FC<AboutTemplateProps> = ({ countryCode }) => {
  const screenSize = useScreenSize()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] bg-brand-green text-brand-light flex flex-col">
        <div className="absolute inset-0 z-0">
          <PixelTrail
            pixelSize={screenSize.lessThan(`md`) ? 48 : 80}
            fadeDuration={800}
            delay={400}
            pixelClassName="rounded-full bg-brand-orange opacity-30"
          />
        </div>

        <div className="justify-center items-center flex flex-col w-full h-full z-10 pointer-events-none space-y-6 px-6">
          <h1 className="text-6xl md:text-8xl font-bold text-center tracking-tight font-heading">
            About OFAM MILLS
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-4xl opacity-90">
            Cultivating excellence in agricultural products for over a decade
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="content-container py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6 font-heading">
              Our Story
            </h2>
            <div className="space-y-4 text-lg text-brand-dark/80 leading-relaxed">
              <p>
                Founded over 10 years ago, OFAM Mills began as a small family operation with a simple mission: 
                to provide the highest quality agricultural products while maintaining sustainable farming practices.
              </p>
              <p>
                What started as a local grain mill has grown into a trusted name in premium agricultural products, 
                serving over 500 customers across multiple regions. Our commitment to quality and sustainability 
                has remained unwavering throughout our journey.
              </p>
              <p>
                Today, we continue to honor our roots while embracing innovation, ensuring that every product 
                that bears the OFAM Mills name meets our exacting standards for purity, nutrition, and taste.
              </p>
            </div>
          </div>
          <div className="bg-brand-green/5 p-8 rounded-lg">
            <div className="grid grid-cols-2 gap-8 text-center">
              <div>
                <h3 className="text-4xl font-bold text-brand-orange mb-2">500+</h3>
                <p className="text-brand-dark">Happy Customers</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-brand-orange mb-2">10+</h3>
                <p className="text-brand-dark">Years of Excellence</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-brand-orange mb-2">50+</h3>
                <p className="text-brand-dark">Premium Products</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-brand-orange mb-2">100%</h3>
                <p className="text-brand-dark">Quality Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-brand-green/5 py-16 md:py-24">
        <div className="content-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6 font-heading">
                Our Mission
              </h3>
              <p className="text-lg text-brand-dark/80 leading-relaxed">
                To provide premium agricultural products that nourish communities while 
                promoting sustainable farming practices that protect our environment for 
                future generations. We are committed to quality, integrity, and innovation 
                in everything we do.
              </p>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6 font-heading">
                Our Vision
              </h3>
              <p className="text-lg text-brand-dark/80 leading-relaxed">
                To be the leading provider of sustainable agricultural products, 
                recognized globally for our commitment to quality, environmental 
                stewardship, and community support. We envision a world where 
                sustainable agriculture feeds the future.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="content-container py-16 md:py-24">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-brand-dark mb-12 font-heading">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-brand-orange rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl text-white font-bold">Q</span>
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-3">Quality First</h3>
            <p className="text-brand-dark/80">
              Every product undergoes rigorous quality testing to ensure it meets our high standards 
              before reaching our customers.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-brand-green rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl text-white font-bold">S</span>
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-3">Sustainability</h3>
            <p className="text-brand-dark/80">
              We are committed to environmentally responsible farming practices that preserve 
              our planet for future generations.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-brand-orange rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl text-white font-bold">I</span>
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-3">Integrity</h3>
            <p className="text-brand-dark/80">
              Honesty and transparency guide all our business practices, from sourcing 
              to customer service.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-brand-dark/5 py-16 md:py-24">
        <div className="content-container">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-brand-dark mb-12 font-heading">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-32 h-32 bg-brand-green rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-white font-bold">OF</span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">Founders</h3>
              <p className="text-brand-orange font-semibold mb-2">Leadership Team</p>
              <p className="text-brand-dark/80 text-sm">
                Visionary leaders with decades of experience in agriculture and sustainable farming.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-brand-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-white font-bold">QA</span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">Quality Assurance</h3>
              <p className="text-brand-orange font-semibold mb-2">Quality Control Team</p>
              <p className="text-brand-dark/80 text-sm">
                Dedicated professionals ensuring every product meets our stringent quality standards.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-brand-green rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-white font-bold">PR</span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">Production</h3>
              <p className="text-brand-orange font-semibold mb-2">Operations Team</p>
              <p className="text-brand-dark/80 text-sm">
                Skilled technicians and farmers working together to deliver excellence.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="content-container py-16 md:py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6 font-heading">
          Join Our Journey
        </h2>
        <p className="text-xl text-brand-dark/80 mb-8 max-w-3xl mx-auto">
          Experience the difference that quality and sustainability make. 
          Discover our premium agricultural products today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`/${countryCode}/store`}
            className="inline-block bg-brand-green text-white px-8 py-4 rounded-lg font-semibold hover:bg-brand-green/90 transition-colors"
          >
            Shop Our Products
          </a>
          <a
            href={`/${countryCode}/contact`}
            className="inline-block bg-transparent border-2 border-brand-orange text-brand-orange px-8 py-4 rounded-lg font-semibold hover:bg-brand-orange hover:text-white transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}

export default AboutTemplate