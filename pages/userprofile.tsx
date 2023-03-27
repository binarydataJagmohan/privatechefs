import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/UserProfile.module.css'
import React from 'react';
import FrontendUserProfile from '../components/frontend/UserProfile';

const inter = Inter({ subsets: ['latin'] })

export default function UserProfile() {
  return (
    <>
      <FrontendUserProfile/>
    </>
  )
}
