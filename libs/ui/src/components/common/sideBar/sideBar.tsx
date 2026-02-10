import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Icon } from '../Icon';
import type {
  SideBarProps,
  SidebarMenuGroup,
  SidebarUserInfo,
} from '../../../types/sidebar';

// ─── Internal NavItem ────────────────────────────────────────────────

interface NavItemProps {
  icon: string;
  label: string;
  path?: string;
  isActive?: boolean;
  hasSubmenu?: boolean;
  isSubmenuOpen?: boolean;
  onClick?: () => void;
  isSubmenuItem?: boolean;
  isCollapsed?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  path,
  isActive,
  hasSubmenu,
  isSubmenuOpen,
  onClick,
  isSubmenuItem = false,
  isCollapsed = false,
}) => {
  const content = (
    <div
      className={`
        group relative flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer transition-all duration-200
        ${
          isActive
            ? 'bg-orange/10 text-orange font-semibold'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }
        ${isSubmenuItem ? 'pl-10 py-1.5' : ''}
        ${isCollapsed ? 'justify-center px-2' : ''}
      `}
      title={isCollapsed ? label : undefined}
    >
      {isActive && !isSubmenuItem && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-5 bg-orange rounded-r-full" />
      )}

      <div
        className={`
          flex items-center justify-center shrink-0 transition-colors duration-200
          ${
            isActive ? 'text-orange' : 'text-gray-400 group-hover:text-gray-600'
          }
        `}
      >
        <Icon name={icon as any} size={isSubmenuItem ? 15 : 18} />
      </div>

      {!isCollapsed && (
        <>
          <span
            className={`grow text-sm truncate ${
              isSubmenuItem
                ? 'text-xs text-gray-500'
                : isActive
                ? 'font-semibold'
                : 'font-medium'
            }`}
          >
            {label}
          </span>

          {hasSubmenu && (
            <Icon
              name="ChevronDown"
              size={14}
              className={`text-gray-400 transition-transform duration-200 shrink-0 ${
                isSubmenuOpen ? 'rotate-180' : ''
              }`}
            />
          )}
        </>
      )}
    </div>
  );

  if (path && !hasSubmenu) {
    return (
      <li>
        <Link to={path} onClick={onClick}>
          {content}
        </Link>
      </li>
    );
  }

  return <li onClick={onClick}>{content}</li>;
};

// ─── User Profile Footer ─────────────────────────────────────────────

interface UserFooterProps {
  user: SidebarUserInfo;
  onLogout?: () => void;
  isCollapsed?: boolean;
}

const UserFooter: React.FC<UserFooterProps> = ({
  user,
  onLogout,
  isCollapsed = false,
}) => (
  <div className="px-3 pt-3 pb-3 mt-auto border-t border-gray-100">
    <div
      className={`flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50 ${
        isCollapsed ? 'justify-center' : ''
      }`}
    >
      <div className="relative shrink-0">
        <img
          src={user.avatarUrl || '/profile.png'}
          alt={user.name}
          className="object-cover w-8 h-8 rounded-full ring-2 ring-gray-100"
        />
        {user.isOnline !== false && (
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
        )}
      </div>
      {!isCollapsed && (
        <>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold leading-tight text-gray-900 truncate">
              {user.name}
            </p>
            <p className="text-[11px] text-gray-400 truncate leading-tight">
              {user.role}
            </p>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center justify-center w-8 h-8 text-gray-400 transition-colors rounded-lg hover:bg-red-50 hover:text-red-500"
              title="Log out"
            >
              <Icon name="LogOut" size={16} />
            </button>
          )}
        </>
      )}
    </div>
  </div>
);

// ─── Menu Group Renderer ──────────────────────────────────────────────

interface MenuGroupRendererProps {
  group: SidebarMenuGroup;
  openMenus: Record<string, boolean>;
  toggleMenu: (key: string) => void;
  isPathActive: (path: string) => boolean;
  pathname: string;
  isCollapsed: boolean;
}

