const timeSpentEl = document.getElementById('time-spent')
const timerEl = document.getElementById('timer')
const startPauseBtn = document.getElementById('start-pause')
const resetBtn = document.getElementById('reset')
const shortBreakBtn = document.getElementById('short-break')
const longBreakBtn = document.getElementById('long-break')
const trashCanBtn = document.getElementById('trash-can')
const bannerImgEl = document.getElementById('banner-img')
const progress = document.getElementById('progress')

class Time {
    constructor (hours, minutes, seconds) {
        this.initialMinutes = minutes
        this.hours = hours
        this.minutes = minutes
        this.seconds = seconds
        this.time
    }
    
    ResetTime(time) {
        if (time == 0) {
            this.hours = 0
            this.minutes = 0
            this.seconds = 0
        }
        this.hours = 0
        this.minutes = time
        this.seconds = 0
    }
    
    CurrentTime() {
        if (this.seconds < 10) {
            this.time = `${this.hours}:${this.minutes}:0${this.seconds}`
        } else {
            this.time = `${this.hours}:${this.minutes}:${this.seconds}`
        }

        if (this.hours == 0) {
            let index = this.time.indexOf(':')
            this.time = this.time.slice(index+1)
        }
        return this.time
    }

    async TickUp() {
        console.log('Time Spent: ', this.CurrentTime())    
        this.seconds++

        if (this.seconds >= 60) {
            this.minutes++
            this.seconds = 0
        } 
        if (this.minutes >= 60) {
            this.hours++
            this.minutes = 0
        }
    }

    async TickDown() {
        console.log('Countdown: ',this.CurrentTime())
        this.seconds--

        if (this.minutes <= 0 && this.seconds <=0) {
            return;
        } 
        if (this.seconds <= 0) {
            this.minutes--
            this.seconds = 59
        }
    }
}

// Globals
const countdownStart = 30
let countdown = new Time(0,countdownStart,0)
let timeSpent = new Time(0,0,0)
let paused = true
let clicked = false
let onBreak = false

const ResetTime = (countdown) => {
    countdown.ResetTime(countdownStart)
    progress.style.width = '0%'
    countdown.initialMinutes = countdownStart
}

const TickTime = (countdown, timeSpent) => {
    countdown.TickDown()
    timeSpent.TickUp()
}

const StartTimeInterval = (clicked) => {
    if (clicked) {
        return
    }
    setInterval(() => {
        if (!paused) {
            if (countdown.time == '0:00') {
                onBreak = false
                alert('DING DING DING')
                new Notification('DING DING DING')
                paused = true
                return
            }
            TickTime(countdown, timeSpent)
            let currentPercent = (((countdown.initialMinutes * 60) - (countdown.minutes * 60 + countdown.seconds)) / (countdown.initialMinutes * 60) * 100)
            console.log(currentPercent)
            if (currentPercent > 100) {
                progress.style.width = '0%'
            } else {
                progress.style.width = `${currentPercent}%`
            }
            if (onBreak) {
                timeSpent.seconds--
            }
            RefreshDOM()
        }
    }, 1000);
}

const RefreshDOM = () => {
    countdown.CurrentTime() //Update time to the current time 
    timeSpent.CurrentTime()
    timeSpentEl.innerHTML = timeSpent.time
    timerEl.innerHTML = countdown.time
}

// Event Listeners
startPauseBtn.addEventListener('click', () =>  {
    if (startPauseBtn.innerHTML == 'Start') {
        startPauseBtn.innerHTML = 'Pause'
        paused = false
        StartTimeInterval(clicked)
        clicked = true
    } else {
        startPauseBtn.innerHTML = 'Start'
        paused = true
    }
})

resetBtn.addEventListener('click', () => {
    paused = true
    onBreak = false
    ResetTime(countdown)
    startPauseBtn.innerHTML = 'Start'
    RefreshDOM()
})

shortBreakBtn.addEventListener('click', () => {
    paused = true
    onBreak = true
    startPauseBtn.innerHTML = 'Start'
    countdown.hours = 0 
    countdown.minutes = 5
    countdown.seconds = 0
    countdown.initialMinutes = 5
    RefreshDOM()
})

longBreakBtn.addEventListener('click', () => {
    paused = true
    onBreak = true
    startPauseBtn.innerHTML = 'Start'
    countdown.hours = 0 
    countdown.minutes = 15
    countdown.seconds = 0
    countdown.initialMinutes = 15
    RefreshDOM()
})

trashCanBtn.addEventListener('click', () => {
    timeSpent.ResetTime(0)
    RefreshDOM()
})
