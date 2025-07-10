"use client"

import { useScreenSize } from "../../../../hooks/use-screen-size"
import { PixelTrail } from "../../../../components/ui/pixel-trail"

const AboutUs: React.FC = () => {
  const screenSize = useScreenSize()

  return (
    <div className="relative w-full h-[75vh] bg-brand-green text-brand-light flex flex-col">
      <div className="absolute inset-0 z-0">
        <PixelTrail
          pixelSize={screenSize.lessThan(`md`) ? 48 : 80}
          fadeDuration={800}
          delay={400}
          pixelClassName="rounded-full bg-brand-orange opacity-30"
        />
      </div>

      <div className="justify-center items-center flex flex-col w-full h-full z-10 pointer-events-none space-y-4 px-6">
        <h2 className="text-5xl md:text-7xl font-bold text-center tracking-tight font-heading">
          About OFAM MILLS
        </h2>
        
        <div className="max-w-3xl text-center">
          <p className="text-xs leading-relaxed">
            We are a forward-thinking company dedicated to creating exceptional experiences 
            through innovative design and cutting-edge technology.
          </p>
        </div>

        <div className="flex gap-8 text-center">
          <div>
            <h3 className="text-xs font-bold">500+</h3>
            <p className="text-xs text-brand-light opacity-80">Customers</p>
          </div>
          
          <div>
            <h3 className="text-xs font-bold">10+</h3>
            <p className="text-xs text-brand-light opacity-80">Years</p>
          </div>
          
          <div>
            <h3 className="text-xs font-bold">50+</h3>
            <p className="text-xs text-brand-light opacity-80">Products</p>
          </div>
        </div>
      </div>

      <p className="absolute text-xs md:text-sm bottom-4 right-4 pointer-events-none text-brand-light opacity-80">
        crafting excellence since day one
      </p>
    </div>
  )
}

export default AboutUs 