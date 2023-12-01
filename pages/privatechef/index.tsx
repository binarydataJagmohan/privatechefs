import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Chefs.module.css'
import React from 'react';
import FrontendChefs from '../../components/frontend/Chefs';

const inter = Inter({ subsets: ['latin'] })

export default function FrontChefs() {
  return (
    <>
      <FrontendChefs/>
    </>
  )
}
