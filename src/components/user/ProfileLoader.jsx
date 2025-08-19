import React from 'react';

const ProfileLoader = () => {
  return (
    <div className="w-full max-w-md mx-auto p-4 md:p-6 rounded-lg bg-slate-900 text-white font-sans">
      <div className="animate-pulse">
        {/* User Profile Section */}
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-slate-700 mr-4"></div>
          <div>
            <div className="h-4 w-24 bg-slate-700 rounded mb-2"></div>
            <div className="h-3 w-32 bg-slate-700 rounded"></div>
          </div>
        </div>

        {/* Referral Code Section */}
        <div className="mb-6">
          <div className="h-4 w-48 bg-slate-700 rounded"></div>
        </div>

        {/* Action Buttons Section */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="h-12 bg-slate-700 rounded-lg"></div>
          <div className="h-12 bg-slate-700 rounded-lg"></div>
        </div>

        {/* Wallet Balance Card */}
        <div className="bg-slate-800 p-4 rounded-lg flex justify-between items-center mb-4">
          <div>
            <div className="h-4 w-28 bg-slate-700 rounded mb-2"></div>
            <div className="h-6 w-16 bg-slate-700 rounded"></div>
          </div>
          <div className="h-10 w-24 bg-slate-700 rounded-lg"></div>
        </div>

        {/* Bonus Balance Card */}
        <div className="bg-slate-800 p-4 rounded-lg flex justify-between items-center mb-8">
          <div>
            <div className="h-4 w-28 bg-slate-700 rounded mb-2"></div>
            <div className="h-6 w-16 bg-slate-700 rounded"></div>
          </div>
          <div className="h-10 w-28 bg-slate-700 rounded-lg"></div>
        </div>

        {/* Bottom Navigation Section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800 p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="h-8 w-8 bg-slate-700 rounded mb-2"></div>
            <div className="h-4 w-32 bg-slate-700 rounded"></div>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="h-8 w-8 bg-slate-700 rounded mb-2"></div>
            <div className="h-4 w-24 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProfileLoader
