import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SideBar, Header } from '@lib/ui';
import type { SidebarUserInfo } from '@lib/ui';
import { outletSidebarConfig } from '../../constants/sidebarConfig';

/**
 * Layout wrapper for the Outlet app.
 *
 * Classic dashboard layout — sidebar is always visible on desktop (collapsible),
 * with an overlay drawer on mobile. Header sits to the right of the sidebar.
 *
 * TODO: Replace the hardcoded `mockUser` with real auth context data.
 */
const Layout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev);

  // TODO: Replace with real auth context
  const user: SidebarUserInfo = {
    name: 'Outlet Admin',
    role: 'Manager',
    avatarUrl: '/profile.png',
    isOnline: true,
  };

  const handleLogout = () => {
    // TODO: Call your auth logout function here
    console.log('Logout clicked');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <SideBar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
        config={outletSidebarConfig}
        user={user}
        onLogout={handleLogout}
      />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header
          toggleSidebar={toggleMobileMenu}
          isSidebarCollapsed={isSidebarCollapsed}
          logo={{
            src: outletSidebarConfig.branding.logoSrc,
            alt: outletSidebarConfig.branding.logoAlt,
          }}
          homePath={outletSidebarConfig.branding.homePath}
          user={user}
          onLogout={handleLogout}
          isAuthenticated={true}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
