import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/TermsConditions.module.css'
import React from 'react';
import FrontendTermsConditions from '../components/frontend/TermsConditions';

const inter = Inter({ subsets: ['latin'] })

export default function TermsConditions() {
  return (
    <>
      <FrontendTermsConditions/>
    </>
  )
}
