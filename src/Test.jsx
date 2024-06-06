import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import InvoiceForm from './Invoice';
import './App.css';
import logo from './assets/react.svg'; // Your logo image
import signature from './assets/react.svg'; // Your signature image

const App = () => {
  const [invoiceData, setInvoiceData] = useState(null);

  const handleFormSubmit = (data) => {
    setInvoiceData(data);
  };

  const generatePDF = () => {
    const input = document.getElementById('invoice');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('invoice.pdf');
    });
  };

  return (
    <div className="App">
      <InvoiceForm onSubmit={handleFormSubmit} />
      {invoiceData && (
        <div className='Invoice'>
          <button onClick={generatePDF}>Generate PDF</button>
          <div id="invoice">
            <header>
              <img src={logo} alt="Company Logo" className="logo" />
              <div className="header-text">
                <h1>Tax Invoice</h1>
                <h2>(Original for Recipient)</h2>
              </div>
            </header>
            <div className="details">
              <div className="seller-details w-50">
                <h3>Sold By :</h3>
                <p>{invoiceData.seller.name}</p>
                <p>{invoiceData.seller.address}</p>
                <p>{invoiceData.seller.city}, {invoiceData.seller.state}, {invoiceData.seller.pincode}</p>
                <p>PAN No: {invoiceData.seller.pan}</p>
                <p>GST Registration No: {invoiceData.seller.gst}</p>
              </div>
              <div className="billing-details w-50">
                <h3>Billing Address :</h3>
                <p>{invoiceData.billing.name}</p>
                <p>{invoiceData.billing.address}</p>
                <p>{invoiceData.billing.city}, {invoiceData.billing.state}, {invoiceData.billing.pincode}</p>
                <p>State/UT Code: {invoiceData.billing.stateCode}</p>
              </div>
              <div className="shipping-details w-50">
                <h3>Shipping Address :</h3>
                <p>{invoiceData.shipping.name}</p>
                <p>{invoiceData.shipping.address}</p>
                <p>{invoiceData.shipping.city}, {invoiceData.shipping.state}, {invoiceData.shipping.pincode}</p>
                <p>State/UT Code: {invoiceData.shipping.stateCode}</p>
              </div>
            </div>
            <div className="order-details w-50">
              <p>Order Number: {invoiceData.order.number}</p>
              <p>Order Date: {invoiceData.order.date}</p>
            </div>
            <div className="invoice-details w-50">
              <p>Invoice Number: {invoiceData.invoice.number}</p>
              <p>Invoice Details: {invoiceData.invoice.details}</p>
              <p>Invoice Date: {invoiceData.invoice.date}</p>
              <p>Reverse Charge: {invoiceData.invoice.reverseCharge}</p>
            </div>
            <table className="items w-50">
              <thead>
                <tr>
                  <th>Sl. No</th>
                  <th>Description</th>
                  <th>Unit Price</th>
                  <th>Qty</th>
                  <th>Discount</th>
                  <th>Net Amount</th>
                  <th>Tax Rate</th>
                  <th>CGST</th>
                  <th>SGST</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, index) => {
                  const netAmount = item.unitPrice * item.quantity - item.discount;
                  const taxRate = item.taxRate / 2; // Split tax rate for CGST and SGST
                  const cgst = (netAmount * taxRate) / 100;
                  const sgst = (netAmount * taxRate) / 100;
                  const totalAmount = netAmount + cgst + sgst + item.shipping;
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.description}</td>
                      <td>{item.unitPrice.toFixed(2)}</td>
                      <td>{item.quantity}</td>
                      <td>{item.discount.toFixed(2)}</td>
                      <td>{netAmount.toFixed(2)}</td>
                      <td>{item.taxRate}%</td>
                      <td>{cgst.toFixed(2)}</td>
                      <td>{sgst.toFixed(2)}</td>
                      <td>{totalAmount.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="total-amount">
              <p>Total Amount: One Thousand One Hundred And Ninety-Five only</p>
            </div>
            <div className="signature">
              <p>For {invoiceData.seller.name}:</p>
              <img src={signature} alt="Authorized Signatory" className="signature-img" />
              <p>Authorized Signatory</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
