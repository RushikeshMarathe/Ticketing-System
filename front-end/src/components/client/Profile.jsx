import React from 'react';

const Profile = () => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
      <div className="space-y-4">
        <div className="p-4 border border-slate-300 rounded-lg">
          <p className="font-semibold">Name: John Doe</p>
          <p>Email: johndoe@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
