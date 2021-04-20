import React from 'react';
import ReactDOM from 'react-dom';

function Modal({ isOpen, onDismiss, children }) {
  if (!isOpen) return null;

  const modal = (
    <div className="fixed z-50 inset-0 bg-opacity-60 flex bg-gray-50 dark:bg-mediumGray dark:bg-opacity-60">
      <div className="p-8 bg-white dark:bg-black-900 m-auto relative shadow-md rounded-xl">
        <button
          type="button"
          onClick={onDismiss}
          className="text-xl text-gray-600 dark:text-white absolute right-4 top-2 outline-none focus:outline-none"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById('modal'));
}

export default Modal;
