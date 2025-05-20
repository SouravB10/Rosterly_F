// components/FeedbackModal.jsx
import React from "react";
import { Dialog } from "@headlessui/react";

const FeedbackModal = ({ isOpen, onClose, message }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/50 transition-opacity duration-300" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-xl bg-white shadow-xl transition-all duration-300 ease-out scale-95 opacity-0 animate-fadeIn">
          <div className="flex flex-col items-center p-6 text-center">
            <Dialog.Title className="text-lg font-semibold text-gray-800 mt-2">
              {message}
            </Dialog.Title>
            <div className="mt-6">
              <button
                onClick={onClose}
                className="px-5 py-2 text-sm font-medium text-white bg-blue-600 borderRadius5 hover:bg-blue-700 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default FeedbackModal;
