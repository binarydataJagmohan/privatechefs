import React from "react";
import MyProfile from "../../../components/admin/Invoices/single-invoice";

export default function Myprofile({ id }) {
  return (
    <>
      <MyProfile userId={id} />
    </>
  );
}
export async function getServerSideProps({ params }) {
  return {
    props: { id: params.id },
  };
}
