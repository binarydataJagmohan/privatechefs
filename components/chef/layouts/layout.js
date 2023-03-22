import Header from './header'
import Footer from './footer'
import { useRouter } from 'next/router'

export default function Layout({ children }) {
  const router = useRouter()
  return (
    <div>
      <Header />
        <main>{children}</main>
      <Footer />
    </div>
  )
}