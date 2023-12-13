/**
 * 공통
 * --inspector -> device 그림의 툴바를 클릭하면, 모바일 환경에서 어떻게 보이는지 확인할 수 있다.
 * --css 우선순위: style > #id > .class > tag 
 * --css 읽는 순서: 브라우저가 CSS 코드를 읽을 때 위에서부터 차례대로 읽는다. Cascading Style Sheets 즉, 맨 마지막에 있는코드가 브라우저에 최종적으로 적용된다.
 * --inherit: 일부 style은 inherit 된다. 
 *   -- <div> 자식으로 <p>가 있으면, font-size 스타일을 <div>에게 줘도 <p> 태그는 font-size를 inherit 한다.
 *   -- font-size, font-family, color 등등..
 * --css 변수사용
 * ----// document의 root에 --main-color라는 변수가 선언된 것이다. --default-border라는 변수도 선언함.
    :root {
      --main-color: #fccee0;
      --default-border: 1px solid var(--main-color);
    }

    a { 
      color: var(--main-color);
    }
 * 
 * *** pseudo selectors ***
 *  - div:last-child(first-child) : 동일 level에 있는 div중 마지막(or 첫번째) div 선택하기
 *  - div:nth-child(2), div:nth-child(4) : 동일 level에 있는 div중 두번째, 네번째 div 선택하기
 *  - div:nth-child(even) : 짝수번째 선택하기 (odd는 홀수번째)
 *  - div:nth-child(3n) : 3의 배수번째 선택하기, 3n+1, 2n+1 등등도 가능하다.
 *
 *  - p span : p children 중 span을 선택하기, p의 손자 또는 증손자 중의 span이 있어도 선택된다.
 *  - p > span : span이 p의 바로아래 자식이어야지만 선택된다.
 *  - p + span : p의 바로 다음에 있는 span을 선택한다.
 *  - p ~ span : p의 다음에 있는 모든 span들을 선택한다.
 *
 *  - input:required : input에 required attribute가 설정되어 있는 input을 선택한다. input:optional은 반대이다.
 *  - input[type="password"] : input의 type이 password인 input을 선택한다.
 *  - input[placeholder="username"] : input의 placeholder가 username인 input을 선택한다.
 *  - input[placeholder~="name"] : input의 placeholder에 name이 포함된 input을 선택한다.
 *  - a[title] : title을 가진 a를 선택한다.
 *  - a[href$=".com"] : href의 마지막이 .com인 a를 선택한다.
 *
 *  *** state ***
 *  - button:active : button이 마우스로 클릭되는 중일 때
 *  - button:hover : button에 마우스가 올라가 있는 동안
 *  - button:focus : button이 키보드로 선택되었을 때, input 같은 경우는 커서가 깜빡이는 상태
 *  - a:visited : link에만 적용되는 state. link를 클릭해서 방문한 상태
 *  - form:focus-within : form 안에 있는 자식 중에 하나라도 focus 되었을 때
 *  - form:hover input : form이 hover 되었을 때, form 자식에 있는 input을 선택한다.
 *  - form:hover input:focus : form이 hover 되었을 때, form 자식에 있는 focus 된 input을 선택한다. 
 *  - input::placeholder : input의 placeholder를 선택해서, placeholder에 css를 적용할 수 있다.
 *  - p::selection : p의 text가 선택되었을 때, 선택된 text에 css를 적용할 수 있다.
 *  - p::first-letter : p의 첫 문자에만 css를 적용.
 *  *button에서 background-color든 뭐를 하나 바꾸면 원래 지정되어 있던 border 속성을 잃어버림.
 */

