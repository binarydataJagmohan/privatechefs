import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAllLocation } from "../../../lib/frontendapi";
export default function ChefLocation() {
  interface Location {
    id: number;
    pic: string;
    address: string;
    location_pic: string;
  }

  const router = useRouter();

  const [locations, setLocations] = useState<Location[]>([]);

  const fetchLocationDetails = async () => {
    try {
      const res = await getAllLocation();
      if (res.status) {
        setLocations(res.data);
        //console.log(res.data);
      } else {
        console.log("error");
      }
    } catch (err: any) {
      console.log("error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchLocationDetails();
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };
    fetchData();
  }, [router]);

  return (
    <div className="chefLocation">
      <div className="container">
        <h4> Private Chefs in Greece</h4>
        <h6 className="mb-4">
          Immerse yourself in the culinary wonders of Greece with our <br /> private chefs.
        </h6>
        <div className="row">
          {locations.map((location, index) => (
            <div className="col-md-4" key={index}>
              <div className="set-location-chef ">
                <a href={process.env.NEXT_PUBLIC_BASE_URL + "location/" + location.address}>
                  <div className="mt-2">
                    <p> Private Chefs in </p>
                    <span> {location.address.slice(0, 35)}</span>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
