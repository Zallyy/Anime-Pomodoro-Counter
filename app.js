const timeSpentEl = document.getElementById('time-spent')
const timerEl = document.getElementById('timer')
const startPauseBtn = document.getElementById('start-pause')
const resetBtn = document.getElementById('reset')
const bannerImgEl = document.getElementById('banner-img')

class Time {
    constructor (hours, minutes, seconds) {
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
let countdown = new Time(0,30,0)
let timeSpent = new Time(0,0,0)
let paused = true
let clicked = false

const ResetTime = (countdown, timeSpent) => {
    countdown.ResetTime(30)
    timeSpent.ResetTime(0)
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
            TickTime(countdown, timeSpent)
            RefreshDOM()
        }
    }, 1000);
}

const RefreshDOM = () => {
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
    ResetTime(countdown, timeSpent)
    startPauseBtn.innerHTML = 'Start'
    RefreshDOM()
})
