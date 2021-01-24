//API의 사용 유무는 F12개발자 도구 - NETWORK가면 나온다. 
//HEADER 탭에서 URL 확인 가능.
//RESPONSE 탭에서 오브젝트 확인 가능.


//상수들
//coords = 좌표 
//API :  Application Programming Interface = 다른 서버로부터 데이터를 가져옴 



const weather = document.querySelector(".js-weather");
const API_KEY = "a9b9cd9b2c618317baf412429f990ebb";
const COORDS ="coords";


//날씨 넣기 
//js의 장점: api로 새로고침 없이도 데이터를 가져올 수 있다. 
//fetch(): 데이터를 가져옴.
//주의사항1: 백틱(`)을 사용할 것 
//주의사항2: API 앞에  https://   을 넣어줄 것 
//주의사항3: ${변수} 제대로 넣어주기 
//주의사항4: &appid=${API_key} 뒤에 넣어주기 

//js에서 끝난 뒤 실행함수: .then (function () {}) 
//response는 response 탭으로 추정됨. 
//JSON(Javascript Object Notation): 속성 쌍 값. 위키백과 참고 

function getWeather(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response) {
       return response.json()
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText= `${temperature} @ ${place}`;
    });
}
//saveCoords: 저장하기 
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}



//handleGeoSucces(positon): 성공했을 경우, 저장하자
/* 
저장할 때... key와 value의 이름이 같다면 이렇게 할 수 있다. 
const coordsObj = {
    latitude: latitude, 
    longitude : longtitude
}

const coordsObj = {
    latitude,
    longitude
}

*/
//latitude는 위도(가로), longitude는 경도(세로) 
//날씨 api: https://openweathermap.org/api 


function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, 
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);

}

//handleGeoError(): 실패했을 경우 
function handleGeoError(){
    console.log("Can't access geo location");
}



//askForCoords: 좌표(위치)를 요청함. 
//navigator 설명: https://developer.mozilla.org/ko/docs/Web/API/Navigator
//navigator.geolocation 설명 : https://developer.mozilla.org/ko/docs/Web/API/Navigator/geolocation
//navigator.geolocation.getCurrentPosition 설명 : https://developer.mozilla.org/ko/docs/Web/API/Geolocation/getCurrentPosition
//....부가 설명: 성공, 실패, 옵션으로 나뉜다. 

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}



//loadCoords: 
function loadCoords(){
    const loadedCoords =localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude)
    }
}

    loadCoords();
