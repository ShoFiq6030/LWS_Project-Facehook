import React from 'react'
import Header from './../components/common/Header';
import { useAuth } from '../hooks/useAuth';

function HomePage() {
  const {auth}=useAuth()
  // console.log(auth);
  return (
    <div>
      
    </div>
  )
}

export default HomePage