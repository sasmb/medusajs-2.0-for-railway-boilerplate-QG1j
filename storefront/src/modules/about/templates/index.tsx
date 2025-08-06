type AboutTemplateProps = {
  countryCode: string
}

const AboutTemplate: React.FC<AboutTemplateProps> = ({ countryCode }) => {
  return (
    <div className="min-h-screen bg-brand-light">
      {/* Hero Section with Background Image */}
      <div 
        className="relative w-full h-[75vh] bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center"
        style={{
          backgroundImage: `url('/images/Screenshot 2025-07-10 at 13.37.11.png')`,
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        
        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-8xl font-bold text-brand-orange tracking-tight font-heading mb-6">
            About OFAM MILLS
          </h1>
          <p className="text-sm md:text-base text-white max-w-4xl mx-auto">
            Cultivating excellence in agricultural products for over a decade
          </p>
        </div>
      </div>

      {/* Simple Centered Content */}
      <div className="content-container py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <p className="text-sm md:text-base text-brand-dark/80 leading-relaxed">
            At OFAM Mills, our goal is to spread positivity through smiles and make the world a happier, kinder place.
          </p>
          
          <p className="text-sm md:text-base text-brand-dark/80 leading-relaxed">
            All our collaborations, partnerships, and experiences over the last fifty years have culminated in this philosophy, and as 
            we look to the next fifty years and beyond, we're constantly finding ways to show people how to smile to the world. We 
            do this by continuing to encourage people to "Take Time to Smile." Because what could be more inspiring and universal 
            than smiling?
          </p>

          <div className="pt-8">
            <a
              href={`/${countryCode}/store`}
              className="inline-block bg-brand-green text-white px-8 py-4 rounded-lg font-semibold hover:bg-brand-green/90 transition-colors mr-4"
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
    </div>
  )
}

export default AboutTemplate