const Yahtzee = () => {

    //local scoped variables
    let obj = {};
    //keeps the random numbers
    obj.rnd = [];
    //keeps the numbers which the user want locked
    obj.dis = [];

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

    obj.fillImgTags = () => {
        let inputs = document.querySelectorAll("div>input");
        obj.getRandomNumbers(inputs.length);

        if (obj.dis.length > 0) {
            for (let i = 0; i < obj.dis.length; i++) {
                inputs[i].removeAttribute("onclick")
                inputs[i].setAttribute("src", `img/dice_${obj.rnd[i]}.jpg`);
                inputs[i].setAttribute("type", "image");
                inputs[i].setAttribute("value", `${i}`);
                inputs[i].style.border = "1px solid red";
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
                obj.rnd[i] = Math.floor(Math.random() * 6) + 1;
            }
        }
        return obj.rnd
    }

    obj.returnTotalValue = () => {
        let totalValue = 0;
        for (let i = 0; i < obj.rnd.length; i++) {
            totalValue += obj.rnd[i];
        }
        document.getElementById("sum-value").innerText = totalValue.toString();
        document.getElementById("avg-value").innerText = Math.floor(totalValue / obj.rnd.length).toString();
        document.getElementById("sum-rounds").innerText = obj.id.toString();
        document.getElementById("chance").innerText = totalValue.toString();
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

    //TODO: De index van objCount == de index van het getal wat meerdere keren is voorgekomen
    obj.RulesChecker = () => {
        let objCount = obj.checkDuplicated();
        let temp = [];
        let count = 0;
        let ah = [];

        let btns = document.querySelectorAll("td>button");
        let points = document.querySelectorAll("tr>td.variable>p");

        for (const objCountKey in objCount) {
            ah.push(objCount[objCountKey]);
        }

        for (let i = 0; i < obj.rnd.length; i++) {
            temp[i] = obj.rnd[i];
        }

        //zet de array van klein naar groot
        temp.sort((a, b) => {
            return a - b;
        });
        let eerste = temp[0];

        //werkt
        if (ah.includes(2) && ah.includes(3)) {
            console.log("Full house");
            btns[1].removeAttribute("disabled")
        }
        //werkt
        if (ah.includes(3)) {
            console.log("3 of a kind");
        }
        //werkt
        if (ah.includes(4)) {
            console.log("Carre");
        }

        if (ah.includes(5)) {
            console.log("yathzee");
        }

        for (let j = 0; j < obj.rnd.length; j++) {
            while (temp[j] === eerste) {
                eerste++;
                count++;
                //werkt
                if (count === 4) {
                    console.log("Kleine straat");
                }
                //werkt
                if (count === 5) {
                    console.log("Grote straat");
                }
            }
        }
    }

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
