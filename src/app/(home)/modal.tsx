"use client"

import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  cocktailData: {
    imagePath: string;
    name: string;
    description: string;
    // 필요한 추가 데이터 항목 추가
  };
}

function Modal({ isOpen, onClose, cocktailData }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h2 className="text-lg leading-6 font-medium text-gray-900">{cocktailData.name}</h2>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <img
                  src={cocktailData.imagePath}
                  alt={cocktailData.name}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div>
                <p className="text-gray-500">{cocktailData.description}</p>
                {/* 추가 데이터 항목 표시 */}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;