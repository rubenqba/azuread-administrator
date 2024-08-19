"use client";
import React from "react";
import { toast } from "react-toastify";

interface JWTDisplayProps {
  token?: string;
}

const JWTDisplay: React.FC<JWTDisplayProps> = ({ token }) => {
  if (!token) return null;

  const [header, payload, signature] = token.split(".");

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(token);
        toast.success("Token copiado al portapapeles");
      } else {
        toast.warn("No se puede usar el portapapeles");
      }
    } catch (err) {
      toast.error('Error al copiar el token al portapapeles')
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md border border-gray-300 mt-2 whitespace-normal break-words relative">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded"
      >
        Copiar
      </button>
      <div className="jwt-section bg-green-100 text-green-800 p-2 mb-1 rounded">
        {header}
      </div>
      <div className="jwt-section bg-yellow-100 text-yellow-800 p-2 mb-1 rounded">
        {payload}
      </div>
      <div className="jwt-section bg-red-100 text-red-800 p-2 rounded">
        {signature}
      </div>
    </div>
  );
};

export default JWTDisplay;