/**
 * 주요 속성
 * *** display ***
 * 1. block, inline element
 *  - div, header, main, section, footer, p, address 등은 block element이다. 즉, 한 줄을 다 차지한다. 반면에 span, a, img 등등은 inline element이다. 즉, 한 줄에 여러개가 올 수 있다.
 *  - block -> inline, inline -> block으로 만드는것이 가능. CSS에서 display: inline/block;으로 설정해주면 된다.
 *
 *  2. block element 
 *  1) width, height, margin, padding, border를 설정할 수 있다. 
 *  -- margin: box의 border의 바깥쪽 영역
 *  ---- margin: 20px 10px 은 상, 하 20px, 좌, 우 10px이다. margin: 20px 10px 5px 1px은 상, 우, 하, 좌로 시계 순서이다.
 *  ---- collapsing margins :margin을 적용하기 전, border 위치의 상 or 하가 서로 같다면, margin은 둘 중 큰값으로 바깥에 있는 tag에 적용된다. body안에 div가 있고, body의 top margin이 20px, div의 top margin이 30px 이면 body의 
 *  ---- top margin으로 30px이 적용되고, div의 top margin은 0px이 된다.
 *  -- padding: box의 border의 안쪽 영역
 *  ---- collapsing margins 현상으로 위처럼 div가 body로부터 일정영역 떨어지지 못할 때,body에 padding 설정해서 떨어뜨릴 수 있다.
 *  -- border: box의 경계
 *  ---- 대부분의 border-style은 못생겨서 대부분 사용하는 border-style은 하나다(solid 이다). (border: 1px solid black;)
 *
 *  3. inline element
 *  -- margin, padding, border를 설정할 수 있다. 하지만 margin은 좌, 우만 적용된다.
 *
 *  4. inline-block
 *  -- display : inline-block; 을 설정하면, inline처럼 한 줄에 여러개가 올 수 있고, block처럼 width, height, 사방의 margin, padding, border를 설정할 수 있다.
 *  -- 그러나 거의 사용 안함. 맘대로 tag 사이에 공간을 두는 등등 .. 그리고 responsive-design(반응형 디자인)을 지원 안함.
 *
 *  5. flexBox
 *  1) 자식 element에는 어떤것도 명시하지 말라. 부모 element에만 명시해라.
 *  -- body안에 div가 세개 있다면, body에 display: flex;를 설정해서 flex container로 만들어준다.
 *  2) justify-content, align-items
 *  -- center, flex-start, flex-end, space-evenly, space-around, space-between, stretch 등등이 있다.
 *  -- stretch는 자식들을 늘어나게 하는데, 자식들의 width, height가 설정되어 있으면 적용되지 않는다.
 *  3) main-axis(수평), cross-axis(수직)
 *  -- justify-content는 main-axis를 기준으로 정렬한다. align-items는 cross-axis를 기준으로 정렬한다.
 *  -- 기본적으로 cross-axis는 main-axis의 수직이다. 그러나 flex-direction: column;을 설정하면 main-axis는 수직이 되고, cross-axis는 수평이 된다.
 *  4) flex-direction
 *  -- flex-direction: row;는 기본값이다. row-reverse, column, column-reverse 등등이 있다.
 *  -- column: 수직, 수평축이 바뀐다.
 *  -- reverse, column-reverse: 우에서 좌로, 밑에서 위로 정렬된다.
 *  *자식인 div를 flexBox로 만들 수 있는데, 만약 div 태그 안에 문자열을 넣고, div를 flexBox로 만들면, 문자열의 위치 또한 justify-content, align-items을 사용해서 컨트롤 할 수 있다.
 *  5) flex-wrap
 *  -- flex-wrap: nowrap;은 기본값이다. flex-wrap: wrap;을 설정하면, flexBox의 자식들이 한 줄에 다 들어가지 못하면, 다음 줄로 넘어간다. 
 *  -- wrap-reverse: 브라우저 화면이 줄어들어 다음줄에 위치시킬때 우에서 좌로, 밑에서 위 순서로 정렬된다.
 *
 *  6. position
 *  -- position: static;은 기본값이다. position: static;은 top, bottom, left, right를 설정할 수 없다.
 *  -- position: fixed; : 스크롤해도 스크롤 되어 없어지지 않고, 화면에 초기위치에서 고정된다. top, bottom, left, right를 설정할 수 있다. 그리고 layer가 상위 layer로 바뀌기 때문에 동일 layer있는 다른 레이어가 가려질 수 있다.
 *    즉, div가 두개 연달아 있으면, 원래 세로로 나란히 두개가 위치해야 하는데, 첫번째 div position: fixed로 하면 두번째 div가 맨 위로 올라올 것이다. 동시에 첫번째 div는 상위 layer로 바뀌기 때문에 두번째 div를 가릴것이다.
 *  -- position: static; : 기본값이다. top, bottom, left, right를 설정할 수 없다.
 *  -- position: relative; : 위치를 살짝 옮기고 싶을 때 사용. 자기 자신의 초기 위치를 기준으로 top, bottom, left, right를 설정한다. 즉, translation 값을 설정하는 것이다.
 *  -- position: absolute; : 가장 가까운 position: static이 아닌 부모 element의 위치를 기준으로 top, bottom, left, right margin을 설정한다. 자신의 부모들이 모두 position: static이면, body를 부모 element로 간주한다.
 *    그래서 일반적으로 absolute를 쓸 경우, 원하는 부모에게 position: relative를 설정해준다. relative를 설정하고 top, bottom, left, right를 설정안하면 static가 동일하기 때문에 설정해줘도 아무 문제가 없다.
 * 
 * *** Colors and Variables ***
 *  1. hex code : #fccee0 
 *  2. rgb, rgba : rgb(255, 255, 255), rgba(255, 255, 255, 0.5)
 * 
 * *** 기타 ***
 * --height: 100vh; // 브라우저의 높이의 100% 크기로 height를 지정한다. viewport height.      
 * --width: 100% -> 부모태그의 비율로 설정
 */

/**
 * 글자
 * 자간 : letter-spacing: 1px;
 * 중앙 정렬 : text-align: center;
 * 글자 굵기 : font-weight: 100 (폰트가 굵기를 지원해야 사용가능) or <strong> 태그 사용.
 * <span> 태그 : 글자 일부를 스타일링 할 때
 */

/**
 * 태그
 * Box 
 * Box에 많이 사용하는 속성 - margin: 20px, padding: 30px, border: 1px solid black, border-radius: 5px
 * 
 */

/**
 * 자주 사용 패턴
 * --중앙정렬 마법의 3요소: display: "block", margin-left: "auto", margin-right: "auto"
 */


export default function CSS() {
    return (
    <>
        <img src="next.svg" alt="Description" style={{width: "100px", display: "block", marginLeft: "auto", marginRight: "auto"}}/>
        <p><span style={{color: "red"}}>Front-end</span> Developer</p>
    </>
    );
}