"use client";

import { Carousel } from "@components/ui/carousel";
import { useRouter } from "next/navigation";

interface ProductSlide {
  title: string;
  button: string;
  src: string;
  handle: string;
}

interface ProductsCarouselProps {
  slides: ProductSlide[];
}

export function ProductsCarousel({ slides }: ProductsCarouselProps) {
  const router = useRouter();

  // Transform slides to add navigation functionality
  const carouselSlides = slides.map((slide) => ({
    title: slide.title,
    button: slide.button,
    src: slide.src,
    onClick: () => {
      if (slide.handle) {
        router.push(`/products/${slide.handle}`);
      }
    },
  }));

  return <Carousel slides={carouselSlides} />;
} 