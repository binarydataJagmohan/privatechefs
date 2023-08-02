import React from 'react';
import BookingStep1 from '../../components/bookings/Step1';
import { slugSingleSetting } from '../../lib/frontendapi';


export default function Step1({pages}: any) {
  return (
        <>
            <BookingStep1 pages={pages} />
        </>
  )
}

export async function getServerSideProps() {
  const pagesdata = await slugSingleSetting('booking');
  return {
    props: {
      pages: pagesdata
    },
  };
}