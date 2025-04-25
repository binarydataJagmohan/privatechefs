import Image from "next/image";
import { Inter } from "next/font/google";
import React from "react";
import FrontendLocation from "../../components/frontend/Location";
import { slugSingleSetting, getLocationBySlug } from "../../lib/frontendapi";

const inter = Inter({ subsets: ["latin"] });

export default function Location({ pages, locations, singlelocationdata }) {
  return (
    <>
      <FrontendLocation
        pages={pages}
        locations={locations}
        singlelocationdata={locations.location}
      />
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const pagesdata = await slugSingleSetting("location");
  const locationsdata = await getLocationBySlug(slug);
  return {
    props: {
      pages: pagesdata,
      locations: locationsdata,
      singlelocationdata: locationsdata.location,
    },
  };
}
