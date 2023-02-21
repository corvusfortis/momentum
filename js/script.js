
    import playlist from './playlist.js';

// (function clock(){
//     let date = new Date();
//     let hours = date.getHours();
//     let minutes = date.getMinutes();
//     let seconds = date.getSeconds();

//     if(hours < 10){
//         hours = '0' + hours;
//     } 
//     if(minutes < 10){
//         minutes = '0' + minutes;
//     } 
//     if(seconds < 10) {
//         seconds = '0' + seconds;
//     }

//     document.querySelector('.time').innerHTML = hours + ':' + minutes + ':' + seconds;
//     setTimeout(clock, 1000);
// })();


// (function currentDate(){
//     let date = new Date();
//     let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//     document.querySelector('.date').innerHTML = day[date.getDay()] + ', ' + month[date.getMonth()] + " " + date.getDate();
//     setTimeout(currentDate, 1000);
// })();

(function currentTime(){
        let time = document.querySelector('.time');
        let date = new Date();
        time.textContent = date.toLocaleTimeString();

        setTimeout(currentTime, 1000);

})();

(function currentDate(){
    const date = new Date();
    const options = {month: 'long', weekday: 'long', day: 'numeric', timeZone: 'UTC'};
    const currentDate = date.toLocaleDateString('en-Br', options);
    
    document.querySelector('.date').textContent = currentDate;

    setTimeout(currentDate, 1000);
})();

(function greeting(){
    let timeOfDay = '';
    let date = new Date();
    let hours = date.getHours();

    if(hours >= 6 && hours < 12){
        timeOfDay = 'morning';
    }else if(hours >= 12 && hours < 18){
        timeOfDay = 'afternoon';
    }else if(hours >= 18){
        timeOfDay = 'evening';
    }else{
        timeOfDay = 'night'
    }


    document.querySelector('.greeting').innerHTML = 'Good ' + timeOfDay + ',';
    setTimeout(greeting, 1000);
})();

(function saveName(){
    let name = document.querySelector('.name');
    window.addEventListener('unload', function(){
        localStorage.setItem('name', name.value);
    })
    window.addEventListener('DOMContentLoaded', function(){
        name.value = localStorage.getItem('name');
    })
})();

//slider start

(function slider(){
    let num = Math.floor(Math.random() * (21 - 1)) + 1;


    let timeOfDay = document.querySelector('.greeting').innerHTML;
    let folderName = '';
    switch(timeOfDay){
        case 'Good morning,':
            folderName = 'morning';
            break;
        case 'Good afternoon,':
            folderName = 'afternoon';
            break;
        case 'Good evening,':
            folderName = 'evening';
            break;
        case 'Good night,':
            folderName = 'night';
            break;
    }

       

    

    window.addEventListener('load', function(){
        num < 10 ? num = '0' + num : num;
        let img = new Image();
        img.src = `https://raw.githubusercontent.com/corvusfortis/stage1-tasks/assets/images/${folderName}/${num}.webp`;
        img.onload = () => {
            document.body.style.backgroundImage = `url("https://raw.githubusercontent.com/corvusfortis/stage1-tasks/assets/images/${folderName}/${num}.webp")`;
        }
    });

    document.querySelector('.slider-icons').addEventListener('click', function(event){
            switch(event.target){
                case document.querySelector('.slide-prev'):
                    num--;
                    break;
                case document.querySelector('.slide-next'):
                    num++;
                    break;
            }

            if(num < 1){
                num = 20;
            }else if(num > 20){
                num = 1;
            }

        num < 10 ? num = '0' + num : num;
        let img = new Image();
        img.src = `https://raw.githubusercontent.com/corvusfortis/stage1-tasks/assets/images/${folderName}/${num}.webp`;
        img.onload = () => {
            document.body.style.backgroundImage = `url("https://raw.githubusercontent.com/corvusfortis/stage1-tasks/assets/images/${folderName}/${num}.webp")`;
        }
    });

})();

(function weather(){
    const weatherIcon = document.querySelector('.weather-icon');
    const temperature = document.querySelector('.temperature');
    const weatherDescription = document.querySelector('.weather-description');
    const wind = document.querySelector('.wind');
    const humidity = document.querySelector('.humidity');
    const city = document.querySelector('.city');

    async function getWeather() {  
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
        const res = await fetch(url);
        const data = await res.json(); 

        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.floor(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;

        localStorage.setItem('city', city.value);
      }
      getWeather()

     window.addEventListener('DOMContentLoaded', function(){
         city.value = localStorage.getItem('city');
         getWeather();
     });

     city.addEventListener('blur', getWeather);
     city.addEventListener('keypress', function(event){
         if(event.key === 'Enter'){
             getWeather();
         }
     })

     
})();

(function quoteApp(){
    let quote = document.querySelector('.quote');
    let author = document.querySelector('.author');

    async function getQuotes() {  
        const quotes = 'js/data.json';
        const res = await fetch(quotes);
        const data = await res.json(); 
        
        let num = Math.floor(Math.random() * (data.length + 1));

        quote.textContent = data[num].text;
        author.textContent = data[num].author;
        
      }
      getQuotes();

      document.querySelector('.change-quote').addEventListener('click', getQuotes);

})();

(function player(){

    const audio = new Audio();
    const playBtn = document.querySelector('.play');
    const playNext = document.querySelector('.play-next');
    const playPrev = document.querySelector('.play-prev');
    let playNum = 0;
    let isPlay = false;
    let trackList = document.querySelector('.play-list');

    for(let i = 0; i < playlist.length; i++){
        let newLi = trackList.appendChild(document.createElement('li'));
        newLi.innerHTML = playlist[i].title + ' ' + playlist[i].duration;
        newLi.classList.add("play-item")
    }

    let playItems = document.querySelectorAll('.play-item');

    function playAudio(event) {

    if(event.target === playNext){
        playNum++;
        isPlay = false;
        playBtn.classList.remove('pause');
    }else if(event.target === playPrev){
        playNum--;
        isPlay = false;
        playBtn.classList.remove('pause');
    }

    if(playNum < 0){
        playNum = playlist.length - 1;
    }else if(playNum >= playlist.length){
        playNum = 0;
    }
    
    if(isPlay){
        audio.pause();
    }else{
        for(let item of playItems){
            item.classList.remove('item-active');
        }
        playItems[playNum].classList.add('item-active');
        audio.src = playlist[playNum].src; // ссылка на аудио-файл;
        // audio.currentTime = 0;
        audio.play();
    }
        isPlay = !isPlay;
        playBtn.classList.toggle('pause');
    }

    playBtn.addEventListener('click', playAudio);
    playNext.addEventListener('click', playAudio);
    playPrev.addEventListener('click', playAudio);
    audio.addEventListener('ended', function(){
        playNext.click();
    })

})();