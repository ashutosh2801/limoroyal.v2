"use client";

import React, { useState, useRef } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

const FaqPage = () => {
    const faqData = [
        {
            question: "How do I track the arrival of my shuttle?",
            answer: "We will provide you with the timing of your pick-up or drop-off, the day prior to your travel. If there are any changes to this time we will notify it to you."
        },
        {
            question: "Can I hire Royal Limo Toronto shuttle service for special events?",
            answer: "Yes. We provide corporate event packages for larger groups attending corporate functions. This package offers luxury transportation for VIPs, clients, and employees."
        },
        {
            question: "Are your chauffeurs licensed and insured?",
            answer: "YWe give top priority for the safety of our clients. All our chauffeurs are fully licensed and insured. We do extensive background checks and provider training to all our chauffeurs."
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
