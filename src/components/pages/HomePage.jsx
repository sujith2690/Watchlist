import React from 'react'
import Navbar from '../common/Navbar'
import Banner from '../homePage/Banner'
import { H1 } from '../common/Typography'
import Categories from '../homePage/Categories'


const HomePage = () => {
    return (
        <div className='h-full'>
            <Banner />
            <Categories  />
        </div>
    )
}

export default HomePage