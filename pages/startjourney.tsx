import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/StartJourney.module.css'
import React from 'react';
import FrontendStartJourney from '../components/frontend/StartJourney';

const inter = Inter({ subsets: ['latin'] })

export default function StartJourney() {
  return (
    <>
      <FrontendStartJourney/>
    </>
  )
}
