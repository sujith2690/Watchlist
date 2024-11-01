import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loading from './components/pages/Loading'

const App = () => {
  const Home = lazy(() => import('./components/pages/HomePage'))
  const Login = lazy(() => import('./components/pages/LoginPage'))

  return (
    <>
      <div className="h-screen text-white  bg-[#050E17] ">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth' element={<Login />} />
          </Routes>
        </Suspense>
      </div>
    </>
  )
}

export default App