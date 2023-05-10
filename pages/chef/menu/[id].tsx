import React from 'react';
import ChefMenu from '../../../components/chef/Menu/Menu';
import { GetServerSideProps } from 'next';

interface Menus2Props {
    id: string;
  }

export default function Menus2({id}:Menus2Props) {
  return (
        <>
            <ChefMenu MenuId={id}/>
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
  