"use client";

import { X } from "lucide-react";

export default function Modal({ open, title, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-[#dbe8bf] bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-[#ebf2d4] p-4">
          <h3 className="font-display text-2xl text-[#36532f]">{title}</h3>
          <button onClick={onClose} className="rounded-lg border border-[#dbe8bf] p-1 text-[#6f875c]">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
