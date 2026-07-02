import React, { useState } from "react";
import { siteContent } from "../data";
import { Menu, X, Lock, Unlock, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavigationProps {
  onBookDemoClick: () => void;
  isAdminMode: boolean;
  onToggleAdminMode: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Navigation({
  onBookDemoClick,
  isAdminMode,
  onToggleAdminMode,
  isDarkMode,
  onToggleDarkMode,
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-bone-mist/90 backdrop-blur-md border-b border-ash">
      {/* Announcement Bar */}
      <div className="bg-[#9fa6ff] px-4 py-2.5 text-center">
        <p className="text-[13px] font-sans tracking-wide text-[#17150e]">
          <span className="font-bold">NEW IN 2026</span> — Intellitech v3 Enterprise Agent Blueprints are now live.{" "}
          <button 
            onClick={onBookDemoClick}
            className="underline cursor-pointer ml-1 inline font-semibold focus:outline-none text-[#17150e]"
          >
            Explore Blueprints &rarr;
          </button>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - using logo.png alongside text */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex-shrink-0 flex items-center gap-3 cursor-pointer hover:opacity-95 select-none"
          >
            <img 
              src="/logo.png" 
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
            <span className="text-[17px] font-sans font-bold tracking-[0.15em] uppercase text-bark">
              {siteContent.navigation.logo}
            </span>
          </div>

          {/* Desktop Navigation links */}
          <div className="hidden md:flex items-center space-x-8">
            {siteContent.navigation.links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleScroll(link.id)}
                className="text-[13px] font-sans font-medium uppercase tracking-[0.071em] text-charcoal hover:text-bark hover:underline underline-offset-4 transition duration-150 cursor-pointer"
              >
                {link.label}
              </button>
            ))}



            {/* Outlined Nav Button / 40px radius on the CTA button */}
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={onBookDemoClick}
              className="bg-transparent hover:bg-bark text-bark hover:text-paper-white text-[13px] font-sans font-medium tracking-[0.056em] px-5 py-2.5 rounded-[40px] border border-bark transition duration-150 cursor-pointer focus:outline-none"
            >
              {siteContent.navigation.cta.toUpperCase()}
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-bark hover:text-slate p-2 focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-bone-mist border-b border-ash overflow-hidden"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {siteContent.navigation.links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleScroll(link.id)}
                  className="block w-full text-left px-4 py-3 text-sm font-sans font-medium uppercase tracking-[0.071em] text-charcoal hover:bg-ash/30 rounded-lg cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 px-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onBookDemoClick();
                  }}
                  className="w-full bg-bark text-paper-white text-center font-medium py-3 rounded-full text-sm tracking-wide cursor-pointer"
                >
                  {siteContent.navigation.cta}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

