import React from "react";
import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useData } from "../context/api";
import axios from "axios";
const Scan = () => {
  const [scanResult, setScanResult] = useState(null);
  const [hide, sethide] = useState(true);
  const { handleScanAndPost } = useData();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const scan = () => {
    sethide(false);
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        // formatsToSupport: formatsToSupport,
      },
      /* verbose= */ false
    );
    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setScanResult(result);

      handleScanAndPost(result, formattedDate);
    }

    function error(err) {}
  };
  return (
    <div className="text-center my-8">
      <h1 className="text-3xl font-bold mb-4">QR Code Scanner</h1>
      <div className="m-auto w-80 border border-gray-300 rounded-md p-4">
        {/* You can add styles for the QR code container if needed */}
        {/* <div id="reader" className="w-full h-full"></div> */}
        <div id="reader" className="w-full h-48 bg-gray-100"></div>
      </div>
      {hide ? (
        <button
          onClick={scan}
          className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Scan
        </button>
      ) : (
        <button
          onClick={scan}
          className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Scan
        </button>
      )}
    </div>
  );
};

export default Scan;
