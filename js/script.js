function start() {
    createBoard(),
        showUserTime()
}
let tabuleiro = document.getElementById("tabuleiro");
const buttonInicio = document.getElementById("buttonInicio"),
    result = document.getElementById("result"),
    cardBack = "./images/baixados.jfif";
let cards = [
    { id: "Alice0", order: 0, value: "Alice", path: "./images/Alice.jpg" },
    { id: "Megadeth0", order: 10, value: "Megadeth", path: "./images/Megadeth.jpg" },
    { id: "Anthrax0", order: 2, value: "Anthrax", path: "./images/Anthrax.jpg" },
    { id: "BlackSabbath0", order: 4, value: "js", path: "./images/BlackSabbath.jpg" },
    { id: "Pantera0", order: 12, value: "Pantera", path: "./images/Pantera.jpg" },
    { id: "Ghost0", order: 6, value: "Ghost", path: "./images/Ghost.jpg" },
    { id: "Alice1", order: 1, value: "Alice", path: "./images/Alice.jpg" },
    { id: "Ghost1", order: 7, value: "Ghost", path: "./images/Ghost.jpg" },
    { id: "Gojira0", order: 8, value: "Gojira", path: "./images/Gojira.jpg" },
    { id: "Anthrax1", order: 3, value: "Anthrax", path: "./images/Anthrax.jpg" },
    { id: "Slayer0", order: 14, value: "Slayer", path: "./images/Slayer.jpg" },
    { id: "Megadeth1", order: 11, value: "Megadeth", path: "./images/Megadeth.jpg" },
    { id: "Gojira1", order: 9, value: "Gojira", path: "./images/Gojira.jpg" },
    { id: "Pantera1", order: 13, value: "Pantera", path: "./images/Pantera.jpg" },
    { id: "BlackSabbath1", order: 5, value: "js", path: "./images/BlackSabbath.jpg" },
    { id: "Slayer1", order: 15, value: "Slayer", path: "./images/Slayer.jpg" },
],
    choosedCards = [],
    cardValues = [],
    pairs = [],
    firstCard,
    secondCard,
    startTime,
    endTime,
    storage = window.localStorage,
    times = []; 
    
    function createBoard() {
        for (card of cards) 
        tabuleiro.innerHTML += `              
                    <div class="flip-card">
                        <div class="flip-card-inner" id="${card.id}" onclick="checkCard(${card.id}, '${card.value}')">
                            <div class="card-front">
                                <img src="${card.path}"> 
                            </div>
                            <div class="card-back">
                                <img id="cardBack" src="./images/baixados.jfif">
                            </div>
                        </div>
                    </div>                   
                `; disableAllCards()
    }
    
function startGame() {
    startTime = new Date,
        tabuleiro.innerHTML = "",
        buttonInicio.disabled = !0,
        cards = shuffle(cards),
        createBoard(),
        setTimeout(
            function () {
                for (card of cards)
                    flip(card);
                enableAllCards()
            }, 1500)
}
const shuffle = a => (a.sort(function () {
    return .5 - Math.random()
}),
    a), flip = a => {
        document.getElementById(`${a.id}`).classList.add("flip")
    },
    unFlip = a => {
        document.getElementById(`${a.id}`).classList.remove("flip")
    },
    checkCard = (a, b) => {
        switch (choosedCards.push(a), cardValues.push(b), choosedCards.length) {
            case 1: unFlip(firstCard = choosedCards[0]);
                break;
            case 2: unFlip(secondCard = choosedCards[1]),
                disableCard(firstCard, secondCard),
                cardValues[0] == cardValues[1] ? (pairs.push(firstCard, secondCard),
                    setTimeout(function () {
                        enableAllCards(),
                        disableCorrectPairs()
                    }, 1500)) : setTimeout(function () {
                        shakeCard(firstCard),
                            shakeCard(secondCard),
                            flip(firstCard),
                            flip(secondCard),
                            enableAllCards(),
                            disableCorrectPairs()
                    }, 1500),
                removeShakeCard(firstCard),
                removeShakeCard(secondCard),
                cardValues = [],
                choosedCards = []
        }
        setTimeout(function () {
            gameOver() && (endTime = new Date,
                swal({
                    title: "Gameover!",
                    text: `Tempo: ${endTime - startTime}`,
                    icon: "success",
                    button: "ok"
                }),
                saveUserTime(),
                showUserTime(),
                resetGame())
        }, 1500)
    },
    shakeCard = a => {
        document.getElementById(`${a.id}`).classList.add("shakeCard")
    },
    removeShakeCard = a => {
        document.getElementById(`${a.id}`).classList.remove("shakeCard")
    },
    disableCorrectPairs = () => {
        for (card of pairs) document.getElementById(`${card.id}`).classList.add("disabledCard")
    },
    enableAllCards = () => {
        for (card of cards) document.getElementById(`${card.id}`).classList.remove("disabledCard")
    },
    disableAllCards = () => {
        for (card of cards) document.getElementById(`${card.id}`).classList.add("disabledCard")
    },
    disableCard = (a, b) => {
        for (card of cards) card.id != a.id && card.id != b.id && document.getElementById(`${card.id}`).classList.add("disabledCard")
    },
    gameOver = () => pairs.length == cards.length,
    resetGame = () => {
        for (card of (pairs = [], cards)) card = cards.sort(function (a, b) { return a.order - b.order });
        tabuleiro.innerHTML = "",
            createBoard(),
            buttonInicio.disabled = !1
    },
    saveUserTime = () => {
        let a = endTime - startTime; times.push(a), storage.setItem("times", JSON.stringify(times))
    },
    showUserTime = () => {
        if (localStorage.times) {
            times = JSON.parse(storage.getItem("times"));
            for (let a = 0; a <= times.length; a++)times.sort(function (a, b) {
                return a - b
            });
            result.innerHTML = `Melhor tempo: ${times[0]}`
        }
    }