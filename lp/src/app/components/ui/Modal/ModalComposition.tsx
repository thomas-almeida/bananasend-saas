import React from "react";

interface ModalCompositionProps {
  children: React.ReactNode;
  visible?: boolean;
  onClose?: () => void;
}

export default function ModalComposition({ children, visible }: ModalCompositionProps) {
  return (
    <>
      {visible && (
        <div className="fixed z-50 inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            {children}
          </div>
        </div>
      )}
    </>
  )
}