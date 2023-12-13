
// import Head from "next/head";
// import { useEffect, useState } from "react";
import Seo from "../../components/Seo";
import Link from "next/link";
import { useRouter } from 'next/router';

export default function home({results}) {
  const router = useRouter();
  /**
   * routing 하는 두가지 방법이다. 
   * 1. Link를 사용해서 href로 이동하는 방법
   * 2. router로 이동하는 방법
   */

  const onClick = (id, title) => { 
    /**
     * 1. router.push(`/movies/${id}`); 
     * 2. 
     * router.push({
     * pathname: `/movies/${id}`,
     * query : {
     *   id, 
     *   title: "potatos",
     * }});  // -> url/movies/123?id=123&title=potatos로 이동
     */

    /**
     * URL 정보를 숨기고 싶을 때 사용, 브라우저에는 /movies/123 으로만 노출.
     */
    // router.push({
    //   pathname: `/movies/${id}`,
    //   query: {
    //     title: title,
    //   }
    // }, `/movies/${id}`); 
    /**
     * 위와 같은 동작을 Link로도 가능
     * <Link key={movie.id} href={{ 
     *   pathname: `/movies/${movie.id}`,
     *   query: {
     *    title: movie.original_title,
     *   }, 
     * }}
     * as={`/movies/${movie.id}`}></Link>
     */
    
    /**
     * Catch All Route
     * pages/movies/[...params].js를 만들고
     * url/movies/abc/def/ghi 로 호출을 하면, 해당 파일내에서 router.query.params로 abc, def, ghi 정보를 array로 가져올 수 있다.  
     * 단, 지금 movies 폴더안에 [...params].js, [id].js가 같이 들어가 있기 때문에, pages/movies/${id} 이런식으로 movies 뒤에 param이 하나만 들어갈 때는 [id].js가 불린다.
     */
    router.push(`/movies/${title}/${id}`); 
  }
    return (
        <div className="container">
            <Seo title="Home" />
            {
              results?.map((movie) => (
                  <div className="movie" key={movie.id} onClick={()=>onClick(movie.id, movie.original_title)}>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                    {/* <Link key={movie.id} href={`/movies/${movie.id}`}> */}
                      <h4>{movie.original_title}</h4>
                    {/* </Link> */}
                  </div>
            ))
            }
            <style jsx>{`
              .container {
                display: grid;
                grid-template-columns: 1fr 1fr;
                padding: 20px;
                gap: 20px;
              }
              .movie {
                cursor: pointer;
              }
              .movie img {
                max-width: 100%;
                border-radius: 12px;
                transition: transform 0.2s ease-in-out;
                box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
              }
              .movie:hover img {
                transform: scale(1.05) translateY(-10px);
              }
              .movie h4 {
                font-size: 18px;
                text-align: center;
              }
            `}</style>
        </div>
    )
}

export async function getServerSideProps() {
  /*
    getServerSideProps 이름을 가진 function은 무조건 서버에서 실행된다.
    Apikey를 여기서 작성하면, 굳이 rewrite 기능을 안써도됨.
    여기서 return한 props는 _app.js의 App 컴포넌트의 두번째 인자로 들어가게 되고, Component의 pageProps로 넘겨주게 되어있다. 
    그래서 위 "export default function home({results})" 의 명시된 results 인자로 전달되는 것이다.

    export default function App({ Component, pageProps }: AppProps) {
    return (
      <Layout>
          <Component {...pageProps} />
      </Layout>
    )
  */

  const { results } = await ( 
    // await fetch(`http://localhost:3002/api/movies`) //왜 안되지?
    await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=841cdfd85f76bafc4304971cc7cf3d49`)
  ).json();
  
  return {
    props: { 
      results, 
    },
  };
}
