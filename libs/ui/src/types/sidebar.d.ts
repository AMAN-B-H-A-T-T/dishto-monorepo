export interface SidebarMenuItem {
  /** Lucide icon name (e.g. 'LayoutDashboard', 'Utensils') */
  icon: string;
  /** Display label for the nav item */
  label: string;
  /** Route path — omit for parent items that only toggle submenus */
  path?: string;
  /** Unique key for tracking submenu open/close state. Required if `children` is provided */
  key?: string;
  /** Nested submenu items */
  children?: SidebarMenuItem[];
  /** Set to `false` to hide this item (useful for conditional rendering) */
  visible?: boolean;
}

export interface SidebarMenuGroup {
  /** Group heading displayed above the items (e.g. 'System Core') */
  title: string;
  /** Navigation items in this group */
  items: SidebarMenuItem[];
}

export interface SidebarBranding {
  /** Logo image source path */
  logoSrc: string;
  /** Logo alt text */
  logoAlt: string;
  /** Subtitle shown below the logo (e.g. 'Admin Terminal') */
  subtitle?: string;
  /** Home path the logo links to */
  homePath: string;
}

export interface SidebarUserInfo {
  /** User's display name */
  name: string;
  /** User's role label */
  role: string;
  /** URL to the user's avatar image */
  avatarUrl?: string;
  /** Whether the user is currently online (shows green dot) */
  isOnline?: boolean;
}

export interface SidebarConfig {
  /** Branding displayed at the top of the sidebar */
  branding: SidebarBranding;
  /** Navigation groups */
  groups: SidebarMenuGroup[];
}

export interface SideBarProps {
  /** Whether the sidebar is collapsed (icon-only mode) on desktop */
  isCollapsed: boolean;
  /** Callback to toggle the sidebar collapsed/expanded (desktop) */
  toggleSidebar: () => void;
  /** Whether the mobile sidebar overlay is open */
  isMobileOpen: boolean;
  /** Callback to close the mobile sidebar overlay */
  onMobileClose: () => void;
  /** Sidebar configuration (branding + menu groups) */
  config: SidebarConfig;
  /** User info displayed in the sidebar footer. Omit to hide the footer */
  user?: SidebarUserInfo;
  /** Called when the user clicks the logout button. Omit to hide the logout button */
  onLogout?: () => void;
}

export interface HeaderProps {
  /** Callback to toggle the sidebar */
  toggleSidebar: () => void;
  /** Whether the sidebar is currently collapsed */
  isSidebarCollapsed: boolean;
  /** Logo configuration */
  logo?: { src: string; alt: string };
  /** Home path the logo links to */
  homePath?: string;
  /** User info for the header */
  user?: SidebarUserInfo;
  /** Called when the user clicks logout */
  onLogout?: () => void;
  /** Whether the user is authenticated */
  isAuthenticated?: boolean;
  /** Whether auth state is loading */
  isLoading?: boolean;
  /** Optional action buttons (notifications, settings, etc.) rendered in the header */
  actions?: React.ReactNode;
}
