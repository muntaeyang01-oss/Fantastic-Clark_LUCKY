
import React from 'react';
import { SiteConfig } from '../types.ts';

interface LayoutProps {
  children: React.ReactNode;
  config: SiteConfig;
  onAdminToggle: () => void;
  isAdmin: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, config, onAdminToggle, isAdmin }) => {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300" style={{ fontFamily: config.fontFamily }}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span 
                className="text-2xl font-bold tracking-tighter"
                style={{ color: config.primaryColor }}
            >
              {config.siteName}
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest text-gray-400">
            <a href="#home" className="hover:text-white transition-colors">HOME</a>
            <a href="#about" className="hover:text-white transition-colors">ABOUT</a>
            <a href="#posts" className="hover:text-white transition-colors">NEWS</a>
            <a href="#contact" className="hover:text-white transition-colors">CONTACT</a>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={onAdminToggle}
              className="px-4 py-2 text-xs font-bold rounded bg-white/10 hover:bg-white/20 transition-all border border-white/20"
            >
              {isAdmin ? "CLOSE CMS" : "OPEN CMS"}
            </button>
            <button 
              className="px-6 py-2 text-xs font-bold rounded-full transition-all text-white shadow-lg shadow-purple-500/20"
              style={{ backgroundColor: config.primaryColor }}
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: config.primaryColor }}>{config.siteName}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              필리핀 클락 최고의 에이전시. 최상의 VIP 의전 서비스와 격조 높은 휴식을 약속드립니다.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="text-gray-500 text-sm space-y-2">
              <li>카지노 투어 안내</li>
              <li>프라이빗 풀빌라</li>
              <li>골프 패키지</li>
              <li>VIP 의전 서비스</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <div className="flex space-x-4">
               {Object.entries(config.socialLinks).map(([key, value]) => (
                 <a key={key} href={value} className="text-gray-500 hover:text-white capitalize transition-colors">
                   {key}
                 </a>
               ))}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-gray-600 text-xs">
          © 2024 {config.siteName}. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
