import React from "react";
import Header from './header'
import Sidebar from './sidebar'
import { useRouter } from 'next/router'
import { Props } from "./Props";
import { NewType } from "./NewType";
export default function Layout({ children, ...props }: Props): NewType {
  const router = useRouter();
  return (
    <>
    	<header className="header-part">
  			<div className="container-fluid pl-0 pr-0">
    			<div className="row ml-0 mr-0" id="body-row">
      				<Sidebar />
      				<div className="right-part">
      				 	<Header />
      				 	<main {...props}>{children}</main>
      				</div>
      			</div>
      		</div>
      	</header> 
    </>
  )
}