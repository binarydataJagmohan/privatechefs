import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/PrivacyPolicy.module.css'
import React from 'react';
import FrontendPrivacyPolicy from '../components/frontend/PrivacyPolicy';

const inter = Inter({ subsets: ['latin'] })

export default function PrivacyPolicy() {
  return (
    <>
      <FrontendPrivacyPolicy/>
    </>
  )
}
