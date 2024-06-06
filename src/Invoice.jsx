import React, { useState } from 'react';

const InvoiceForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    seller: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      pan: '',
      gst: ''
    },
    billing: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      stateCode: ''
    },
    shipping: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      stateCode: ''
    },
    order: {
      number: '',
      date: ''
    },
    invoice: {
      number: '',
      details: '',
      date: '',
      reverseCharge: 'No'
    },
    items: [
      {
        description: '',
        unitPrice: '',
        quantity: 0,
        discount: 0,
        netAmount: 0,
        taxRate: 18,
        shipping: 0
      }
    ]
  });

  const handleInputChange = (e, section, key, index = null) => {
    const value = e.target.value;
    if (section === 'items' && index !== null) {
      const newItems = [...formData.items];
      newItems[index][key] = value;
      setFormData({ ...formData, items: newItems });
    } else {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [key]: value
        }
      });
    }
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          description: '',
          unitPrice: '',
          quantity: 0,
          discount: 0,
          netAmount: 0,
          taxRate: 18,
          shipping: 0
        }
      ]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedItems = formData.items.map(item => ({
      ...item,
      unitPrice: parseFloat(item.unitPrice),
      quantity: parseFloat(item.quantity),
      discount: parseFloat(item.discount),
      shipping: parseFloat(item.shipping),
      netAmount: (parseFloat(item.unitPrice) * parseFloat(item.quantity)) - parseFloat(item.discount)
    }));
    onSubmit({ ...formData, items: updatedItems });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <h2>Seller Details</h2>
          <input type="text" placeholder="Name" onChange={(e) => handleInputChange(e, 'seller', 'name')} />
          <input type="text" placeholder="Address" onChange={(e) => handleInputChange(e, 'seller', 'address')} />
          <input type="text" placeholder="City" onChange={(e) => handleInputChange(e, 'seller', 'city')} />
          <input type="text" placeholder="State" onChange={(e) => handleInputChange(e, 'seller', 'state')} />
          <input type="text" placeholder="Pincode" onChange={(e) => handleInputChange(e, 'seller', 'pincode')} />
          <input type="text" placeholder="PAN" onChange={(e) => handleInputChange(e, 'seller', 'pan')} />
          <input type="text" placeholder="GST" onChange={(e) => handleInputChange(e, 'seller', 'gst')} />
        </div>
        <div className='row'>
          <h2>Billing Details</h2>
          <input type="text" placeholder="Name" onChange={(e) => handleInputChange(e, 'billing', 'name')} />
          <input type="text" placeholder="Address" onChange={(e) => handleInputChange(e, 'billing', 'address')} />
          <input type="text" placeholder="City" onChange={(e) => handleInputChange(e, 'billing', 'city')} />
          <input type="text" placeholder="State" onChange={(e) => handleInputChange(e, 'billing', 'state')} />
          <input type="text" placeholder="Pincode" onChange={(e) => handleInputChange(e, 'billing', 'pincode')} />
          <input type="text" placeholder="State Code" onChange={(e) => handleInputChange(e, 'billing', 'stateCode')} />
        </div>
        <div className='row'>
          <h2>Shipping Details</h2>
          <input type="text" placeholder="Name" onChange={(e) => handleInputChange(e, 'shipping', 'name')} />
          <input type="text" placeholder="Address" onChange={(e) => handleInputChange(e, 'shipping', 'address')} />
          <input type="text" placeholder="City" onChange={(e) => handleInputChange(e, 'shipping', 'city')} />
          <input type="text" placeholder="State" onChange={(e) => handleInputChange(e, 'shipping', 'state')} />
          <input type="text" placeholder="Pincode" onChange={(e) => handleInputChange(e, 'shipping', 'pincode')} />
          <input type="text" placeholder="State Code" onChange={(e) => handleInputChange(e, 'shipping', 'stateCode')} />
        </div>
        <div className='row'>
          <h2>Order Details</h2>
          <input type="text" placeholder="Order Number" onChange={(e) => handleInputChange(e, 'order', 'number')} />
          <input type="text" placeholder="Order Date" onChange={(e) => handleInputChange(e, 'order', 'date')} />
        </div>
        <div className='row'>
          <h2>Invoice Details</h2>
          <input type="text" placeholder="Invoice Number" onChange={(e) => handleInputChange(e, 'invoice', 'number')} />
          <input type="text" placeholder="Invoice Details" onChange={(e) => handleInputChange(e, 'invoice', 'details')} />
          <input type="text" placeholder="Invoice Date" onChange={(e) => handleInputChange(e, 'invoice', 'date')} />
          <input type="text" placeholder="Reverse Charge" onChange={(e) => handleInputChange(e, 'invoice', 'reverseCharge')} />
        </div>
        <div className='row'>
          <h2>Items</h2>
          <div className='item'>
            {formData.items.map((item, index) => (
              <div key={index}>
                <input type="text" placeholder="Description" onChange={(e) => handleInputChange(e, 'items', 'description', index)} />
                <input type="number" placeholder="Unit Price" onChange={(e) => handleInputChange(e, 'items', 'unitPrice', index)} />
                <input type="number" placeholder="Quantity" onChange={(e) => handleInputChange(e, 'items', 'quantity', index)} />
                <input type="number" placeholder="Discount" onChange={(e) => handleInputChange(e, 'items', 'discount', index)} />
                <input type="number" placeholder="Shipping" onChange={(e) => handleInputChange(e, 'items', 'shipping', index)} />
              </div>
            ))}
          </div>
          <button type="button" onClick={handleAddItem}>Add Item</button>
        </div>
      </form>
        <button type="submit" onClick={handleSubmit}>Generate Invoice</button>
    </>
  );
};

export default InvoiceForm;
