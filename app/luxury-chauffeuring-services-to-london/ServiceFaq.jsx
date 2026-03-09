"use client";

import React, { useState, useRef } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

const ServiceFaq = () => {
    const faqData = [
        {
            question: "How will I find the chauffeur at the airport?",
            answer: "Your chauffeur will be at the arrival hall holding a sign with your name. They will assist you to load your luggage to the vehicle."
        },
        {
            question: "What types of vehicles are available?",
            answer: "We have a fleet of vehicles consisting of SUVs, sedans, and stretch limousines to suit your budget and preferences."
        },
        {
            question: "Can I cancel or change my booking?",
            answer: "Yes, you may contact our support team if you want to cancel a booking. Please read our cancellation policy to stay updated on the free cancellation period."
        },
        {
            question: "Do you offer meet-and-greet services?",
            answer: "Yes, we offer meet-and-greet services to our clients to ensure a smooth transition from the flight to the destination."
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
