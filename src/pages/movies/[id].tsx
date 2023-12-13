// movies/121212 와같이 뒤에 변수를 넣어서 접속했을 때 호출될 페이지이다. dynamic route이다.

import { useRouter } from 'next/router';

export default function Detail() {
    const router = useRouter();

    return (
        <div>
            <h4>{router.query.title || "Loading..."}</h4>
        </div>
    );
}