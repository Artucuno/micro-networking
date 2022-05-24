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
// createServer Function
// LED (True/False) - Enable LED light once connected
// group (int) - Set radio group
// min (int) - Set minimum random number
// max (int) - Set maximum random number
// 
function createServer (LED: boolean, group: number, min: number, max: number) {
    radio.setGroup(group)
    radio.setTransmitPower(7)
    connectionNum = randint(min, max)
    basic.showNumber(connectionNum)
    basic.pause(200)
    // Guesses the other microbit connectionNum
    while (!(isConnected)) {
        radio.sendValue("connectionCode", randint(min, max))
        basic.pause(randint(50, 100))
    }
    // Turns on an LED light once connected. Can be used for anything.
    // (Set the write pin)
    if (LED) {
        pins.digitalWritePin(DigitalPin.P0, 1)
    }
    basic.showIcon(IconNames.Yes)
}
// Created by Artucuno#1898
// 
// https://github.com/Artucuno
let isServer = 0
let connectionNum = 0
let isConnected = 0
radio.sendString("")
basic.showNumber(0)
// createServer Function
// LED (True/False) - Enable LED light once connected
// group (int) - Set radio group
// min (int) - Set minimum random number
// max (int) - Set maximum random number
// 
createServer(false, 87, 0, 10)
// Displays which microbit is the host.
// 0 = Client
// 1 = Host
basic.forever(function () {
    basic.showNumber(isServer)
})
