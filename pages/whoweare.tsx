import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/WhoWeAre.module.css'
import React from 'react';
import FrontendWhoWeAre from '../components/frontend/WhoWeAre';
import { slugSingleSetting } from '../lib/frontendapi';


const inter = Inter({ subsets: ['latin'] })

export default function WhoWeAre({pages}: any) {
  return (
    <>
      <FrontendWhoWeAre pages={pages} />
    </>
  )
}

export async function getServerSideProps() {
  const pagesdata = await slugSingleSetting('who-we-are');
  return {
    props: {
      pages: pagesdata
    },
  };
}
