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
        return obj.arr
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
        let imgTags = document.querySelectorAll("div>img");
        let arr = obj.getRandomNumbers(imgTags.length);
        for (let i = 0; i < imgTags.length; i++) {
            imgTags[i].setAttribute("src", `img/dice_${obj.arr[i]}.jpg`);
        }
        console.log(obj.arr + "\r\n --------------");
        obj.returnTotalValue();
    }

    obj.returnTotalValue = () => {
        let totalValue = 0;
        for (let i = 0; i < obj.arr.length; i++){
            totalValue += obj.arr[i];
        }
        let value = document.getElementById("total-value").innerText = totalValue.toString();
        obj.checkRolledValues();
        return totalValue;
    }

    obj.checkRolledValues = () => {


        //deze checkt alleen op de dubble dingen niet hoevaak dit gebeurt
        //console.log(obj.arr.filter((item, index) => obj.arr.indexOf(item) != index));
    }

    return obj;
}

let objYathzee = Yahtzee();
