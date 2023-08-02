import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/OurChefs.module.css'
import React from 'react';
import FrontendOurChefs from '../components/frontend/OurChefs';
import { slugSingleSetting } from '../lib/frontendapi';

const inter = Inter({ subsets: ['latin'] })

export default function OurChefs({pages}: any) {
  return (
    <>
      <FrontendOurChefs pages={pages} />
    </>
  )
}

export async function getServerSideProps() {
  const pagesdata = await slugSingleSetting('our-chefs');
  return {
    props: {
      pages: pagesdata
    },
  };
}