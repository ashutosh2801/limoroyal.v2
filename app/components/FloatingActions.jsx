import { PhoneIcon } from "@heroicons/react/24/solid";
import { FaWhatsapp } from "react-icons/fa";

const FloatingActions = () => {
  return (
    <div className="fixed bottom-25 md:bottom-15 right-5 flex-col items-end space-y-3 z-50 flex">
      
      {/* WhatsApp */}
      <a href="https://wa.me/4167255466" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-white">
        <span className="bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition p-3">
          <FaWhatsapp className="h-5 w-5" />
        </span>
      </a>

      {/* Phone */}
      <a href="tel:4167255466" className="flex items-center space-x-2 text-white">
        <span className="webBG rounded-full shadow-lg hover:bg-yellow-800 transition p-3">
          <PhoneIcon className="h-5 w-5" />
        </span>
      </a>
    </div>
  )
}

export default FloatingActions