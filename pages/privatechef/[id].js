import React from 'react'
import FrontedChef from "../../components/frontend/Chefs"

export default function ({id}) {
    return (
        <>
            <FrontedChef userId={id}/>
        </>
  )
}
export async function getServerSideProps({ params }) {
    return {
        props: { id: params.id }
    }
}