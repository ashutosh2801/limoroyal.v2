"use client";
import AccountSidebar from "../../components/AccountSidebar";

const Dashboard = () => {
  return (
    <AccountSidebar active="dashboard">
      <h3 className="text-2xl font-semibold text-white mb-2">Hi John Doe,</h3>
      <p className='webFontColor text-sm'>Welcome to your dashboard. you can view your recent orders, manage your addresses, and edit your profile.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
        <div className="bg-black border border-gray-800 rounded-lg p-6">
          <p className="text-gray-400 text-sm">Total Bookings</p>
          <h4 className="text-3xl font-semibold mt-2 webColor">12</h4>
        </div>

        <div className="bg-black border border-gray-800 rounded-lg p-6">
          <p className="text-gray-400 text-sm">Upcoming Rides</p>
          <h4 className="text-3xl font-semibold mt-2 webColor">2</h4>
        </div>  

        <div className="bg-black border border-gray-800 rounded-lg p-6">
          <p className="text-gray-400 text-sm">Total Spent</p>
          <h4 className="text-3xl font-semibold mt-2 webColor">$4,850</h4>
        </div>
      </div>
    </AccountSidebar>
  );
};

export default Dashboard;
