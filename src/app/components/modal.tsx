'use client';

import { motion } from 'framer-motion';

interface ModalProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onConfirm, onCancel, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <motion.div
        className="bg-white p-6 rounded-md shadow-lg lg:w-[45%] w-[95%] mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-indigo-900 mb-4">{title}</h2>
        <div className="mb-4">{children}</div>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-blue-600 text-white p-2 rounded-md"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-gray-500 text-white p-2 rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;