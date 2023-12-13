import { useRouter } from 'next/router';
import Seo from '../../../components/Seo';

export default function Detail({params}) {
    const router = useRouter();
    console.log("...params");
    /**
     * 서버에서 pre render 될때는 import문을 실행 안하고, 현재 컴포넌트의 초기상태에 의존해서 html만 빨리 만들어서 client로 내려보내준다.
     * 즉, 다음 코드에서 router.query.params는 undefined일 것이기 때문에 빈배열 [] 초기화가 필요하다.
     * 그리고 <h4> 안에 {title} 부분은 java script 이기 때문에, 웹브라우저에서 소스보기를 해도 보이지가 않는다. 즉 이러한 것들이 싫다면, getServerSideProps 사용하자.
     * getServerSideProps를 사용해서 server에서 title 정보를 가지고 HTML을 만들어서 client로 보내면, 밑에 빈배열 [] 초기화 코드가 필요없다.
     */
    // const [title, id] = router.query.params || [];
    const [title, id] = params;
    
    return (
        <div>
            <Seo title={title}/>
            <h4>
                {title}
            </h4>
        </div>
    );
}

/**
 * next.js가 parameter로 server-side context를 제공해 준다. 
 * ctx.params.params만 필요하니, parameter에 ctx 전체가 아닌, {params:{params}}를 명시해서 사용하자.
 */
// export function getServerSideProps(ctx) {

export function getServerSideProps({params:{params}}) {
    return {
        props: {
            params,
        }
    }
}