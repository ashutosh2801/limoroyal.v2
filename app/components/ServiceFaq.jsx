"use client";

import React, { useState, useRef } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

const ServiceFaq = () => {
    const faqData = [
        {
            question: "Do you offer limo rentals for special events?",
            answer: "Yes, we provide luxury limousines for weddings, parties, corporate events, and other special occasions."
        },
        {
            question: "Are your vehicles available for airport transfers?",
            answer: "Yes, our fleet is available for convenient airport pickups and drop-offs."
        },
        {
            question: "Can I rent a limo for just a few hours?",
            answer: "Absolutely! We offer flexible rental durations, from a few hours to full-day service."
        },
        {
            question: "Do you provide luxury vehicles for corporate use?",
            answer: "Yes, our luxury fleet is perfect for business meetings, conferences, and corporate travel."
        },
        {
            question: "Is there a minimum age requirement to rent a vehicle?",
            answer: "Yes, you must be at least 21 years old to rent most vehicles, with some luxury models requiring you to be 25."
        }
    ];

    const [activeFaq, setActiveFaq] = useState(0);
    const [arrowExpanded, setArrowExpanded] = useState(true);
    const contentRef = useRef(null);

    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className='text-white text-2xl lg:text-4xl mb-5 lg:mb-5'>Frequently Asked Questions</h2>
            </div>

            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${arrowExpanded ? 'opacity-100 max-h-[2000px]' : 'opacity-0 max-h-0' }`}>
                <div className="transition-all duration-500 ease-in-out overflow-hidden">
                    <div ref={contentRef}>
                        <div className='space-y-4 py-4'>
                            {faqData.map((faq, index) => (
                                <div key={index} className='border webBorderColor rounded-lg overflow-hidden transition-all duration-500'>
                                    <button
                                        onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                        className='w-full !text-sm md:!text-xs lg:!text-base text-left px-5 py-3 text-white !font-semibold flex justify-between items-center bg-[#0a0a0a] cursor-pointer'
                                    >
                                        {faq.question}
                                        <span className='text-xl'>{activeFaq === index ? "−" : "+"}</span>
                                    </button>

                                    <div
                                        className={`px-5 text-sm md:text-xs lg:text-base webFontColor leading-relaxed transition-all duration-500 ease-in-out overflow-hidden ${
                                            activeFaq === index ? "max-h-40 py-3" : "max-h-0"
                                        }`}
                                    >
                                        <div className='transition-opacity duration-300 ease-in-out'>
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceFaq;
