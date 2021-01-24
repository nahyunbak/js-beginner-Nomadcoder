const body = document.querySelector("body");

const IMG_NUMBER = 4;

//.classList.add <<class이름을 추가하라
function paintImage(imgNumber) {
    const image = new Image();
    image.src = `image/${imgNumber + 1}.jpg`;
    image.classList.add('bgImage');
    body.appendChild(image);
}

//Math.random() 0.소수~~~ 형식의 랜덤한 수를 반환해준다.
//Math.ceil( 숫자 ) : 올림
//Math.floor ( 숫자 ) : 내림
//Image()  와   document.createElement('img')는 같다. 이걸 변수에 잘 저장해 줘야 유지보수가 편하겠지.

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();
