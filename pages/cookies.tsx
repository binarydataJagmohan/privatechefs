import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Cookies.module.css'
import React from 'react';
import FrontendCookies from '../components/frontend/Cookies';

const inter = Inter({ subsets: ['latin'] })

export default function Cookies() {
  return (
    <>
      <FrontendCookies/>
    </>
  )
}
