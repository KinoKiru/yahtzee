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
        for (let i = 0; i < obj.arr.length; i++) {
            totalValue += obj.arr[i];
        }
        let value = document.getElementById("total-value").innerText = totalValue.toString();
        console.log(obj.RulesChecker());
        return totalValue;
    }

    //fills the counts object with values and how many times they where found in the values array
    //RETURNS: object
    obj.checkDuplicated = () => {
        let counts = {}

        for (let i = 0; i < obj.arr.length; i++) {
            if (counts[obj.arr[i]]) {
                counts[obj.arr[i]] += 1
            } else {
                counts[obj.arr[i]] = 1
            }
        }
        return counts;
    }

    obj.RulesChecker = () => {
        let objCount = obj.checkDuplicated();
        if (obj.arr.includes([1,2,3,4]) || obj.arr.includes([2,3,4,5]) || obj.arr.includes([3,4,5,6])){
            console.log("Kleine straat");
        }
        if (obj.arr.includes([1,2,3,4,5]) || obj.arr.includes([2,3,4,5,6])){
            console.log("Groote straat")
        }

    }

    return obj;
}

let objYathzee = Yahtzee();
