import React from 'react';
import MyProfile from '../../../components/concierge/Customers/myprofile';

export default function Myprofile({id}) {
  return (
        <>
            <MyProfile userId={id}/>
        </>
  )
}
export async function getServerSideProps({ params }) {
    return {
        props: { id: params.id }
    }
}