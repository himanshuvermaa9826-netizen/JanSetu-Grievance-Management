import React, { useState } from 'react';
import { 
  Globe, 
  ChevronDown, 
  User, 
  Menu, 
  X,
  Play,
  RotateCcw
} from 'lucide-react';
import { NavigationTab } from '../types';

interface HeaderProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  onStartDemo?: () => void;
  isDemoActive?: boolean;
  onResetDemo?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  onStartDemo,
  isDemoActive = false,
  onResetDemo,
}) => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'English' | 'हिंदी'>('English');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { id: NavigationTab; label: string }[] = [
    { id: 'landing', label: 'Home' },
    { id: 'citizen-dashboard', label: 'Dashboard' },
    { id: 'file-grievance', label: 'File a Grievance' },
    { id: 'track-grievance', label: 'Track Grievance' },
    { id: 'why-agentic', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/90 shadow-2xs" id="app-header">
      {/* 
        NO blue announcement bar, disclaimer bar, academic prototype banner, 
        or extra strip above the navigation. The navigation is the FIRST element.
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Side: Indore Municipal Corporation + JanSetu Branding */}
          <div className="flex items-center">
            {/* IMC Emblem + Text */}
            <div 
              onClick={() => onTabChange('landing')}
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group"
            >
              <img
                src="/src/assets/images/indore_civic_emblem_1789903869116.jpg"
                alt="Indore Municipal Corporation Emblem"
                referrerPolicy="no-referrer"
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded-md"
              />
              <div className="hidden sm:block">
                <span className="block text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                  Indore Municipal Corporation
                </span>
                <span className="block text-2xs sm:text-xs font-semibold text-slate-600 leading-tight">
                  इंदौर नगर निगम
                </span>
              </div>
            </div>

            {/* Vertical Divider Line */}
            <div className="h-8 sm:h-9 w-px bg-slate-200 mx-3 sm:mx-4" />

            {/* JanSetu Name & Subtitle */}
            <div 
              onClick={() => onTabChange('landing')}
              className="cursor-pointer select-none"
            >
              <span className="block text-xl sm:text-2xl font-black text-[#00684a] tracking-tight leading-none">
                JanSetu
              </span>
              <span className="block text-2xs text-slate-500 font-medium tracking-normal mt-0.5">
                Aapki Awaaz, Hamara Prayas
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Matching reference) */}
          <nav className="hidden lg:flex items-center space-x-1 sm:space-x-2" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = currentTab === item.id || 
                (item.id === 'citizen-dashboard' && currentTab === 'dashboard') ||
                (item.id === 'why-agentic' && currentTab === 'architecture');
              
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => onTabChange(item.id)}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-[#00684a] font-bold'
                      : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[3px] bg-[#00684a] rounded-t-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Side: Language Selector + Citizen Login Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Quick Demo Action for judges/evaluation */}
            {onStartDemo && (
              <button
                id="run-demo-btn"
                onClick={onStartDemo}
                title="Run Interactive 2-3 Min AI Decision Demo"
                className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isDemoActive
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                <Play className={`w-3 h-3 ${isDemoActive ? 'animate-spin text-amber-700' : 'fill-current text-emerald-700'}`} />
                <span>{isDemoActive ? 'Demo Active' : 'AI Demo'}</span>
              </button>
            )}

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                id="lang-selector-btn"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-medium text-slate-700 transition-colors cursor-pointer"
                aria-haspopup="true"
                aria-expanded={isLangDropdownOpen}
              >
                <Globe className="w-4 h-4 text-slate-600 shrink-0" />
                <span>{currentLang}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-32 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50 animate-in fade-in slide-in-from-top-1">
                  <button
                    onClick={() => { setCurrentLang('English'); setIsLangDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-slate-50 flex items-center justify-between ${
                      currentLang === 'English' ? 'text-[#00684a] font-bold bg-emerald-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>English</span>
                    {currentLang === 'English' && <span className="w-1.5 h-1.5 rounded-full bg-[#00684a]"></span>}
                  </button>
                  <button
                    onClick={() => { setCurrentLang('हिंदी'); setIsLangDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-slate-50 flex items-center justify-between ${
                      currentLang === 'हिंदी' ? 'text-[#00684a] font-bold bg-emerald-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>हिंदी</span>
                    {currentLang === 'हिंदी' && <span className="w-1.5 h-1.5 rounded-full bg-[#00684a]"></span>}
                  </button>
                </div>
              )}
            </div>

            {/* Citizen Login Button */}
            <button
              id="citizen-login-header-btn"
              onClick={() => onTabChange('citizen-dashboard')}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg bg-[#00684a] hover:bg-[#00543c] text-white text-xs sm:text-sm font-medium shadow-xs transition-colors cursor-pointer active:scale-98"
            >
              <User className="w-4 h-4" />
              <span className="whitespace-nowrap">Citizen Login</span>
            </button>

            {/* Mobile Navigation Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1.5 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                currentTab === item.id
                  ? 'bg-emerald-50 text-[#00684a] font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          {onStartDemo && (
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  onStartDemo();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-bold text-amber-800 bg-amber-50 flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                Launch 2-3 Min AI Decision Demo
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
