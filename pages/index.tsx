import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React from 'react';
import FrontendHome from '../components/frontend/Home';
import { slugSingleSetting } from '../lib/frontendapi';

const inter = Inter({ subsets: ['latin'] })

export default function Home({pages}: any) {
  return (
    <>
      <FrontendHome pages={pages} />
    </>
  )
}

export async function getServerSideProps() {
  const pagesdata = await slugSingleSetting('home');
  return {
    props: {
      pages: pagesdata
    },
  };
}