enum RadioMessage {
    message1 = 49434
}
radio.onReceivedValue(function (name, value) {
    if (!(isConnected)) {
        // Returned from the new host when the connectionNum has been guessed
        if (value == 69) {
            isConnected = 1
        }
        // Sends the number 69 to other microbit to notify it that the code has been guessed.
        if (value == connectionNum) {
            isConnected = 1
            isServer = 1
            radio.sendValue("connectionCode", 69)
        }
    }
})
// Selects a random number and shows the connection code
function createServer () {
    connectionNum = randint(0, 10)
    basic.showNumber(connectionNum)
    basic.pause(500)
    // Guesses the other microbit connectionNum
    while (!(isConnected)) {
        radio.sendValue("connectionCode", randint(0, 10))
        basic.pause(randint(400, 500))
    }
    basic.showString("Connected!")
}
let isServer = 0
let connectionNum = 0
let isConnected = 0
radio.sendString("")
basic.showNumber(0)
createServer()
// Displays which microbit is the host.
// 0 = Client
// 1 = Host
basic.forever(function () {
    basic.showNumber(isServer)
})
