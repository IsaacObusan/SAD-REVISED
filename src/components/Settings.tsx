import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [contactInfo, setContactInfo] = useState({
    email: 'johndoe@example.com',
    phone: '+1-555-123-4567',
  });

  const [billingMethods, setBillingMethods] = useState([
    { id: 1, type: 'Credit Card', details: '**** **** **** 1234' },
    { id: 2, type: 'PayPal', details: 'johndoe@example.com' },
  ]);

  const [newBillingMethod, setNewBillingMethod] = useState('');

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBillingMethod = () => {
    if (newBillingMethod.trim()) {
      setBillingMethods((prev) => [
        ...prev,
        { id: prev.length + 1, type: 'Custom', details: newBillingMethod },
      ]);
      setNewBillingMethod('');
    }
  };

  const handleDeleteBillingMethod = (id: number) => {
    setBillingMethods((prev) => prev.filter((method) => method.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Contact Info Section */}
      <div className="bg-white p-6 shadow rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
        <div className="mb-4">
          <label className="block font-medium mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={contactInfo.email}
            onChange={handleContactChange}
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Phone:</label>
          <input
            type="text"
            name="phone"
            value={contactInfo.phone}
            onChange={handleContactChange}
            className="w-full border rounded px-4 py-2"
          />
        </div>
      </div>

      {/* Billing Methods Section */}
      <div className="bg-white p-6 shadow rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">Billing Methods</h2>
        <ul className="mb-4">
          {billingMethods.map((method) => (
            <li
              key={method.id}
              className="flex items-center justify-between border-b py-2"
            >
              <span>
                {method.type}: {method.details}
              </span>
              <button
                onClick={() => handleDeleteBillingMethod(method.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Add new billing method"
            value={newBillingMethod}
            onChange={(e) => setNewBillingMethod(e.target.value)}
            className="w-full border rounded px-4 py-2"
          />
          <button
            onClick={handleAddBillingMethod}
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
          >
            Add
          </button>
        </div>
      </div>

      {/* Payments Section */}
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Payments</h2>
        <p className="text-gray-600">Manage your payment history and invoices here.</p>
        <button className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">
          View Payment History
        </button>
      </div>
    </div>
  );
};

export default Settings;
