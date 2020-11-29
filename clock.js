//DIVIDE AND CONQURE...AND UPDATE
//1. 전역(?)상수 선언 
//(DOM)여기서 두번째 줄은 전혀 이상하지 않아, 왜냐하면 DOM구조가 그런 거잖아? clockContainer안에 있는 것들 중에서 h1이라는 요소를 하나 찾아내는 거지.
const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1")

//2. 시간을 부르는 함수    
//(DOM)여기서 3~4째줄도 마찬가지. date안에서 메소드를 이용하여 찾는거지. 참고로 함수명은 동사로, 그리고 낙타(카멜케이스)로 가즈아.
//(백틱 진술)변수를 넣은 세련된 진술을 하려면, `${hours}:${minutes}`
//(삼항연산자-ternary operator-미니if) ?는 질문이고, `0${seconds}`는 대답이다 만약 아니면, :뒤의 것을 출력한다. 중간에 띄어쓰기가 있다
function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
    }:${
        seconds < 10 ? `0${seconds}` : seconds
    }`;
}
//3.초기화(정리) 함수
//(시간함수)setInterval(fn, milisecond) 

function init() {
    getTime();
    setInterval(getTime, 1000);
    
}

//4.호출
init()