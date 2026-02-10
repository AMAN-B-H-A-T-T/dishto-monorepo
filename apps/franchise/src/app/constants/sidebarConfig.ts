import type { SidebarConfig } from '@lib/ui';
import {
  PAGE_DASHBOARD,
  PAGE_ORDER,
  PAGE_MENU_ADD,
  PAGE_MENU_LIST,
  PAGE_CATEGORIES_ADD,
  PAGE_CATEGORIES_LIST,
  PAGE_HOME,
} from './page';

/**
 * Sidebar configuration for the Franchise app.
 *
 * To conditionally show/hide items (e.g. "Menu Preview" based on user data),
 * create a function that returns `SidebarConfig` and toggle `visible` on items:
 *
 * ```ts
 * export const getFranchiseSidebarConfig = (outletSlug?: string): SidebarConfig => ({
 *   ...franchiseSidebarConfig,
 *   groups: franchiseSidebarConfig.groups.map(g => ({
 *     ...g,
 *     items: g.items.map(item => item.key === 'menu' ? {
 *       ...item,
 *       children: item.children?.map(child =>
 *         child.path === '/menu-preview' ? { ...child, visible: !!outletSlug } : child
 *       ),
 *     } : item),
 *   })),
 * });
 * ```
 */
export const franchiseSidebarConfig: SidebarConfig = {
  branding: {
    logoSrc: '/login-logo.png',
    logoAlt: 'Dishto Logo',
    subtitle: 'Admin Terminal',
    homePath: PAGE_HOME.path,
  },
  groups: [
    {
      title: 'System Core',
      items: [
        {
          icon: 'LayoutDashboard',
          label: 'Overview',
          path: PAGE_DASHBOARD.path,
        },
        {
          icon: 'Activity',
          label: 'Live Orders',
          path: PAGE_ORDER.path,
        },
      ],
    },
    {
      title: 'Management',
      items: [
        {
          icon: 'Utensils',
          label: 'Menu Hub',
          key: 'menu',
          children: [
            {
              icon: 'PlusCircle',
              label: 'Add Dish',
              path: PAGE_MENU_ADD.path,
            },
            {
              icon: 'ScrollText',
              label: 'Menu Management',
              path: PAGE_MENU_LIST.path,
            },
            {
              icon: 'Eye',
              label: 'Menu Preview',
              path: '/menu-preview',
              // Set visible: false to hide this item when outlet slug is not available
              // You can toggle this dynamically — see comment above
            },
          ],
        },
        {
          icon: 'Boxes',
          label: 'Collections',
          key: 'categories',
          children: [
            {
              icon: 'PlusCircle',
              label: 'New Group',
              path: PAGE_CATEGORIES_ADD.path,
            },
            {
              icon: 'FolderArchive',
              label: 'Vault',
              path: PAGE_CATEGORIES_LIST.path,
            },
          ],
        },
        {
          icon: 'Boxes',
          label: 'Collections-1',
          key: 'categories-1',
          children: [
            {
              icon: 'PlusCircle',
              label: 'New Group',
              path: PAGE_CATEGORIES_ADD.path,
            },
            {
              icon: 'FolderArchive',
              label: 'Vault',
              path: PAGE_CATEGORIES_LIST.path,
            },
          ],
        },
        {
          icon: 'Boxes',
          label: 'Collections-2',
          key: 'categories-2',
          children: [
            {
              icon: 'PlusCircle',
              label: 'New Group',
              path: PAGE_CATEGORIES_ADD.path,
            },
            {
              icon: 'FolderArchive',
              label: 'Vault',
              path: PAGE_CATEGORIES_LIST.path,
            },
          ],
        },
      ],
    },
  ],
};
