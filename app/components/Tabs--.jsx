import React from 'react'

function Tabs({ activeStep }) {

    const steps = ["Service Class", "Pickup Info", "Payment", "Checkout"];

  return (
    <div className="relative">

        {/* Connector Line */}
        <div className="absolute left-0 right-0 top-[30px] h-[2px] bg-gray-300" />

        <div className="relative flex justify-between">

            {steps.map((label, i) => {
            const isActive = i === activeStep;          // current page step
            const isCompleted = i < activeStep;         // passed steps

            return (
                <div key={label} className="flex flex-col items-center w-full">

                {/* Label */}
                <div
                    className={`
                    mb-2 text-[9px] md:text-xs font-semibold
                    ${isActive || isCompleted ? "text-black" : "text-gray-400"}
                    `}
                >
                    {label}
                </div>
                
                {/* Circle */}
                <div
                    className={`
                    w-4 h-4 rounded-full border-[3px] z-10
                    ${isActive ? "bg-white border-black" : ""}
                    ${isCompleted ? "bg-black border-black" : ""}
                    ${!isActive && !isCompleted ? "bg-white border-gray-400" : ""}
                    `}
                />
                
                </div>
            );
            })}

        </div>

        {/* Progress fill line */}
        <div className="absolute top-[30px] h-[2px] bg-black transition-all duration-500"
            style={{
                width: `${(activeStep + 0.4 / (steps.length - 1)) * 100}%`,
            }}
        />
        </div>
  )
}

export default Tabs
