function getRandomNumbers(imgAmount) {
    let arr = [];
    for (let i = 0; i < imgAmount; i++) {
        let result = Math.floor(Math.random() * 10);

        while (result > 6 || result === 0) {
            result =  Math.floor(Math.random() * 10);
        }
        arr[i] = result;
        console.log(arr[i]);
    }
    return arr;
}

function makeImgTags (amount) {
    let id = document.getElementById("fotoCollection")
    for (let i = 0; i < amount; i++){
       let img =  document.createElement("img");
      id.appendChild(img);
    }
    fillImgTags();
}

function fillImgTags () {
    let imgTags = document.querySelectorAll("img");
    let arr = getRandomNumbers(imgTags.length);
    for (let i = 0; i < imgTags.length; i++){
        imgTags[i].setAttribute("src", `img/dice_${arr[i]}.jpg`);
    }
}