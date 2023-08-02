import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Contact.module.css'
import React from 'react';
import FrontendContact from '../components/frontend/Contact';
import { slugSingleSetting } from '../lib/frontendapi';


const inter = Inter({ subsets: ['latin'] })

export default function Contact({pages}: any) {
  return (
    <>
      <FrontendContact pages={pages} />
    </>
  )
}

export async function getServerSideProps() {
  const pagesdata = await slugSingleSetting('contact');
  return {
    props: {
      pages: pagesdata
    },
  };
}
