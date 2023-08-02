import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Location.module.css'
import React from 'react';
import FrontendLocation from '../components/frontend/Location';
import { slugSingleSetting } from '../lib/frontendapi';

const inter = Inter({ subsets: ['latin'] })

export default function Location({pages}: any) {
  return (
    <>
      <FrontendLocation pages={pages} />
    </>
  )
}

export async function getServerSideProps() {
  const pagesdata = await slugSingleSetting('location');
  return {
    props: {
      pages: pagesdata
    },
  };
}

