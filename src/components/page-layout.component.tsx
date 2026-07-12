import React from 'react';
import Navbar from './navbar.component';
import { NavigationItem } from '../interfaces/common.interface';

interface PageLayoutProps {
  navigation: {
    BRAND: string;
    LINKS: NavigationItem[];
  };
  activePath: string;
  onNavigate?: (path: string) => void;
  loading?: boolean;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  navigation,
  activePath,
  onNavigate,
  loading = false,
  children,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        brand={navigation.BRAND}
        links={navigation.LINKS}
        activePath={activePath}
        onNavigate={onNavigate}
      />
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-500">Loading...</div>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default PageLayout;
