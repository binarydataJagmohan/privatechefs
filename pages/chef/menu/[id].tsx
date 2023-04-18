import React from 'react';
import ChefMenu from '../../../components/chef/Menu/Menu';
export default function Menus2({id}) {
  return (
        <>
            <ChefMenu MenuId={id}/>
        </>
  )
}
export async function getServerSideProps({ params }) {
    return {
        props: { id: params.id }
    }
}