import { useState } from "react";

export default function Tabs({ tabs, defaultTab = 0, onChange }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleChange = (index) => {
    setActiveTab(index);
    onChange?.(index);
  };

  return (
    <div className="w-full">
      {/* TAB HEADERS */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => handleChange(index)}
            className={`
              px-4 py-2 text-sm font-medium transition
              ${
                activeTab === index
                  ? "border-b-2 border-yellow-600 text-yellow-600"
                  : "text-gray-500 hover:text-gray-700"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="mt-4">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
}
