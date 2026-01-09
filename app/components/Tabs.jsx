import React from "react";

const steps = [
  "Service Class",
  "Passenger Details",
  "Payment",
  "Checkout",
];

function Tabs({ activeStep }) {
  return (
    <div className="relative w-full max-w-3xl mx-auto pb-5">
      
      {/* Background line */}
      <div className="absolute top-8 left-0 right-0 h-[2px] bg-black" />

      {/* Progress line */}
      {/* <div
        className="absolute top-6 left-0 h-[2px] bg-black transition-all duration-300"
        style={{
          width: `${(activeStep / (steps.length - 1)) * 100}%`,
        }}
      /> */}

      <div className="relative flex justify-between">
        {steps.map((label, index) => {
          const isCompleted = index < activeStep;
          const isActive = index === activeStep;

          return (
            <div
              key={label}
              className="flex flex-col items-center text-center w-full"
            >
              {/* Step Label */}
              <span
                className={`mb-5 text-[9px] lg:text-base xl:text-sm font-semibold ${
                  isCompleted || isActive
                    ? "text-black"
                    : "text-gray-400"
                }`}
              >
                {label}
              </span>

              {/* Step Circle */}
              <div
                className={`
                  w-5 h-5 md:w-6 md:h-6 text-xs md:text-base flex items-center justify-center rounded-full z-10 mt-[-10px] md:mt-[-18px]
                  ${
                    isCompleted
                      ? "webBG text-white"
                      : isActive
                      ? "bg-white border-2 border-black text-black"
                      : "bg-white border-2 border-gray-300 text-gray-400"
                  }
                `}
              >
                {isCompleted ? "✓" : index + 1}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Tabs;
