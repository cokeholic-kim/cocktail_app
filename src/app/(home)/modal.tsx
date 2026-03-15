"use client";

import Image from "next/image";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    cocktailData: {
        imagePath: string;
        name: string;
        description: string;
    };
}

function Modal({ isOpen, onClose, cocktailData }: ModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <button
                type="button"
                className="fixed inset-0 bg-black bg-opacity-60"
                aria-label="모달 배경 닫기"
                onClick={onClose}
            />
            <div className="flex items-center justify-center min-h-screen">
                <section
                    className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-label={cocktailData.name}
                >
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <h2 className="text-lg leading-6 font-medium text-gray-900">{cocktailData.name}</h2>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <Image
                                    width={1200}
                                    height={675}
                                    src={cocktailData.imagePath}
                                    alt={cocktailData.name}
                                    className="w-full h-auto rounded-lg"
                                    priority
                                />
                            </div>
                            <div>
                                <p className="text-gray-500">{cocktailData.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={onClose}
                            aria-label="모달 닫기"
                        >
                            Close
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Modal;
