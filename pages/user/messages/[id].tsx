import React from 'react';
import UserMesage from '../../../components/frontend/user/Messages';
import { GetServerSideProps } from 'next';

interface messageprop {
    id: string;
  }

export default function message({id}:messageprop) {
  return (
        <>
            <UserMesage UserId={id}/>
        </>
  )
}
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    if (!params) {
      return { notFound: true };
    }
    const id = params.id as string;
    return {
      props: { id },
    };
  };
  