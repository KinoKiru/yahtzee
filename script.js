const Yahtzee = () => {

    //local scoped variables
    let obj = {};
    //keeps the random numbers
    obj.rnd = [];
    //keeps the numbers which the user want locked
    obj.dis = [];

    //generates random numbers
    obj.getRandomNumbers = (imgAmount) => {
        obj.rnd = [];

        if (obj.dis.length !== 0){
            obj.rnd = obj.dis;
            console.log(obj.rnd)
            console.log(obj.dis)
            for (let i = obj.dis.length; i < imgAmount; i++) {
                let result = Math.floor(Math.random() * 10);
                while (result > 6 || result === 0) {
                    result = Math.floor(Math.random() * 10);
                }
                obj.rnd[i] = result;
            }
        }else {
            for (let i = 0; i < imgAmount; i++) {
                let result = Math.floor(Math.random() * 10);
                while (result > 6 || result === 0) {
                    result = Math.floor(Math.random() * 10);
                }
                obj.rnd[i] = result;
            }
        }
        return obj.rnd
    }

    //makes the new img takes based on the amount given
    obj.makeImgTags = (amount) => {
        if (document.querySelectorAll("div>input").length >= amount) {
        } else {
            let id = document.getElementById("fotoCollection")
            for (let i = 0; i < amount; i++) {
                let input = document.createElement("input");
                id.appendChild(input);
            }
        }
        obj.fillImgTags();
    }

    //fills the inputs with the correct attributes
    obj.fillImgTags = () => {
        let inputs = document.querySelectorAll("div>input");
        let arr = obj.getRandomNumbers(inputs.length);
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].setAttribute("src", `img/dice_${obj.rnd[i]}.jpg`);
            inputs[i].setAttribute("type", "image");
            inputs[i].setAttribute("onclick", `objYathzee.setDisabled(${i})`);
            inputs[i].setAttribute("value",`${i}`);
        }
        console.log(obj.rnd + "\r\n --------------");
        obj.returnTotalValue();
    }

    obj.returnTotalValue = () => {
        let totalValue = 0;
        for (let i = 0; i < obj.rnd.length; i++) {
            totalValue += obj.rnd[i];
        }
        let value = document.getElementById("sum-value").innerText = totalValue.toString();
        let gemmideld = document.getElementById("avg-value").innerText = Math.floor(totalValue / obj.rnd.length).toString();
        console.log(obj.RulesChecker());
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
        if (obj.rnd.includes([1,2,3,4]) || obj.rnd.includes([2,3,4,5]) || obj.rnd.includes([3,4,5,6])){
            console.log("Kleine straat");
        }
        if (obj.rnd.includes([1,2,3,4,5]) || obj.rnd.includes([2,3,4,5,6])){
            console.log("Groote straat")
        }

    }

    //TODO de eerste keer doet hij het wel na de tweede keer niet meer
    obj.setDisabled = (value) => {
      obj.dis.push(obj.rnd[value]);

      for (let i = 0; i < obj.rnd.length; i++){
          let btn = document.querySelectorAll("input")[i];
          if (btn.value === value){
              btn.disabled = true;
          }
      }
        console.log(obj.dis);

    }
    return obj;
}


let objYathzee = Yahtzee();
