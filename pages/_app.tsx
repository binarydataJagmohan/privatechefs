// import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import FrontendLayout from '../components/frontend/layouts/layout';
import AdminLayout from '../components/admin/layouts/layout';
import ChefLayout from '../components/chef/layouts/layout';
import ConciergeLayout from '../components/concierge/layouts/layout';
import BookingLayout from '../components/frontend/layouts/layout';
import { useRouter } from "next/router";
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  if (router.pathname.startsWith("/admin")) {
    return(
      <>
        <Head>
          <title>Admin Dashboard</title>  
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>    
        </Head>
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      </>
    ) 
  } else if (router.pathname.startsWith("/chef")) {
    return(
      <>
        <Head>
          <title>Chef Dashboard</title>  
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>       
        </Head>
        <ChefLayout>
          <Component {...pageProps} />
        </ChefLayout>
      </>
    )
  } else if (router.pathname.startsWith("/concierge")) {
    return(
      <>
        <Head>
          <title>Concierge Dashboard</title>  
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>       
        </Head>
        <ConciergeLayout>
          <Component {...pageProps} />
        </ConciergeLayout>
      </>
    )
  } else if (router.pathname.startsWith("/bookings")) {
    return(
      <>
        <Head>
          <title>Bookings</title>  
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>       
        </Head>
        <BookingLayout>
          <Component {...pageProps} />
        </BookingLayout>
      </>
    )
  } else {
    return (
      <>
        <Head>
          <title>Private Chef</title>     
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>    
        </Head>
        <FrontendLayout>
          <Component {...pageProps} />
        </FrontendLayout>
      </>
    )
  }
}
