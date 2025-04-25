import React from "react";
import FrontendLocation from "../../../components/admin/FrontendLocation/frontendlocation";

export default function FrontendLocationId({ id }) {
  return (
    <>
      <FrontendLocation locationId={id} />
    </>
  );
}
export async function getServerSideProps({ params }) {
  return {
    props: { id: params.id },
  };
}