const MenuGroupRenderer: React.FC<MenuGroupRendererProps> = ({
  group,
  openMenus,
  toggleMenu,
  isPathActive,
  pathname,
  isCollapsed,
}) => {
  const visibleItems = group.items.filter((item) => item.visible !== false);
  if (visibleItems.length === 0) return null;

  return (
    <div className="space-y-1">
      {!isCollapsed && (
        <p className="px-3 pt-4 pb-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          {group.title}
        </p>
      )}
      {isCollapsed && <div className="mx-2 my-2 border-t border-gray-100" />}
      <ul className="space-y-0.5">
        {visibleItems.map((item) => {
          const hasChildren =
            item.children &&
            item.children.filter((c) => c.visible !== false).length > 0;
          const menuKey = item.key || item.label;

          if (hasChildren) {
            const visibleChildren = item.children!.filter(
              (c) => c.visible !== false
            );
            const isParentActive = item.path
              ? pathname.includes(item.path)
              : visibleChildren.some(
                  (c) => c.path && pathname.includes(c.path)
                );

            return (
              <React.Fragment key={menuKey}>
                <NavItem
                  icon={item.icon}
                  label={item.label}
                  hasSubmenu
                  isSubmenuOpen={openMenus[menuKey]}
                  onClick={() => toggleMenu(menuKey)}
                  isActive={isParentActive}
                  isCollapsed={isCollapsed}
                />
                {openMenus[menuKey] && !isCollapsed && (
                  <ul className="space-y-0.5 mt-0.5">
                    {visibleChildren.map((child) => (
                      <NavItem
                        key={child.path || child.label}
                        icon={child.icon}
                        label={child.label}
                        path={child.path}
                        isActive={child.path ? isPathActive(child.path) : false}
                        isSubmenuItem
                      />
                    ))}
                  </ul>
                )}
              </React.Fragment>
            );
          }

          return (
            <NavItem
              key={item.path || item.label}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={item.path ? isPathActive(item.path) : false}
              isCollapsed={isCollapsed}
            />
          );
        })}
      </ul>
    </div>
  );
};

// ─── Mobile Overlay Sidebar ──────────────────────────────────────────

interface MobileOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const MobileOverlay: React.FC<MobileOverlayProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute top-0 left-0 h-full duration-200 shadow-xl w-65 animate-in slide-in-from-left">
        {children}
      </div>
    </div>
  );
};

// ─── Main SideBar Component ───────────────────────────────────────────

const SideBar: React.FC<SideBarProps> = ({
  isCollapsed,
  toggleSidebar,
  isMobileOpen,
  onMobileClose,
  config,
  user,
  onLogout,
}) => {
  const location = useLocation();

  // Auto-expand submenus whose children match the current path
  const initialOpenMenus = useMemo(() => {
    const result: Record<string, boolean> = {};
    for (const group of config.groups) {
      for (const item of group.items) {
        if (item.children && item.children.length > 0) {
          const key = item.key || item.label;
          result[key] = item.children.some(
            (child) => child.path && location.pathname.includes(child.path)
          );
        }
      }
    }
    return result;
    // Only compute on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [openMenus, setOpenMenus] =
    useState<Record<string, boolean>>(initialOpenMenus);

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isPathActive = (path: string) => location.pathname === path;

  const { branding } = config;

  const SidebarContent = ({ collapsed }: { collapsed: boolean }) => (
    <div className="flex flex-col h-full bg-white">
      {/* Brand Header */}
      <div
        className={`flex items-center h-16 border-b border-gray-100 shrink-0 ${
          collapsed ? 'justify-center px-2' : 'px-5'
        }`}
      >
        <Link to={branding.homePath} className="flex items-center gap-3">
          <img
            src={branding.logoSrc}
            alt={branding.logoAlt}
            className={`object-contain ${collapsed ? 'w-8 h-8' : 'h-8'}`}
          />
          {!collapsed && branding.subtitle && (
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest border-l border-gray-200 pl-3">
              {branding.subtitle}
            </span>
          )}
        </Link>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 px-2 py-2 overflow-y-auto no-scrollbar">
        {config.groups.map((group) => (
          <MenuGroupRenderer
            key={group.title}
            group={group}
            openMenus={openMenus}
            toggleMenu={toggleMenu}
            isPathActive={isPathActive}
            pathname={location.pathname}
            isCollapsed={collapsed}
          />
        ))}
      </nav>

      {/* Collapse Toggle (desktop only) */}
      <div className="hidden px-3 py-2 border-t border-gray-100 lg:block">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-full p-2 text-gray-400 transition-colors rounded-lg hover:bg-gray-50 hover:text-gray-600"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Icon
            name={collapsed ? 'PanelLeftOpen' : 'PanelLeftClose'}
            size={18}
          />
        </button>
      </div>

      {/* Footer / User Profile */}
      {user && (
        <UserFooter user={user} onLogout={onLogout} isCollapsed={collapsed} />
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar — always visible, fixed width */}
      <aside
        className={`hidden lg:flex flex-col shrink-0 h-screen border-r border-gray-200/80 bg-white transition-[width] duration-200 ease-in-out ${
          isCollapsed ? 'w-17' : 'w-62.5'
        }`}
      >
        <SidebarContent collapsed={isCollapsed} />
      </aside>

      {/* Mobile Sidebar — overlay on small screens */}
      <MobileOverlay isOpen={isMobileOpen} onClose={onMobileClose}>
        <SidebarContent collapsed={false} />
      </MobileOverlay>
    </>
  );
};

export default SideBar;
