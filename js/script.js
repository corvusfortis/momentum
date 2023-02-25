
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
    // let currentDate;

    function setDateFormat(language){
        if(language === 'en'){
            return date.toLocaleDateString('en-Br', options);
        }else if (language === 'ru'){
            return date.toLocaleDateString('ru-RU', options);
        }
    }
       

 
    
    document.querySelector('.date').textContent = setDateFormat(document.querySelector('html').lang);

    setTimeout(currentDate, 1000);
})();

(function greeting(language){

    let translations = {
        en: ['Good morning', 'Good afternoon', 'Good evening', 'Good night'],
        ru: ['Доброе утро', 'Добрый день', 'Добрый вечер', 'Доброй ночи']
    }

    let lang = document.querySelector('html').lang;

    function setGreetLanguage(language, index){
 
        return translations[language][index];
    }

    let timeOfDay = '';
    let date = new Date();
    let hours = date.getHours();



    if(hours >= 6 && hours < 12){
        timeOfDay = setGreetLanguage(lang, 0);
    }else if(hours >= 12 && hours < 18){
        timeOfDay = setGreetLanguage(lang, 1);
    }else if(hours >= 18 && hours < 23){
        timeOfDay = setGreetLanguage(lang, 2);
    }else{
        timeOfDay = setGreetLanguage(lang, 3)
    }


    document.querySelector('.greeting').innerHTML = timeOfDay + ',';
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
    //let apiLink =`https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=er_pOxcxGva0a90iDtrOi3SzJH2noI7KeYrQFdyH-HE`;
    let num = Math.floor(Math.random() * (21 - 1)) + 1;


    let timeOfDay = document.querySelector('.greeting').innerHTML;
    let folderName = '';
    switch(timeOfDay){
        case 'Good morning,':
        case 'Доброе утро,':
            folderName = 'morning';
            break;
        case 'Good afternoon,':
        case 'Добрый день,':
            folderName = 'afternoon';
            break;
        case 'Good evening,':
        case 'Добрый вечер,':
            folderName = 'evening';
            break;
        case 'Good night,':
        case 'Доброй ночи,':
            folderName = 'night';
            break;
    }

    async function getLinkToImage() {
        const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${folderName}&client_id=er_pOxcxGva0a90iDtrOi3SzJH2noI7KeYrQFdyH-HE`;
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data.urls.regular);
        console.log(data.urls.regular);

        let img = new Image();
        img.src = data.urls.regular;
        img.onload = () => {
            // document.body.style.backgroundImage = `url("https://raw.githubusercontent.com/corvusfortis/stage1-tasks/assets/images/${folderName}/${num}.webp")`;
            document.body.style.backgroundImage = `url(${data.urls.regular})`;
        }
       }

       window.addEventListener('load', getLinkToImage);
       document.querySelector('.slider-icons').addEventListener('click', getLinkToImage);
    
    // window.addEventListener('load', function(){
    //     num < 10 ? num = '0' + num : num;
    //     let img = new Image();
    //     // img.src = `https://raw.githubusercontent.com/corvusfortis/stage1-tasks/assets/images/${folderName}/${num}.webp`;
    //     img.src = getLinkToImage;
    //     img.onload = () => {
    //         // document.body.style.backgroundImage = `url("https://raw.githubusercontent.com/corvusfortis/stage1-tasks/assets/images/${folderName}/${num}.webp")`;
    //         document.body.style.backgroundImage = `url(${getLinkToImage})`;
    //     }
    // });


//     document.querySelector('.slider-icons').addEventListener('click', function(event){
//             switch(event.target){
//                 case document.querySelector('.slide-prev'):
//                     num--;
//                     break;
//                 case document.querySelector('.slide-next'):
//                     num++;
//                     break;
//             }

//             if(num < 1){
//                 num = 20;
//             }else if(num > 20){
//                 num = 1;
//             }

//         num < 10 ? num = '0' + num : num;
//         let img = new Image();
//         img.src = `https://raw.githubusercontent.com/corvusfortis/stage1-tasks/assets/images/${folderName}/${num}.webp`;
//         img.onload = () => {
//             document.body.style.backgroundImage = `url("https://raw.githubusercontent.com/corvusfortis/stage1-tasks/assets/images/${folderName}/${num}.webp")`;
//         }
//     });

})();

(function weather(){
    const weatherIcon = document.querySelector('.weather-icon');
    const temperature = document.querySelector('.temperature');
    const weatherDescription = document.querySelector('.weather-description');
    const wind = document.querySelector('.wind');
    const humidity = document.querySelector('.humidity');
    const city = document.querySelector('.city');
    

    async function getWeather(lang) {  
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
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
      getWeather(document.querySelector('html').lang)

     window.addEventListener('DOMContentLoaded', function(){
         city.value = localStorage.getItem('city');
         getWeather(document.querySelector('html').lang);
     });

     city.addEventListener('blur', getWeather);
     city.addEventListener('keypress', function(event){
         if(event.key === 'Enter'){
             getWeather(document.querySelector('html').lang);
         }
     })

     setTimeout(weather, 1000);
     
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
    const audioSlider = document.querySelector('.audio-slider');
    const totalTime = document.querySelector(".total-time");
    const currentProgress = document.querySelector('.current-time');
    const volumeSlider = document.querySelector('.volume-slider');

    let playNum = 0;
    let isPlay = false;
    let trackList = document.querySelector('.play-list');
    let timeTemp = 0;

    

    for(let i = 0; i < playlist.length; i++){
        let newLi = trackList.appendChild(document.createElement('li'));
        newLi.innerHTML = playlist[i].title;
        // + ' ' + playlist[i].duration;
        newLi.classList.add("play-item")
        newLi.addEventListener('click', playAudio);
    }

    let playItems = document.querySelectorAll('.play-item');

    function playAudio(event) {

    if(event.target === playNext){
        playNum++;
        isPlay = false;
        playBtn.classList.remove('pause');
        timeTemp = 0;
    }else if(event.target === playPrev){
        playNum--;
        isPlay = false;
        playBtn.classList.remove('pause');
        timeTemp = 0;
    }

    if(playNum < 0){
        playNum = playlist.length - 1;
    }else if(playNum >= playlist.length){
        playNum = 0;
    }

    playItems.forEach((item, index) => {
        if(event.target === item){
            audio.currentTime = 0;
            isPlay = false;
            playNum = index;
        }
    })
    
    if(isPlay){
        audio.pause();
        timeTemp = audio.currentTime;
    }else{
        for(let item of playItems){
            item.classList.remove('item-active');
        }
        playItems[playNum].classList.add('item-active');
        audio.src = playlist[playNum].src; // ссылка на аудио-файл;
        document.querySelector('.track-name').textContent = playlist[playNum].title;
        audio.currentTime = timeTemp;
        audio.play();

        setInterval(updateProgressValue, 500);
        
    }
        isPlay = !isPlay;
        playBtn.classList.toggle('pause');
    }

    function updateProgressValue() {
        audioSlider.max = audio.duration;
        audioSlider.value = audio.currentTime;
        currentProgress.innerHTML = (formatTime(Math.floor(audio.currentTime)));
        if (totalTime.innerHTML === "NaN:NaN") {
            totalTime.innerHTML = "0:00";
        } else {
            totalTime.innerHTML = (formatTime(Math.floor(audio.duration)));
        }
    };

    function formatTime(seconds) {
        let min = Math.floor((seconds / 60));
        let sec = Math.floor(seconds - (min * 60));
        if (sec < 10){ 
            sec  = `0${sec}`;
        };
        return `${min}:${sec}`;
    };

    

    function changeProgressBar() {
        audio.currentTime = audioSlider.value;
        timeTemp = audio.currentTime;
    };

    function changeVolume(event){
        audio.volume = event.target.value / 100;
    }

    playBtn.addEventListener('click', playAudio);
    playNext.addEventListener('click', playAudio);
    playPrev.addEventListener('click', playAudio);
    audio.addEventListener('ended', function(){
        playNext.click();
    });
    audioSlider.addEventListener('change', changeProgressBar);
    volumeSlider.addEventListener('change', changeVolume);

})();


(function setLang(){
    const pageLang = document.querySelector('.page-lang');
    let currentLang = document.querySelector('html').lang;

    pageLang.addEventListener('click', function(){
        if(document.querySelector('html').lang === 'en'){
            document.querySelector('html').lang = 'ru';

        }else if(document.querySelector('html').lang === 'ru'){
            document.querySelector('html').lang = 'en';
   
        }
    })
       
    
})();

