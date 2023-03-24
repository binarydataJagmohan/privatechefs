import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Contact.module.css'
import React from 'react';
import FrontendContact from '../components/frontend/Contact';

const inter = Inter({ subsets: ['latin'] })

export default function Contact() {
  return (
    <>
      <FrontendContact/>
    </>
  )
}
