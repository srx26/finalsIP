import React from "react";

const PopupNotification = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="relative bg-white rounded-lg p-8 flex flex-col items-center">
        <p className="text-xl font-semibold mb-4">{message}</p>
        <button onClick={onClose} className="bg-slate-600 px-4 py-2 text-white rounded-md">Close</button>
      </div>
    </div>
  );
};

export default PopupNotification;
