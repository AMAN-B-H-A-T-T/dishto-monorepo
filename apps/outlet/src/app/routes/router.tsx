import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';

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
        {/* Routes wrapped with Layout (Header + Sidebar) */}
        <Route element={<Layout />}>
          <Route path="/" element={<p>Outlet Dashboard</p>} />
          <Route path="/dashboard" element={<p>Outlet Dashboard</p>} />
          <Route path="/orders" element={<p>Orders Page</p>} />
          <Route path="/menu" element={<p>Menu Page</p>} />
          <Route path="/menu/add" element={<p>Add Menu Item</p>} />
          <Route path="/categories" element={<p>Categories Page</p>} />
          <Route path="/categories/add" element={<p>Add Category</p>} />
          <Route
            path="/settings/profile"
            element={<p>Outlet Profile Settings</p>}
          />
          <Route path="/settings/preferences" element={<p>Preferences</p>} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default RoutesProvider;
