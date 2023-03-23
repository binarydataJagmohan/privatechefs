import Header from './header'
import Sidebar from './sidebar'
import Footer from './footer'
import { useRouter } from 'next/router'

export default function Layout({ children }) {
  const router = useRouter()
  return (
    <div>
    	<header className="header-part">
  			<div className="container-fluid pl-0 pr-0">
    			<div className="row ml-0 mr-0" id="body-row">
      				 <Sidebar />
      				<div className="right-part">
      				 <Header />
      				 <main>{children}</main>
      				</div>
      			</div>
      		</div>
      	</header> 
    </div>
  )
}