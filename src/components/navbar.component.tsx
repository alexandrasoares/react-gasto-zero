import React from 'react';
import { Bell, User } from 'lucide-react';
import { NavigationItem } from '../interfaces/common.interface';

interface NavbarProps {
  brand: string;
  links: NavigationItem[];
  activePath?: string;
  onNavigate?: (path: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ brand, links, activePath, onNavigate }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-gray-900">{brand}</span>
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {links.map((link) => (
                <button
                  key={link.path}
                  onClick={() => onNavigate?.(link.path)}
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    activePath === link.path
                      ? 'text-green-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                <Bell size={20} />
              </button>
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <User size={16} className="text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
