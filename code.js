let radio_group = 0
let send_instruction = 0
let set_radio_group = 0
let mode = 0
input.onButtonPressed(Button.B, () => {
    if (mode == 1) {
        set_radio_group = radio_group
        radio.setGroup(set_radio_group)
    } else if (mode == 2) {
        radio.sendNumber(send_instruction)
    }
})
input.onButtonPressed(Button.A, () => {
    if (mode == 1) {
        if (radio_group < 10) {
            radio_group = radio_group + 1
        } else {
            radio_group = 1
        }
        show_radio_group()
    } else if (mode == 2) {
        if (send_instruction < 4) {
            send_instruction = send_instruction + 1
        } else {
            send_instruction = 1
        }
        show_send_instruction()
    }
})
radio.onDataPacketReceived( ({ receivedNumber }) =>  {
    if (mode == 3) {
        send_instruction = receivedNumber
    }
    show_send_instruction()
})
input.onPinPressed(TouchPin.P1, () => {
    if (mode < 3) {
        mode = mode + 1
    } else {
        mode = 1
    }
    show_mode()
})
function show_send_instruction()  {
    if (send_instruction == 1) {
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    } else if (send_instruction == 2) {
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
    } else if (send_instruction == 3) {
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
    } else if (send_instruction == 4) {
        basic.showLeds(`
            . # # . .
            # . . # .
            # . . # .
            # . # # #
            # . . # .
            `)
    }
    if (mode == 3) {
        basic.pause(1000)
        basic.clearScreen()
    }
}
function show_radio_group()  {
    if (radio_group > 0) {
        basic.showString("" + radio_group + "")
    }
}
function show_mode()  {
    if (mode == 1) {
        radio_group = set_radio_group
        basic.showLeds(`
            # . . . #
            . . # . .
            . # . # .
            . . # . .
            # . . . #
            `)
        basic.pause(500)
        show_radio_group()
    } else if (mode == 2) {
        basic.showLeds(`
            . . # . .
            . # . # .
            # # # # #
            . . . . .
            # # # # #
            `)
    } else if (mode == 3) {
        basic.showLeds(`
            # # # # #
            . # . # .
            . . # . .
            . . . . .
            # # # # #
            `)
    }
}
mode = 1
send_instruction = 4
radio_group = 0
show_mode()
