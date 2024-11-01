import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loading from './components/pages/Loading'

const App = () => {
  const Home = lazy(() => import('./components/pages/HomePage'))
  const Login = lazy(() => import('./components/pages/LoginPage'))
  const Error = lazy(() => import('./components/pages/ErrorPage'))
  const Testing = lazy(() => import('./components/pages/TestingPage'))

  return (
    <>
      <div className="h-screen text-white  bg-[#050E17] ">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/auth' element={<Login />} />
            <Route path='/testing' element={<Testing />} />
            <Route path='*' element={<Error />} />
            <Route path='/loading' element={<Loading />} />
          </Routes>
        </Suspense>
      </div>
    </>
  )
}

export default App