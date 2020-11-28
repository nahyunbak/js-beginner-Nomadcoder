
//1단계; html에서 querySelector 등으로 form과 input, h2 등의 정보를 가져온다.
//여기서 form은 클래스리스트(와 add등 메소드들), 이벤트 리스너'제출' 등의 js를 쓸 수 있다,
//여기서 input은 dom에 따라 form을 통해 쿼리셀렉터로 선택될 수 있고, 사우에 저장될 수도 있다. 
//querySelectorAll >>전부 가져온다. 쿼리셀렉터는 첫쨰만 가져온다. 
//getElementId...등등. 
//localStorage: 작은 자바스크립트 정보를 유저 컴퓨터에 저장하는 것이다. 
//dom으로 구조찾는 건, class선택자따위 쓰지 않고서 최대한 구체화하기 위해서다.
const form = document.querySelector(".js-form"), 
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");


//2단계: 판단기준, 혹은 클래스가 있고 없고를 판단(remove/add 등에 쓰임.)
//setItem(key, value) getItem(key)>>value가져옴.
const USER_LS = "currentUser",
  SHOWING_CN = "showing";

//3단계: localStorage에  setItem으로 저장한다.
//사용된 단계: 
//사용될 단계; 4단계(5와 6의 정리)) 
function saveName(text) {
  localStorage.setItem(USER_LS, text)
}

//4단계: 2번 이상 이름을 묻는 경우(=로컬에 세이브된), 화면에 문장을 나타내는 함수
//사용된 단계:
//css와 관련됨... 색칠하고, 문자를 출력한다. 
//와우.. form 에서 "showing"제거하고 greeting 멘트에 "showing" 클래스를 넣는다. 동시에 greeting에 text를 표시한다. 근데, 이 
//text인자는 어떻게 넣는 거지? 나중에 const로 표시할 건가?
function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText=`Hello ${text}`;
}

//5단계: 처음 이름을 물을 떄 제출 후 데이터를 처리하는 과정 관리하자(6단계의 새끼함수)
//사용된 단계: 3단계, 4단계
//사용될 단계; 6단계
//(초기화)제출 이벤트의 기본동작은 새로고침하면서 다른 곳으로 간다. 이걸 막기 위해서 'event.preventDefault'를 쓴 거야. 
//(저장상수)input에 넣은 값은, 말 그대로 value인 것이고 const에 input.value로 저장할 수 있다.
//(3단계 사용) 이름을 저장한다.
//(4단계 사용)css를 칠하고 화면에 텍스트를 띄운다.
function handleSubmit(event){
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

//6단계: 처음 이름을 묻는 경우의 함수.
//사용된 단계: 5단계(제출 관리)..이벤트리스너에 쓰임.
//사용될 단계; 7단계(4와 6의 정리)) 
//1)form에"showing"클래스를 추가하고, 
//2)form에이벤트 리스너를 사용한다. 
//form은 무언가를 보내려는 성향이 있다. 이벤트 리스너 '서브밋'을 쓸 수 있는 것이다.
//이벤트 리스너가 있으면 이벤트 리스너에 따른 함수가 있어야겠지? 그게 바로 위의 것이다.
function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}



//7단계: 4화 6의 정리.
//getItem()은 localStorage에서 아이템을 가져오는 것이다. 그리고 이걸 currentUser에 저장하는 거지. 
//만약 username이 없다면 ~를 출력하고, 유저네임이 있다면 위의 paintGreeting함수에 currentUser 인자를 넣어 출력하는 함수란다. 
//요컨대 두번째 단계인거지. 이렇게 단계를 나눠서 하는 게 중요하다.
function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null){
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

//실행함수. 
function init(){
  loadName()
}

init();