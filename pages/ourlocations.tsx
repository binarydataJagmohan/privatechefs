import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/OurChefs.module.css'
import React from 'react';
import FrontendOurLocations from '../components/frontend/OurLocations';
import { slugSingleSetting } from '../lib/frontendapi';

const inter = Inter({ subsets: ['latin'] })

export default function OurLocations({pages}: any) {
  return (
    <>
      <FrontendOurLocations pages={pages} />
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