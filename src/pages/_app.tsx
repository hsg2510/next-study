import '@/styles/globals.css'
import Layout from "../../components/Layout"
import type { AppProps } from 'next/app'
import { useEffect } from "react";


// 랜더링할 Component가 첫번째 인자로 들어온다. 즉, 이 app은 어떤 페이지를 랜더링 하건간에, <Layout> 컴포넌트 안에 랜더링 된다.
export default function App({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   pageProps.logs.forEach((log) => console.log(log))
  // }, [])

  return (
    <Layout>
        <Component {...pageProps} />
    </Layout>
  )
  // return( <Component {...pageProps} />)
}
