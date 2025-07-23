import React from "react";

export function Spinner() {
  return (
    <div className="spinner">
      <style jsx>{`
        .spinner {
          border: 4px solid rgba(0, 0, 255, 0.1); /* Light blue border */
          border-left-color: #0000ff; /* Blue spinner */
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
