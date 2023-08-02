import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/OurServices.module.css'
import React from 'react';
import FrontendOurServices from '../components/frontend/OurServices';
import { slugSingleSetting } from '../lib/frontendapi';

const inter = Inter({ subsets: ['latin'] })

export default function OurServices({pages}: any) {
  return (
    <>
      <FrontendOurServices pages={pages} />
    </>
  )
}

export async function getServerSideProps() {
  const pagesdata = await slugSingleSetting('our-services');
  return {
    props: {
      pages: pagesdata
    },
  };
}
