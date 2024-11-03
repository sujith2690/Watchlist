import React from 'react'
import Navbar from '../common/Navbar'
import Banner from '../homePage/Banner'
import { H1 } from '../common/Typography'
import Categories from '../homePage/Categories'
import SearchBox from '../common/SearchBox'
import { useState } from 'react'


const HomePage = () => {
    return (
        <div className='h-full'>
            <SearchBox  />
            <Banner />
        </div>
    )
}

export default HomePage