import React from 'react';

const MyTickets = () => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">My Tickets</h2>
      <div className="space-y-4">
        <div className="p-4 border border-slate-300 rounded-lg">
          <h3 className="text-lg font-semibold">Ticket #12345</h3>
          <p>Status: Open</p>
          <p>Issue: Cannot access account</p>
        </div>
        {/* Add more ticket items here */}
      </div>
    </div>
  );
};

export default MyTickets;
