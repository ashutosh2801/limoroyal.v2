"use client";

import React, { useState, useRef } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

const FaqPage = () => {
    const faqData = [
        {
            question: "Do you have chauffeurs that speak multiple languages?",
            answer: "Yes. At Toronto airport chauffeur service we cater to clients from all over the world. Therefore our team consists of chauffeurs that can converse in multiple languages."
        },
        {
            question: "How will I meet my chauffeur at the airport?",
            answer: "After you complete all formalities at the airport you may look for your chauffeur at the arrival area. The chauffeur will be holding a sign board with your name on it. You might also receive a message from the Toronto airport chauffeur service, if you have provided your mobile number."
        },
        {
            question: "Will my chauffeur be there on time if my flight arrives early?",
            answer: "Yes, we monitor all our client’s flights and ensure that we arrive on time."
        },
        {
            question: "Will my chauffeur respect my privacy?",
            answer: "Yes. All our chauffeurs adhere to our confidentiality policy that ensures the client’s privacy at all times."
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
