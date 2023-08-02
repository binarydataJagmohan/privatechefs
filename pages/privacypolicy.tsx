import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/PrivacyPolicy.module.css'
import React from 'react';
import FrontendPrivacyPolicy from '../components/frontend/PrivacyPolicy';
import { slugSingleSetting } from '../lib/frontendapi';


const inter = Inter({ subsets: ['latin'] })

export default function PrivacyPolicy({pages}:any) {
  return (
    <>
      <FrontendPrivacyPolicy pages={pages} />
    </>
  )
}

export async function getServerSideProps() {
  const pagesdata = await slugSingleSetting('privacy-policy');
  return {
    props: {
      pages: pagesdata
    },
  };
}
