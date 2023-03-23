import React, {useState, useEffect} from 'react';
import dynamic from 'next/dynamic'
import { useRouter } from "next/router";

export default function Header() {
    return (
        <>         
            <div className="right-header mt-4 text-right">
                <div className="row">
                    <div className="col-lg-7 col-md-4 col-2">
                     <a href="#" className="bars-icon"><i className="fa-solid fa-bars"></i></a>
                    </div>
                    <div className="col-lg-3 col-md-6 col-6">
                        <form className="form-Search">
                            <input type="text" placeholder="Search" />
                        </form>
                    </div>
                    <div className="col-lg-1 col-md-1 col-2">
                        <p className="mb-0 comments-bell"><a href="#"><i className="fa-solid fa-comments"></i></a></p>
                    </div>
                    <div className="col-lg-1 col-md-1 col-2">
                        <p className="mb-0 comments-bell"><a href="#"><i className="fa-solid fa-bell"></i></a></p>
                    </div>
                </div>
            </div>             
        </>
  )
}
