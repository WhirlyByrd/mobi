import React from 'react'
import AdBanner from './banner/AdBanner'
import ShopScreen from './ShopScreen'

import './HomeScreen.css'


function HomeScreen() {
  return (
      <main>
      <AdBanner />
      <div className='shop'>
      <ShopScreen />
      </div>
      </main>
  )
}

export default HomeScreen