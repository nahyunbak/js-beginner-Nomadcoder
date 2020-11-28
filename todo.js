const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

//1단계: todoList에서 할 일 넣기  
//1) 요소 만들기: document.creatElement("h1")
//2) 요소에 값 넣기:요소.value = "hey" ..placeholder면 또 다르겠지??
//3) 요소 사이에 문자 넣기 : 요소.innerText = text;
//4) 요소 밑에 아이 넣기: 요소.appendChild(span); 
function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "X";
    const span = document.createElement("span");
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    toDoList.appendChild(li);
}

//2단계: 
//나머지 똑같음. 
//todo값 입력했을 때 초기회됨
function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}
function loadToDos() {
    const toDos = localStorage.getItem(TODOS_LS);
    if(toDos !== null){
    }

}
function init() {
  loadTodos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init()