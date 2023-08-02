import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/TermsConditions.module.css'
import React from 'react';
import FrontendTermsConditions from '../components/frontend/TermsConditions';
import { slugSingleSetting } from '../lib/frontendapi';

const inter = Inter({ subsets: ['latin'] })

export default function TermsConditions({pages}:any) {
  return (
    <>
      <FrontendTermsConditions pages={pages}/>
    </>
  )
}

export async function getServerSideProps() {
  const pagesdata = await slugSingleSetting('terms-conditions');
  return {
    props: {
      pages: pagesdata
    },
  };
}
