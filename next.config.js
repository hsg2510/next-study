// 이 주석은 TypeScript를 사용하여 Next.js 설정 파일의 타입을 지정하는 것입니다.
// import('next').NextConfig는 Next.js의 설정 객체 타입을 가져옵니다.
// 이 주석을 추가하면, nextConfig 객체가 NextConfig 타입을 따르도록 강제할 수 있습니다.
// 이를 통해 설정 파일에서 타입 검사를 수행할 수 있으며, 잘못된 설정을 방지할 수 있습니다.
/** @type {import('next').NextConfig} */

// const API_KEY = "841cdfd85f76bafc4304971cc7cf3d49";
const API_KEY = process.env.API_KEY; // .env 파일에 API_KEY를 저장.

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // 유저가 source url로 접속하면 destination url로 리다이렉트
    // 이 redirection이 permanent인지 아닌지에 따라 브라우저나 검색엔진이 이 정보를 저장할지가 결정됨.
    // redirection을 추가 수정하면 서버 재시작 해줘야 됨.
    return [
      {
        source: '/about',
        destination: '/',
        permanent: false,
      },
      // {
      //   // old-blog/abc -> new-blog/abc로 redirect path뒤에 *을 붙여서 path*로 설정하면 old-blog/abc/def -> new-blog/abc/def로도 redirect됨
      //   source: `/old-blog/:path`,
      //   destination: `/new-blog/:path`,
      //   parmanent: false,
      // }
    ]
  },
  
  // rewrite는 유저를 redirect 시키기는 하지만, 브라우저 주소창에 url이 바뀌지 않음.
  // 이렇게 api key를 숨기면, 브라우저의 개발자 환경의 Network 탭이나 패킷 통신 프로그램을 사용해서 Api key를 볼 수 없음.
  async rewrites() {
    return [
      {
        source: `/api/movies`,
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        // source에 :id를 destination의 원하는 자리에 똑같이 :id로 붙여줘야 함.
        source: `/api/movie/:id`,
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
      }
    ]
  }
}

module.exports = nextConfig
