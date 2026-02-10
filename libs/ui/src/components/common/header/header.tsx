import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Icon } from '../Icon';
import type { HeaderProps } from '../../../types/sidebar';

export const Header: React.FC<HeaderProps> = ({
  toggleSidebar,
  isSidebarCollapsed,
  logo,
  homePath = '/',
  user,
  onLogout,
  isAuthenticated = false,
  isLoading = false,
  actions,
}) => {
  const location = useLocation();

  // Dynamic breadcrumb segments
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.length > 0 ? pathSegments : ['Dashboard'];

  const showAuthUI = isAuthenticated || !!user;

  return (
    <header className="sticky top-0 z-40 h-16 flex items-center border-b border-gray-200/80 bg-white/90 backdrop-blur-sm px-4 md:px-6">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          {/* Mobile menu toggle — only visible on small screens */}
          {showAuthUI && (
            <button
              className="flex lg:hidden items-center justify-center w-9 h-9 text-gray-500 transition-colors cursor-pointer rounded-lg hover:bg-gray-100 hover:text-gray-700"
              onClick={toggleSidebar}
              type="button"
            >
              <Icon name="Menu" size={20} />
            </button>
          )}

          {/* Logo — only shown on mobile (desktop has it in sidebar) */}
          <div className="lg:hidden">
            <Link to={homePath}>
              <img
                src={logo?.src || '/login-logo.png'}
                alt={logo?.alt || 'Logo'}
                className="object-contain h-8"
              />
            </Link>
          </div>

          {showAuthUI && (
            <div className="items-center hidden gap-1.5 text-sm text-gray-500 lg:flex">
              {breadcrumbs.map((segment, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  {index > 0 && (
                    <Icon
                      name="ChevronRight"
                      size={14}
                      className="text-gray-300"
                    />
                  )}
                  <span
                    className={`capitalize ${
                      index === breadcrumbs.length - 1
                        ? 'text-gray-900 font-semibold'
                        : ''
                    }`}
                  >
                    {segment.replace(/-/g, ' ')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Custom action buttons */}
          {showAuthUI && actions && (
            <div className="items-center hidden gap-2 pr-4 border-r border-gray-200 md:flex">
              {actions}
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center w-20 h-9 rounded-lg bg-gray-50">
              <div className="w-4 h-4 border-2 rounded-full animate-spin border-orange border-t-transparent" />
            </div>
          ) : showAuthUI ? (
            onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600 hover:border-red-200 cursor-pointer"
              >
                <Icon name="LogOut" size={16} />
                <span className="hidden sm:inline">Log out</span>
              </button>
            )
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-lg bg-orange px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange/90"
            >
              <Icon name="LogIn" size={16} />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
