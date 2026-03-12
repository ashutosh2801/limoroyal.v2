'use client'
import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: "How far in advance should I book my limo?",
    answer:
      "We recommend booking at least 24–48 hours in advance. For weddings, proms, and peak weekends, earlier reservations ensure availability.",
  },
  {
    question: "Do you track flights for airport transfers?",
    answer:
      "Yes, we monitor flight arrivals in real time to adjust pickup timing, ensuring smooth airport transfers without delays.",
  },
  {
    question: "Are your chauffeurs licensed and insured?",
    answer:
      "Absolutely. All our chauffeurs are professionally trained, licensed, background-checked, and fully insured for your safety and comfort.",
  },
  {
    question: "What types of vehicles are available?",
    answer:
      "Our fleet includes luxury sedans, SUVs, stretch limousines, and executive vehicles suitable for corporate, airport, and special events.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancellations made within our policy window may qualify for refunds. Contact our support team for full policy details.",
  },
]

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showAll, setShowAll] = useState(false)

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 3)

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section id='faq' className="pb-15">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-white text-2xl lg:text-3xl font-medium mb-5">
            Frequently Asked Questions
          </h2>
          <p className="webFontColor text-base">
            Find answers to common questions about our luxury limo services.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">

          {visibleFaqs.map((faq, index) => {
            const isActive = activeIndex === index

            return (
              <div
                key={index}
                className={`rounded-xl border transition duration-300 ${
                  isActive
                    ? 'bg-[#1a1a1a] border-[#bb9a4b]'
                    : 'bg-[#111] border-[#1f1f1f]'
                }`}
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span
                    className={`font-medium ${
                      isActive ? 'text-[#bb9a4b]' : 'text-white'
                    }`}
                  >
                    {faq.question}
                  </span>

                  {isActive ? (
                    <Minus size={20} className="text-[#bb9a4b]" />
                  ) : (
                    <Plus size={20} className="text-gray-400" />
                  )}
                </button>

                {/* Answer */}
                <div
                  className={`px-5 pb-5 text-sm webFontColor leading-relaxed transition-all duration-300 ${
                    isActive ? 'block' : 'hidden'
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            )
          })}

        </div>

        {/* See More Button */}
        {faqs.length > 3 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2 rounded-full border border-[#bb9a4b] text-[#bb9a4b] hover:bg-[#bb9a4b] hover:text-black transition duration-300 text-sm cursor-pointer"
            >
              {showAll ? "Show Less" : "See More"}
            </button>
          </div>
        )}

      </div>
    </section>
  )
}