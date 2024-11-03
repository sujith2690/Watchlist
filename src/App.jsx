import React, { lazy, Suspense, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loading from './components/pages/Loading';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute ';

const App = () => {
  const Home = lazy(() => import('./components/pages/HomePage'));
  const Login = lazy(() => import('./components/pages/LoginPage'));
  const Error = lazy(() => import('./components/pages/ErrorPage'));
  const Testing = lazy(() => import('./components/pages/TestingPage'));
  const SearchList = lazy(() => import('./components/pages/SearchList'));
  const SingleData = lazy(() => import('./components/pages/SingleData'));
  const Search = lazy(() => import('./components/pages/Search'));

  const location = useLocation();

  const renderNavbar = () => {
    const noNavbarPaths = ['/login', '/error'];
    return !noNavbarPaths.includes(location.pathname);
  };

  return (
    <div className="h-screen md:flex flex-row text-white bg-[#050E17]">
      <Suspense fallback={<Loading />}>
        {renderNavbar() && (
          <div className="md:w-64">
            <Navbar />
          </div>
        )}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/watch-list" element={<ProtectedRoute><SearchList /></ProtectedRoute>} />
            <Route path="/search/:path" element={<ProtectedRoute><SearchList /></ProtectedRoute>} />
            <Route path="/:id" element={<ProtectedRoute><SingleData /></ProtectedRoute>} />
            <Route path="/testing" element={<Testing />} />
            <Route path="/error" element={<Error />} />
            <Route path="*" element={<Error />} />
            <Route path="/loading" element={<Loading />} />
          </Routes>
        </div>
      </Suspense>
    </div>
  );
};

export default App;
