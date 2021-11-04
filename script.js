const Yahtzee = () => {

    //local scoped variables
    let obj = {};
    //keeps the random numbers
    obj.rnd = [];
    //keeps the numbers which the user want locked
    obj.dis = [];
    //
    obj.id = 1;

    //makes the new inputs tags based on the amount given
    //and if it exist read the index on the rounds
    obj.makeImgTags = (amount) => {
        if (document.querySelectorAll("div>input").length >= amount) {
            if (obj.id > 3) {
                let inputs = document.querySelectorAll("div>input");
                for (let i = 0; i < inputs.length; i++) inputs[i].removeAttribute("onclick");
            } else obj.fillImgTags();
        } else {
            let id = document.getElementById("photoCollection")
            for (let i = 0; i < amount; i++) {
                let input = document.createElement("input");
                id.appendChild(input);
            }
            obj.fillImgTags();
        }
        obj.id++;
    }

    //
    obj.fillImgTags = () => {
        let inputs = document.querySelectorAll("div>input");
        obj.getRandomNumbers(inputs.length);

        if (obj.dis.length > 0) {
            for (let i = 0; i < obj.dis.length; i++) {
                inputs[i].removeAttribute("onclick")
                inputs[i].setAttribute("src", `img/dice_${obj.rnd[i]}.jpg`);
                inputs[i].setAttribute("type", "image");
                inputs[i].setAttribute("value", `${i}`);
                inputs[i].style.border = "3px solid red";
            }
            setAttr(obj.dis.length);
        } else {
            setAttr(0);
        }

        function setAttr(length) {
            for (let i = length; i < obj.rnd.length; i++) {
                inputs[i].setAttribute("src", `img/dice_${obj.rnd[i]}.jpg`);
                inputs[i].setAttribute("type", "image");
                inputs[i].setAttribute("onclick", `objYathzee.setDisabled(${i})`);
                inputs[i].setAttribute("value", `${i}`);
            }
        }
        obj.returnTotalValue();
    }

    //generates random numbers
    obj.getRandomNumbers = (imgAmount) => {
        //resets the random arr
        obj.rnd = [];

        if (obj.dis.length !== 0) {
            //fills the random numbers arr with the disabled buttons values
            for (let i = 0; i < obj.dis.length; i++) {
                obj.rnd[i] = obj.dis[i];
            }
            //if the disabled aren't even to the btns reroll the values
            setValues(obj.dis.length);
        } else {
            setValues(0);
        }

        function setValues(length) {
            for (let i = length; i < imgAmount; i++) {
                let result = Math.floor(Math.random() * 10);
                while (result > 6 || result === 0) {
                    result = Math.floor(Math.random() * 10);
                }
                obj.rnd[i] = result;
            }
        }

        return obj.rnd
    }

    //
    obj.returnTotalValue = () => {
        let totalValue = 0;
        for (let i = 0; i < obj.rnd.length; i++) {
            totalValue += obj.rnd[i];
        }
        document.getElementById("sum-value").innerText = totalValue.toString();
        document.getElementById("avg-value").innerText = Math.floor(totalValue / obj.rnd.length).toString();
        document.getElementById("sum-rounds").innerText = obj.id.toString();
        obj.RulesChecker();
        return totalValue;
    }

    //fills the counts object with values and how many times they where found in the values array
    //RETURNS: object
    obj.checkDuplicated = () => {
        let counts = {}

        for (let i = 0; i < obj.rnd.length; i++) {
            if (counts[obj.rnd[i]]) {
                counts[obj.rnd[i]] += 1
            } else {
                counts[obj.rnd[i]] = 1
            }
        }
        return counts;
    }

    //TODO: zorg dat de juiste punten zicht baar worden en worden genabled
    obj.RulesChecker = () => {
        let objCount = obj.checkDuplicated();
        let i = 0;
        let carre = false
        //dit hieronder werkt niet
       /* if (obj.rnd.includes([1, 2, 3, 4]) || obj.rnd.includes([2, 3, 4, 5]) || obj.rnd.includes([3, 4, 5, 6])) {
            console.log("Kleine straat");
        }
        if (obj.rnd.includes([1, 2, 3, 4, 5]) || obj.rnd.includes([2, 3, 4, 5, 6])) {
            console.log("Groote straat")
        }*/

        
        //arry sort?
        for (const objCountKey in objCount) {
            i++;
            console.log(objCount[i])
            if (objCount[i] >= 3){
                console.log("3 of a kind");
                carre = true;
            }
            if (objCount[i] >= 2 && carre){
                console.log("Carre");
            }
            if (objCount[i] >= 4){
                console.log("4 of a kind");
            }
        }
    }

    //
    obj.setDisabled = (value) => {
        obj.dis.push(obj.rnd[value]);

        for (let i = 0; i < obj.rnd.length; i++) {
            let btn = document.querySelectorAll("input")[i];
            if (btn.value == value) {
                console.log("yessir");
                btn.removeAttribute("onclick");
                btn.removeAttribute("value");
            }
        }
    }
    return obj;
}

let objYathzee = Yahtzee();