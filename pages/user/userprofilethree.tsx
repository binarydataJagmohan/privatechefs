import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/UserProfileThree.module.css'
import React from 'react';
import FrontendUserProfileThree from '../../components/frontend/user/UserProfileThree';

const inter = Inter({ subsets: ['latin'] })

export default function UserProfileThree() {
  return (
    <>
      <FrontendUserProfileThree/>
    </>
  )
}
