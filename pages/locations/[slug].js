import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import React from 'react';
import { slugSingleSetting,getLocationBySlug} from '../../lib/frontendapi';
import ChefLocation from '../../components/frontend/ChefLocation';

const inter = Inter({ subsets: ['latin'] })

export default function Location({pages,locations}) {
  return (
    <>
      <ChefLocation pages={pages} locations={locations} />
    </>
  )
}

export async function getServerSideProps({ params }) {
 const { slug } = params;
  const pagesdata = await slugSingleSetting('location');
  const locationsdata = await getLocationBySlug(slug);
  return {
    props: {
      pages: pagesdata ,
      locations:locationsdata
    },
  };
}