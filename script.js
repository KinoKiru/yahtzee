const yahtzee = () => {
    let obj = {};
    obj.arr = [];
   obj.getRandomNumbers = (imgAmount) => {
         obj.arr = [];
        for (let i = 0; i < imgAmount; i++) {
            let result = Math.floor(Math.random() * 10);

            while (result > 6 || result === 0) {
                result =  Math.floor(Math.random() * 10);
            }
            obj.arr[i] = result;
        }
        return obj.arr;
    }

    obj.makeImgTags = (amount) => {

        if (document.querySelectorAll("img").length >= amount){

        } else {
            let id = document.getElementById("fotoCollection")
            for (let i = 0; i < amount; i++){
                let img =  document.createElement("img");
                id.appendChild(img);
            }
        }
        obj.fillImgTags();
    }

    obj.fillImgTags = () => {
        let imgTags = document.querySelectorAll("img");
        let arr = obj.getRandomNumbers(imgTags.length);
        for (let i = 0; i < imgTags.length; i++){
            imgTags[i].setAttribute("src", `img/dice_${arr[i]}.jpg`);
        }
        console.log(arr + "\r\n --------------")
    }
}

let objYathzee =  yahtzee();
