import React, { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// import CategoriesListPage from '../components/categories/categoriesListPage';
// import CategoriesForm from '../components/categories/categoriesForm';
// import CategroiesDetail from '../components/categories/categroiesDetail';
import Layout from '../components/layout/Layout';
// import AddMenu from '../components/menu/addMenu';
import { PAGE_CATEGORIES_LIST, PAGE_HOME, PAGE_LOGIN } from '../constants/page';
import { Home } from '../pages/home';
import CategoriesListPage from '../components/categories/categoriesListPage';
import CategoriesForm from '../components/categories/categoriesForm';
import CategoriesDetail from '../components/categories/categroiesDetail';

// const Home = lazy(() => import('../components/home/home'));
const Login = lazy(() => import('../pages/login/login'));
// const MenuListPage = lazy(() => import('../pages/menus/menuListPage'));
// const UserMenu = lazy(() => import('../pages/menus/userMenu'));

export const RoutesProvider: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-orange"></div>
        </div>
      }
    >
      <Routes>
        <Route path={PAGE_LOGIN.path} element={<Login />} />

        {/* Admin/Internal Routes with Layout (Header + Sidebar) */}
        <Route element={<Layout />}>
          <Route path={PAGE_HOME.path} element={<Home></Home>} />
          {/* Uncomment and replace with real page components as you build them:
          <Route path={PAGE_HOME.path} element={<Home />} />
          <Route path={PAGE_MENU_LIST.path} element={<MenuListPage />} />
          <Route path="/menu-preview" element={<UserMenu />} />
          <Route path={PAGE_ORDERS_LIST.path} element={<p>Orders Page</p>} />
          <Route path={PAGE_ADD_MENU_ITEM.path} element={<AddMenu />} /> */}

          <Route path="/categories">
            <Route
              index
              element={<Navigate to={PAGE_CATEGORIES_LIST.path} replace />}
            />
            <Route path="list" element={<CategoriesListPage />} />
            <Route path="add" element={<CategoriesForm />} />
            <Route path="edit/:slug" element={<CategoriesForm />} />
            <Route path=":slug" element={<CategoriesDetail />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to={PAGE_HOME.path} replace />} />
      </Routes>
    </Suspense>
  );
};

export default RoutesProvider;
