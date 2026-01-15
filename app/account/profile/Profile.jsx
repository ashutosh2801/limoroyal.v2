"use client";
import AccountSidebar from "../../components/AccountSidebar";

const Profile = () => {
  return (
    <AccountSidebar active="profile">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-white mb-2">My Profile</h3>
        <p className="webFontColor text-sm">
          View and update your personal information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-fit">
        
        {/* Profile Summary */}
        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center text-xl font-semibold text-white">
              JD
            </div>
            <div>
              <p className="font-medium text-white">John Doe</p>
              <p className="text-gray-300 text-sm">john.doe@limoroyal.com</p>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-300 space-y-2">
            <p>
              <span className="text-white font-medium">Member since:</span> Jan 2025
            </p>
            <p>
              <span className="text-white font-medium">Total Bookings:</span> 12
            </p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Edit Personal Information</h4>

          <form className="space-y-6 max-w-xl">
            
            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First Name"
                className="input text-white border border-gray-700 bg-[#222222] px-2 py-2 rounded-lg focus:outline-none text-sm"
                defaultValue="John"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="input text-white border border-gray-700 bg-[#222222] px-2 py-2 rounded-lg focus:outline-none text-sm"
                defaultValue="Doe"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Email */}
                <input
                type="email"
                className="input text-white border border-gray-700 bg-[#222222] px-2 py-2 rounded-lg focus:outline-none text-sm"
                defaultValue="john.doe@limoroyal.com"
                readOnly
                />

                {/* Phone */}
                <input
                type="tel"
                placeholder="Phone Number"
                className="input text-white border border-gray-700 bg-[#222222] px-2 py-2 rounded-lg focus:outline-none text-sm"
                defaultValue="+1 555 234 5678"
                />
            </div>
          </form>
        </div>

      </div>

      <div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pt-2 mt-5 text-sm">
          <button
            type="button"
            className="webBG px-9 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition cursor-pointer"
          >
            Save Changes
          </button>

          <button
            type="button"
            className="px-6 py-3 border border-red-900 rounded-lg bg-red-900 hover:opacity-90 text-white transition cursor-pointer"
          >
            Delete Account
          </button>
        </div>
      </div>
    </AccountSidebar>
  );
};

export default Profile;
