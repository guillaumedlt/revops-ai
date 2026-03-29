"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import ConversationSidebar from "./chat/ConversationSidebar";

export default function MobileMenu() {
  var [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button — only visible on mobile, positioned in top-left */}
      <button
        onClick={function() { setOpen(true); }}
        className="md:hidden fixed top-3 left-3 z-40 h-8 w-8 rounded-md bg-white border border-[#EAEAEA] flex items-center justify-center text-[#999] hover:text-[#111] transition-colors"
      >
        <Menu size={16} />
      </button>

      {/* Overlay + sidebar */}
      {open && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/20 z-40"
            onClick={function() { setOpen(false); }}
          />
          <div className="md:hidden fixed inset-y-0 left-0 z-50 w-[260px]">
            <ConversationSidebar />
          </div>
          <button
            onClick={function() { setOpen(false); }}
            className="md:hidden fixed top-3 right-3 z-50 h-8 w-8 rounded-md bg-white border border-[#EAEAEA] flex items-center justify-center text-[#999]"
          >
            <X size={16} />
          </button>
        </>
      )}
    </>
  );
}
