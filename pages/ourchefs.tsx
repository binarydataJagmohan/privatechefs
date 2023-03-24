import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/OurChefs.module.css'
import React from 'react';
import FrontendOurChefs from '../components/frontend/OurChefs';

const inter = Inter({ subsets: ['latin'] })

export default function OurChefs() {
  return (
    <>
      <FrontendOurChefs/>
    </>
  )
}
