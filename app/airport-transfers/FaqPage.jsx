"use client";

import React, { useState, useRef } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

const FaqPage = () => {
    const faqData = [
        {
            question: "What types of vehicles do you offer for Toronto Airport limousine service?",
            answer: "We offer a variety of vehicles as the best airport limo service Toronto. Our fleet of vehicles include luxury sedans, SUVs, and limousines to ensure a comfortable transfer to and from the airport."
        },
        {
            question: "Is there a fee for meet-and-greet service?",
            answer: "Our Pearson airport limo service charges no additional fee for meet-and-greet service."
        },
        {
            question: "Will I be picked up or dropped off at my hotel from the airport?",
            answer: "Yes. Royal Limo airport transportation Toronto picks you up or drops you off at your doorstep, whether it’s a hotel or house."
        },
        {
            question: "Can I hire Royal Limo airport limo service Toronto for special occasions?",
            answer: "Yes, we provide luxury limousines for all types of special occasions including weddings, parties, corporate events, and more."
        },
        {
            question: "Do you offer same-day Pearson Airport car service?",
            answer: "We recommend you to book in advance if you require a limousine service for the airport. This allows us to track your flight and prepare for a seamless airport transfer."
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

export default FaqPage;
