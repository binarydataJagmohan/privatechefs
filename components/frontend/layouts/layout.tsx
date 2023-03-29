import Header from './header'
import Footer from './footer'
import { useRouter } from 'next/router'
import { Props } from "./Props";
export default function Layout({ children, ...props }: Props) {
  const router = useRouter()
  return (
    <div>
      <Header />
      <main {...props}>{children}</main>
      <Footer />
    </div>
  )
}