const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

    //다른거임 이건. 그냥 문자열임 변수가 아니라.
const TODOS_LS = 'toDos';

//-1단계에서 toDo가 바뀔 예정이므로, let으로 쓰자. 
//로컬스토리지 저장고로 가기 직전으로 쓰임.
//const는 한 번 저장하면 절대 
let toDos = [];



//-2단계: filter는, 마치 forEach에서 funtion을 실행하듯, 각각의 item들과 함께 실행될 것이다...
//여기서 todo는 뭐냐면, filter에 있는 배열[0], 배열[1]... 등을 의미한다. 얘네들은 오브젝트고,
//당연히 .id하면 키함수가 실행된다.
//한데, .id했더나ㅣ 값이 1인 함수가 나온 거지. 
/*

function filterFn(toDo) {
    return toDo.id === 1;
}
*/




//deleteToDo: 화면에 보이는 html 삭제하기 + 로컬스토리지 내역 삭제하기   
//event.target <<클릭된 버튼을 의미-타겟이다. 
//정리하자면, 실행된 화면에서 console.dir(타겟 엘리먼트)로 js파일에 써서  부모를 찾고.., 그 부모 '요소'를 삭제할 방법을 구글링.
// 비교할 때 흔한 오류: 숫자vs문자
//비교하는 방법: 콘솔로그 치기
// console.log(toDo.id, li.id);
//문제는, 어떤 버튼이 클릭되었는지 모른다는 거다. 그래서 id로 구분하는 거지. 
//케이스 1: 숫자와 문자는 다르다... 이 경우, 문자에 parseInt(li.id)를 하면 숫자가 된다.  
//filter는 마치 forEach에서 함수를 실행하듯, 각각의 아이템과 함께 실행되는 함수가 인자로 들어간다.
//filter는 true를 리턴하는(=체크된) 아이템을 저장하는 리스트를 리턴할것이다.

function deleteToDo(event){
    const btn =event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        //아이디가 없는 li를 체크하고 싶다.
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos
    saveToDos();

}                                   

//saveToDos: 로컬스토리지에 저장하기
//자바스크립트는 전부 문자열로 저장하려 한다. ...고로 바꿔야 할 필요가 있다.
//JSON.stringfy는 오브젝트를 문자열로 바꿔서 저장해준다. 
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}


//paintToDo: 구현하기(=화면에 구현하자+오브젝트로 관리해서 저장하자.)
//침고로 이 '구현'은 말 그대로의 의미. 삭제와 클릭했을 때.
//주의해야 할 점은, 인자를 뺀 뼈다귀처럼 만들어야 한다는 것.
//1) 요소 만들기: document.creatElement("h1")
//2) 요소에 값 넣기:요소.value = "hey" ..placeholder면 또 다르겠지??
//3) 요소 사이에 문자 넣기 : 요소.innerText = text;
//4) 요소 밑에 아이 넣기: 요소.appendChild(span); 
//5) const toDoObj 로 오브젝트 생성, 여기서 id는 길이를 의미한다.
//7) toDos에 toDoObj를 넣어준다..? 배열에 오브젝트를 넣어버리네..?
//8) 틈만나면 const로 정리해준다. 정리가 가능하다면 말이지!
//상수-dom-오브젝트 순서네. 
//서로 영향받는 걸 잘 봐야 함. 
//내장함수는 노상관이지만, 예컨대 누가 누구를 실행하는지 잘 봐야 함
//내장상수는 그 함수 안에서만 쓰임 ㅇㅇ
//여기서 newId는 마치..... 길이처럼 군다. 
//내장상수는 콘솔에서 불러오지 못한다. 왜냐하면 내장이니까?! 
//push한다음에 불러오는 거, 잊지 말자
//자바스크립트는 전부 문자열로 저장하려고 한다. 
//.id는 아이디를 부여하는 걸 의마한다. 
function paintToDo(text){
    //상수 저장
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerHTML = "x";
    //삭제할 경우 함수
    delBtn.addEventListener("click", deleteToDo);
    //paintToDo함수의 인자는 text다. 이 text를 프린팅해줘야겠지.
    span.innerText = text;
    //잡다한 것부터 li 안에 정리한다.
    li.appendChild(delBtn);
    li.appendChild(span);
    //투두의 번호..
    li.id = newId;
    //ul클라스 밑에다 li 달아 
    toDoList.appendChild(li);
    //toDos에 다시 저장하자.
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos()
}

//handleSubmit: 제출 순간 paintToDo로 넘어가는 걸 다루는 함수. 
//초기화>localStorage에 value 메소드 써서 저장>paintToDo실행>toDoInput.value에는 빈값 채우기
//todo값 입력했을 때 초기회됨

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

//3단계: 새로고침해서 로드할 때 생기는 일 함수(로컬스토리지에서 꺼내기)
//1)로컬 스토리지에서 값 가져오고(가볍게 변환도 해 주고)
//2)구현하자. (=화면에 구현하자+오브젝트로 관리해서 저장하자.)

//JSON(Javascript Object Notaion)로.. 문자열에서 변환해서 '꺼내는'거다. 
//JSON.stringify(toDos) vs JSON.parse(loadedToDos) 
//set과 get 아이템 메소드 인자로 쓰임. 
//참고로 .forEach() 메소드는, for each괄호안에 있는 함수의 배열의 각 요소를 넣어 한 번씩 실행함. 
//object.key 를 하면 밸류가 나온다. 
//array도 function이 있고, string도 function이 있고, object도 function이 있따. 
/*
여기서, console.log(toDo.text)를 하면 text에 저장된 인풋값의 이름이 쫙 나온다. 
function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            console.log(toDo.text)
        })

    }

*/
function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text)
        })

    }

}
//4단계: 실행하기(로컬스토리지 꺼내기 & 로컬스토리지에 저장될때, 로컬스토리지 저장 함수 호출)
//새로고침을 먼저 하고, 제출한다. 
function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

//실행
init()