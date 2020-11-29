const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

const toDos = [];



//-2단계: filter는, 마치 forEach에서 funtion을 실행하듯, 각각의 item들과 함께 실행될 것이다...
//filter는 리턴값이 1인 것==true만 가지고 간다.

function filterFn(toDo) {
    return toDo.id === 1;
}


//-1단계: 화면에서 버튼과 li삭제하기  
//event.target <<클릭된 버튼을 의미-타겟이다. 
//정리하자면, console.dir(타겟 엘리먼트)로 부모를 찾고, 그 부모 '요소'를 삭제할 방법을 구글링.
// 


function deleteToDo(event){
    const btn =event.target.parentNode;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(filterFn);
    console.log("cleanToDos")
}                          

//0단계: 저장하기.
//자바스크립트는 전부 문자열로 저장하려 한다. ...고로 바꿔야 할 필요가 있다.
//JSON.stringfy는 오브젝트를 문자열로 바꿔서 저장해준다. 
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}


//1단계: todoList에서 할 일 나오게 만들기  
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
function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerHTML = "X";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos()
}

//2단계: 제출관리(로컬스토리지 저장)
//초기화>localStorage에 value 메소드 써서 저장>paintToDo실행>toDoInput.value에는 빈값 채우기
//todo값 입력했을 때 초기회됨

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

//3단계: 로드하기(로컬스토리지에서 꺼내기)
//JSON(Javascript Object Notaion)로.. 문자열에서 변환해서 '꺼내는'거다. 
//JSON.stringify(toDos) vs JSON.parse(loadedToDos) 
//set과 get 아이템 메소드 인자로 쓰임. 
//.forEach() 메소드는, for each괄호안에 있는 함수의 배열의 각 요소를 넣어 한 번씩 실행함. 
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
//
function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

//실행
init()