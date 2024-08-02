'use client';
import { useState } from 'react';

const CustomerInfoForm = ({ onCustomerInfoChange }: {onCustomerInfoChange: any}) => {
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
    onCustomerInfoChange({ ...customer, [name]: value });
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Customer Information</h3>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={customer.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-primary-light rounded bg-primary-dark text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={customer.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-primary-light rounded bg-primary-dark text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1" htmlFor="phone">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={customer.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-primary-light rounded bg-primary-dark text-white"
          required
        />
      </div>
    </div>
  );
};

export default CustomerInfoForm;
