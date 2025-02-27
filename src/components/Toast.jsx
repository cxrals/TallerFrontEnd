import React, { useEffect, useRef } from 'react';

const Toast = ({ message, onClose }) => {
  const toastRef = useRef(null);

  useEffect(() => {
    if (message && toastRef.current) {
      const toastElement = toastRef.current;

      // Add the .show class to make the toast visible
      toastElement.classList.add('show');

      // Automatically hide the toast after 3 seconds
      const timer = setTimeout(() => {
        toastElement.classList.remove('show'); // Remove the .show class
        onClose(); // Call the onClose callback
      }, 3000);

      // Cleanup
      return () => {
        clearTimeout(timer);
        toastElement.classList.remove('show'); // Ensure the .show class is removed
      };
    }
  }, [message, onClose]);

  if (!message) return null; // Don't render the toast if there's no message

  return (
    <div
      ref={toastRef}
      className="toast"
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        minWidth: '250px',
        zIndex: 1050,
      }}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header">
        <strong className="mr-auto">Notification</strong>
        <button
          type="button"
          className="ml-2 mb-1 close"
          data-dismiss="toast"
          aria-label="Close"
          onClick={onClose}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="toast-body">{message}</div>
    </div>
  );
};

export default Toast;