function getRandomNumbers() {
    let arr = [];
    for (let i = 0; i < 5; i++) {
        let result = Math.floor(Math.random() * 10);

        while (result > 6 || result === 0) {
            result =  Math.floor(Math.random() * 10);
        }
        arr[i] = result;
        console.log(arr[i]);
    }
}