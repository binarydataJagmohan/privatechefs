import React from 'react';
import AdminVillas2 from '../../../components/admin/Villas2/Villas2';

export default function Myprofile({id}) {
  return (
        <>
            <AdminVillas2 id={id}/>
        </>
  )
}
export async function getServerSideProps({ params }) {
    return {
        props: { id: params.id }
    }
}