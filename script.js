const Yahtzee = () => {

    //local scoped variables
    let obj = {};
    obj.arr = [];

    //generates random numbers
    obj.getRandomNumbers = (imgAmount) => {
        obj.arr = [];
        for (let i = 0; i < imgAmount; i++) {
            let result = Math.floor(Math.random() * 10);

            while (result > 6 || result === 0) {
                result = Math.floor(Math.random() * 10);
            }
            obj.arr[i] = result;
        }
        return obj.arr;
    }

    //makes the new img takes based on the amount given
    obj.makeImgTags = (amount) => {

        if (document.querySelectorAll("img").length >= amount) {

        } else {
            let id = document.getElementById("fotoCollection")
            for (let i = 0; i < amount; i++) {
                let img = document.createElement("img");
                id.appendChild(img);
            }
        }
        obj.fillImgTags();
    }

    //fills the img tags with the needed img
    obj.fillImgTags = () => {
        let imgTags = document.querySelectorAll("img");
        let arr = obj.getRandomNumbers(imgTags.length);
        for (let i = 0; i < imgTags.length; i++) {
            imgTags[i].setAttribute("src", `img/dice_${arr[i]}.jpg`);
        }
        console.log(arr + "\r\n --------------")
    }

    return obj;
}

let objYathzee = Yahtzee();
