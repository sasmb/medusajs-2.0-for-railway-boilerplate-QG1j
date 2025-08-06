"use client"

import { useState } from "react"

type ContactTemplateProps = {
  countryCode: string
}

const ContactTemplate: React.FC<ContactTemplateProps> = ({ countryCode }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // You can add actual form submission logic here
  }

  return (
    <div className="min-h-screen bg-white py-16 md:py-24">
      <div className="content-container max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-brand-dark mb-8 font-heading">
            CUSTOMER SERVICE
          </h1>
          <div className="max-w-3xl mx-auto space-y-6 text-sm md:text-base text-brand-dark/80 leading-relaxed">
            <p>
              OFAM Mills Store is a portal solely for brands we partner with. When you make a purchase 
              through any link on our site, it's a direct purchase with the brand, not OFAM Mills. Any issues 
              regarding products, payments, purchases, or returns should be directed to the brand from 
              which you made the purchase, not OFAM Mills.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 p-8 md:p-12 rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-2 text-center font-heading">
            Finance Queries
          </h2>
          <p className="text-center text-brand-dark/70 mb-8 text-sm md:text-base">
            OFAM Mills online is only a portal to the brands we collaborate with<br />
            any issues with products or purchases should be sent directly<br />
            to the brand in question
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-brand-dark mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-brand-dark mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-dark mb-2">
                Email*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none"
                required
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-brand-dark mb-2">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none bg-white"
                required
              >
                <option value="">Please Select</option>
                <option value="general">General Inquiry</option>
                <option value="product">Product Question</option>
                <option value="order">Order Issue</option>
                <option value="partnership">Partnership Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-brand-dark mb-2">
                Message*
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none resize-vertical"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-brand-dark text-white py-4 px-8 rounded-md font-semibold hover:bg-brand-dark/90 transition-colors focus:ring-2 focus:ring-brand-green focus:ring-offset-2 outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactTemplate