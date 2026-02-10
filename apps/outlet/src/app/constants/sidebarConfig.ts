import type { SidebarConfig } from '@lib/ui';

/**
 * Sidebar configuration for the Outlet app.
 *
 * Customize the groups and items below to match the outlet's navigation needs.
 * Each app maintains its own sidebar config independently.
 */
export const outletSidebarConfig: SidebarConfig = {
  branding: {
    logoSrc: '/login-logo.png',
    logoAlt: 'Dishto Logo',
    subtitle: 'Outlet Portal',
    homePath: '/',
  },
  groups: [
    {
      title: 'Dashboard',
      items: [
        {
          icon: 'LayoutDashboard',
          label: 'Overview',
          path: '/dashboard',
        },
        {
          icon: 'Activity',
          label: 'Live Orders',
          path: '/orders',
        },
      ],
    },
    {
      title: 'Menu Management',
      items: [
        {
          icon: 'Utensils',
          label: 'Menu',
          key: 'menu',
          children: [
            {
              icon: 'ScrollText',
              label: 'View Menu',
              path: '/menu',
            },
            {
              icon: 'PlusCircle',
              label: 'Add Item',
              path: '/menu/add',
            },
          ],
        },
        {
          icon: 'Boxes',
          label: 'Categories',
          key: 'categories',
          children: [
            {
              icon: 'FolderArchive',
              label: 'All Categories',
              path: '/categories',
            },
            {
              icon: 'PlusCircle',
              label: 'Add Category',
              path: '/categories/add',
            },
          ],
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          icon: 'Store',
          label: 'Outlet Profile',
          path: '/settings/profile',
        },
        {
          icon: 'Settings',
          label: 'Preferences',
          path: '/settings/preferences',
        },
      ],
    },
  ],
};
