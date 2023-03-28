import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Covid19.module.css'
import React from 'react';
import FrontendCovid19 from '../components/frontend/Covid19';

const inter = Inter({ subsets: ['latin'] })

export default function Covid19() {
  return (
    <>
      <FrontendCovid19/>
    </>
  )
}
