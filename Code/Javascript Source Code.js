function TimeDisplay () {
    if (State == ActiveState) {
        if (min < 10) {
            basic.showString("" + hour + ":0" + ("" + min) + AMPM, 80)
        } else {
            basic.showString("" + hour + ":" + ("" + min) + AMPM, 80)
        }
    } else if (State == AdjustState) {
        if (AdjustState == AdjustState_Hour) {
            basic.showString(hour + "Hours," + AMPM, 80)
        } else if (AdjustState == AdjustState_Min) {
            basic.showString(min + "Mins ", 80)
        }
    }
}
function ClockRunning () {
    if (TIME_NOW < RUN_TIME - 4000) {
        TIME_NOW = RUN_TIME
        sec += 4
        TimeChecker()
        TimeDisplay()
    }
}
function AlertChecker () {
    let Distance = 0
    if (Distance >= 60 && Distance <= 70) {
        basic.showIcon(IconNames.No)
        Alert = 1
    } else {
        if (Alert == 1) {
            Alert = 0
            basic.clearScreen()
        }
    }
}
input.onButtonPressed(Button.A, function () {
    if (State == ActiveState) {
    	
    } else if (State == AdjustState) {
        if (AdjustState == AdjustState_Hour) {
            min = 60
        } else if (AdjustState == AdjustState_Min) {
            min += 1
        }
    }
})
function DefultTime () {
    hour = 12
    min = 0
    sec = -4
}
function TimeChecker () {
    if (sec >= 60) {
        min += 1
        sec = 0
    }
    if (min >= 60) {
        min = 0
        hour += 1
        if (hour == 12) {
            DefultTime()
            if (AMPM == AM) {
                AMPM = PM
            } else if (AMPM == PM) {
                AMPM = AM
            }
        } else if (hour > 12) {
            hour = 1
        }
    }
}
input.onButtonPressed(Button.AB, function () {
    if (State == ActiveState) {
        AdjustState = AdjustState_Hour
        State = AdjustState
    } else if (State == AdjustState) {
        State = ActiveState
    }
})
function CentralControl () {
    while (true) {
        RUN_TIME = input.runningTime()
        ClockRunning()
    }
}
input.onButtonPressed(Button.B, function () {
    if (AdjustState == AdjustState_Hour) {
        State = AdjustState_Min
        AdjustState = AdjustState_Min
    } else if (AdjustState == AdjustState_Min) {
        State = AdjustState_Hour
        AdjustState = AdjustState_Hour
    }
})
let hour = 0
let Alert = 0
let sec = 0
let RUN_TIME = 0
let TIME_NOW = 0
let min = 0
let AdjustState_Hour = ""
let AdjustState_Min = ""
let State = ""
let AdjustState = ""
let ActiveState = ""
let AMPM = ""
let PM = ""
let AM = ""
DefultTime()
AM = "AM"
PM = "PM"
AMPM = AM
ActiveState = "ACT"
AdjustState = "ADJ"
State = ActiveState
AdjustState_Min = "ADJ-MN"
AdjustState_Hour = "ADJ-HR"
CentralControl()
