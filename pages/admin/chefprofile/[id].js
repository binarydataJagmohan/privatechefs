import React from 'react';
import UpdateChefByAdmin from '../../../components/admin/UpdateChefByAdmin/ChefProfile';

export default function AdminChefProfile({id}) {
  return (
        <>
            <UpdateChefByAdmin userId={id}/>
        </>
  )
}
export async function getServerSideProps({ params }) {
    return {
        props: { id: params.id }
    }
}