"use client"

// Force Railway redeploy - hero text color updates
import { useEffect } from "react"
import { motion, stagger, useAnimate } from "motion/react"

import Floating, {
  FloatingElement,
} from "@components/ui/parallax-floating"

const exampleImages = [
  {
    url: "/images/Screenshot 2025-07-03 at 12.07.30.png",
    title: "Screenshot 1",
  },
  {
    url: "/images/Screenshot 2025-07-03 at 12.08.21.png",
    title: "Screenshot 2",
  },
  {
    url: "/images/Screenshot 2025-07-10 at 13.36.05.png",
    title: "Screenshot 3",
  },
  {
    url: "/images/Screenshot 2025-07-10 at 13.37.11.png",
    title: "Screenshot 4",
  },
  {
    url: "/images/Screenshot 2025-07-10 at 13.37.41.png",
    title: "Screenshot 5",
  },
  {
    url: "/images/Screenshot 2025-07-10 at 13.38.33.png",
    title: "Screenshot 6",
  },
  {
    url: "/images/Screenshot 2025-07-10 at 13.38.49.png",
    title: "Screenshot 7",
  },
]

const Hero = () => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate("img", { opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.15) })
  }, [])

  return (
    <div
      className="flex w-full h-[75vh] justify-center items-center bg-brand-light overflow-hidden relative"
      ref={scope}
    >
      <motion.div
        className="z-50 text-center space-y-4 items-center flex flex-col"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88, delay: 1.5 }}
      >
        <p className="text-5xl md:text-7xl z-50 text-brand-orange font-bold font-heading">
          OFAM MILLS
        </p>
        <p className="text-xs z-50 hover:scale-110 transition-transform bg-brand-green text-white rounded-full py-2 px-6 cursor-pointer">
          Shop Now
        </p>
      </motion.div>

      <Floating sensitivity={-1} className="overflow-hidden">
        <FloatingElement depth={0.5} className="top-[8%] left-[11%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[0].url}
            alt={exampleImages[0].title}
            className="w-20 h-20 md:w-32 md:h-32 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[10%] left-[32%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[1].url}
            alt={exampleImages[1].title}
            className="w-24 h-24 md:w-36 md:h-36 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg"
          />
        </FloatingElement>
        <FloatingElement depth={2} className="top-[2%] left-[53%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[2].url}
            alt={exampleImages[2].title}
            className="w-36 h-48 md:w-48 md:h-64 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[0%] left-[83%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[3].url}
            alt={exampleImages[3].title}
            className="w-28 h-28 md:w-40 md:h-40 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg"
          />
        </FloatingElement>

        <FloatingElement depth={1} className="top-[40%] left-[2%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[4].url}
            alt={exampleImages[4].title}
            className="w-32 h-32 md:w-44 md:h-44 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg"
          />
        </FloatingElement>
        <FloatingElement depth={2} className="top-[70%] left-[77%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[6].url}
            alt={exampleImages[6].title}
            className="w-32 h-32 md:w-44 md:h-56 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg"
          />
        </FloatingElement>

        <FloatingElement depth={4} className="top-[73%] left-[15%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[5].url}
            alt={exampleImages[5].title}
            className="w-48 md:w-64 h-full object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[80%] left-[50%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[0].url}
            alt={exampleImages[0].title}
            className="w-28 h-28 md:w-40 md:h-40 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg"
          />
        </FloatingElement>
      </Floating>
    </div>
  )
}

export default Hero
