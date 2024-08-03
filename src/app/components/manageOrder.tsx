'use client';
import React, { useEffect, useRef, useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { format, parseISO } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import ReceiptSkeleton from '../skeleton/receiptSkeleton'; 
import GenerateLetter from './letter';

interface Order {
  id: string;
  buyerName?: string;
  buyerEmail?: string;
  buyerPhone?: string;
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  status: string; // Added status field
}

interface ReceiptProps {
  orders: Order[];
  onCompleteOrder?: (id: string) => void; // Function to mark order as complete
  isLoading?: boolean
}

const Receipt: React.FC<ReceiptProps> = ({ orders, onCompleteOrder , isLoading}) => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderToComplete, setOrderToComplete] = useState<Order | null>(null);

    // State for the search query and filtered orders
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOrders, setFilteredOrders] = useState(orders);

     // Effect to filter orders based on search query
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredOrders(orders); // Reset to original orders if query is empty
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = orders.filter((order: any) =>
        order?.buyerName.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredOrders(filtered);
    }
  }, [searchQuery, orders]);


  const openModal = (order: Order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalOpen(false);
  };

  const openConfirmationModal = (order: Order) => {
    setOrderToComplete(order);
    setConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setOrderToComplete(null);
    setConfirmationModalOpen(false);
  };

  const handleConfirmCompletion = () => {
    if (orderToComplete && onCompleteOrder) {
      onCompleteOrder(orderToComplete.id);
    }
    closeConfirmationModal();
  };

  const resumeRef = useRef<HTMLDivElement>(null);

  const generatePDF = () => {
    if (resumeRef.current) {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });

      doc.html(resumeRef.current, {
        callback: (doc) => {
          doc.save('resume.pdf');
        },
        margin: [10, 10, 10, 10],
        x: 10,
        y: 10,
      });
    }
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    let startY = 10;

    orders.forEach((order, index) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor('#121481');
      doc.text(`Receipt ${index + 1}`, doc.internal.pageSize.width / 2, startY, { align: 'center' });
      startY += 10;

      doc.setFontSize(12);
      doc.setTextColor('#333333');
      doc.text(`Name: ${order.buyerName || 'N/A'}`, 10, startY);
      doc.text(`Email: ${order.buyerEmail || 'N/A'}`, 10, startY + 10);
      doc.text(`Phone: ${order.buyerPhone || 'N/A'}`, 10, startY + 20);
      startY += 30;

      const tableHeight = (order.items.length + 2) * 10;

      if (startY + tableHeight > doc.internal.pageSize.height - 20) {
        doc.addPage();
        startY = 10;
      }

      (doc as any).autoTable({
        startY,
        head: [['#', 'Name', 'Price', 'Quantity']],
        body: order.items.map((item, idx) => [
          idx + 1,
          item.name,
          `$${item.price.toFixed(2)}`,
          item.quantity,
        ]),
        theme: 'striped',
        styles: {
          cellPadding: 5,
          fontSize: 10,
          valign: 'middle',
          halign: 'center',
          fillColor: '#FB8B24',
          textColor: '#5F0F40',
          minCellHeight: 20,
        },
      });

      startY = (doc as any).lastAutoTable.finalY + 10;

      if (startY + 30 > doc.internal.pageSize.height - 20) {
        doc.addPage();
        startY = 10;
      }

      doc.setFont('helvetica', 'bold');
      doc.setTextColor('#5F0F40');
      doc.text(`Total Amount: $${order.totalAmount.toFixed(2)}`, 10, startY);
      startY += 20;

      if (startY + 10 > doc.internal.pageSize.height - 10) {
        doc.addPage();
        startY = 10;
      }

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Thank you for your purchase!', 10, doc.internal.pageSize.height - 10);
      startY = doc.internal.pageSize.height - 10;

      if (index < orders.length - 1) {
        doc.addPage();
        startY = 10;
      }
    });

    doc.save('receipts.pdf');
  };

  console.log(filteredOrders)

  return (
    <div className="bg-white overflow-scroll lg:w-full w-full shadow-lg rounded-lg p-6">
      <h3 className="text-3xl font-bold text-primary-dark mb-6">Orders</h3>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by customer"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-pink"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
        />
      </div>
      {isLoading && <ReceiptSkeleton />}
      {!isLoading && <table className="w-full  bg-white border border-primary-dark rounded-lg shadow-sm mb-6">
        <thead>
          <tr className="bg-primary-light text-primary-dark text-left">
            <th className="p-3 border-b border-gray-200">Order ID</th>
            <th className="p-3 border-b border-gray-200">Customer</th>
            <th className="p-3 border-b border-gray-200">Date</th>
            <th className="p-3 border-b border-gray-200">Time</th>
            <th className="p-3 border-b border-gray-200">Total</th>
            <th className="p-3 border-b border-gray-200">Status</th>
            <th className="p-3 border-b border-gray-200 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order: any, index) => {
            const formattedDate = format(new Date(order?.createdAt), 'MMM d');
            const dateObject = parseISO(order?.createdAt);
            const timeString = format(dateObject, 'hh:mm:ss a');

            return (
              <tr key={index} className="hover:bg-primary-dark hover:text-primary-light hover:font-extrabold hover:cursor-pointer transition duration-200">
                <td className="p-3 border-b border-gray-200">{order.id}</td>
                <td className="p-3 border-b border-gray-200">{order.buyerName}</td>
                <td className="p-3 border-b border-gray-200">{formattedDate}</td>
                <td className="p-3 border-b border-gray-200">{timeString}</td>
                <td className="p-3 border-b border-gray-200">{Math.round(order.totalAmount)}</td>
                <td className="p-3 border-b border-gray-200">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-white ${
                      order.status === 'Completed' ? 'bg-green-500' : order.status === 'Processing' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                  >
                    {order.status === null ? 'processing' : order.status}
                  </span>
                </td>
                <td className="p-3 border-b flex flex-col gap-2 text-right">
                  <button
                    onClick={() => openModal(order)}
                    className="ml-2 bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded-lg hover:bg-gray-400 transition duration-300"
                  >
                    View Details
                  </button>
                  {order.status !== 'Completed' && (
                    <button
                      onClick={() => openConfirmationModal(order)}
                      className="ml-2 bg-green-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                      Complete Order
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>}

      <div ref={receiptRef} className='hidden'>
        {orders.map((order, index) => (
          <div key={index} className="p-8 bg-white rounded-lg shadow-md mb-4">
            <h2 className="text-2xl font-bold mb-4">Receipt</h2>
            <p><strong>Name:</strong> {order.buyerName || 'N/A'}</p>
            <p><strong>Email:</strong> {order.buyerEmail || 'N/A'}</p>
            <p><strong>Phone:</strong> {order.buyerPhone || 'N/A'}</p>
            <h3 className="mt-4 mb-2 text-lg font-semibold">Cupcakes</h3>
            <ul>
              {order?.items?.map((item: any, idx: number) => (
                <li key={idx} className="mb-2">
                  <p><strong>Name:</strong> {item.name}</p>
                  <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4"><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && selectedOrder && <OrderModal order={selectedOrder} onClose={closeModal} />}
        {isConfirmationModalOpen && (
          <ConfirmationModal
            message="Are you sure you want to mark this order as completed?"
            onConfirm={handleConfirmCompletion}
            onCancel={closeConfirmationModal}
          />
        )}
      </AnimatePresence>

      <div className="flex lg:flex justify-end space-x-4 mt-6">
        <button onClick={handleGeneratePDF} className="bg-primary-pink text-primary-dark font-bold py-2 px-4 bg-primary-light rounded-lg hover:bg-primary-dark hover:text-primary-light transition duration-300">
          Download All Receipts as PDF
        </button>
      </div>

    </div>
  );
};
const OrderModal = ({ order, onClose }: { order: Order; onClose: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 relative"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-300"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-primary-dark">Order Details</h2>
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Name:</strong> {order.buyerName || 'N/A'}</p>
        <p><strong>Email:</strong> {order.buyerEmail || 'N/A'}</p>
        <p><strong>Phone:</strong> {order.buyerPhone || 'N/A'}</p>
        <h3 className="mt-4 mb-2 text-lg font-semibold text-primary-dark">Loaded Potatoes</h3>
        <ul className="list-disc list-inside">
          {order.items.map((item, idx) => (
            <li key={idx} className="mb-2">
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4"><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
        <button onClick={onClose} className="mt-4 bg-primary-dark text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-pink transition duration-300">
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

const ConfirmationModal = ({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 relative"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-300"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-primary-dark">Confirm Completion</h2>
        <p>{message}</p>
        <div className="flex justify-end space-x-4 mt-6">
          <button onClick={onCancel} className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300">
            Cancel
          </button>
          <button onClick={onConfirm} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
            Confirm
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Receipt;
