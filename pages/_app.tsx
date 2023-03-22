import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import FrontendLayout from '../components/frontend/layouts/layout';
import AdminLayout from '../components/admin/layouts/layout';
import ChefLayout from '../components/chef/layouts/layout';
import { useRouter } from "next/router";
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  if (router.pathname.startsWith("/admin")) {
    return(
      <>
        <Head>
          <title>{Component.title}</title>        
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
          <title>{Component.title}</title>        
        </Head>
        <ChefLayout>
          <Component {...pageProps} />
        </ChefLayout>
      </>
    )
  } else {
    return (
      <>
        <Head>
          <title>{Component.title}</title>        
        </Head>
        <FrontendLayout>
          <Component {...pageProps} />
        </FrontendLayout>
      </>
    )
  }
}
