const themes = [
    {
        color: '#8683da',
        image: './images/Rena.jpg',
    },
    {
        color: '#6c619d',
        image: './images/Rika.jpg',
    }
]

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changeTheme(theme) {
    trashCanBot.style.background = themes[theme].color
    trashCanTop.style.background = themes[theme].color
    startPauseBtn.style.background = themes[theme].color
    progress.style.background = themes[theme].color
    bannerImgEl.src = themes[theme].image
    bannerContainer.style.borderColor = themes[theme].color
    titleEl.style.background = themes[theme].color;
    titleEl.style.color = '#f3f3f3';
    // timerEl.style.color = themes[theme].color
    // document.body.style.background = `url('${themes[theme].background}')`
    // document.body.style.background = themes[theme].background
}

changeTheme(getRandomInt(0, themes.length-1))