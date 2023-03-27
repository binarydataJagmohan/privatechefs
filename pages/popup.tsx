import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Popup.module.css'
import React from 'react';
import FrontendPopup from '../components/frontend/Popup';

const inter = Inter({ subsets: ['latin'] })

export default function Popup() {
  return (
    <>
      <FrontendPopup/>
    </>
  )
}
