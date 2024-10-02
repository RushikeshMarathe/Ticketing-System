import React, { useState } from 'react';

const CreateTicket = () => {
  const [formData, setFormData] = useState({
    subject: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Ticket Created Successfully');
    setFormData({ subject: '', description: '' });
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create a New Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="subject" className="block font-semibold mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-700"
            placeholder="Enter the subject of your issue"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-700"
            rows="5"
            placeholder="Describe your issue in detail"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-cyan-700 text-white rounded-lg hover:bg-cyan-600 transition"
        >
          Create Ticket
        </button>
      </form>
    </div>
  );
};

export default CreateTicket;
