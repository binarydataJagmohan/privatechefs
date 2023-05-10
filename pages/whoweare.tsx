import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/WhoWeAre.module.css'
import React from 'react';
import FrontendWhoWeAre from '../components/frontend/WhoWeAre';

const inter = Inter({ subsets: ['latin'] })

export default function WhoWeAre() {
  return (
    <>
      <FrontendWhoWeAre/>
    </>
  )
}
