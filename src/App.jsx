import React, { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Loading from './components/pages/Loading'
import Navbar from './components/common/Navbar'

const App = () => {
  const Home = lazy(() => import('./components/pages/HomePage'))
  const Login = lazy(() => import('./components/pages/LoginPage'))
  const Error = lazy(() => import('./components/pages/ErrorPage'))
  const Testing = lazy(() => import('./components/pages/TestingPage'))
  const SearchList = lazy(() => import('./components/pages/SearchList'))



  return (
    <div className="h-screen md:flex flex-row text-white bg-[#050E17]">
      <Suspense fallback={<Loading />}>
        <div className="md:w-64">
          <Navbar />
        </div>
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/auth' element={<Login />} />
            <Route path='/search-list' element={<SearchList />} />
            <Route path='/testing' element={<Testing />} />
            <Route path="*" element={<Error />} />
            <Route path='/loading' element={<Loading />} />
          </Routes>

        </div>
      </Suspense>
    </div>
  )
}

export default App;
