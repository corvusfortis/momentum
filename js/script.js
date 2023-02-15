(function clock(){
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if(hours < 10){
        hours = '0' + hours;
    } 
    if(minutes < 10){
        minutes = '0' + minutes;
    } 
    if(seconds < 10) {
        seconds = '0' + seconds;
    }

    document.querySelector('.time').innerHTML = hours + ':' + minutes + ':' + seconds;
    setTimeout(clock, 1000);
})();


(function currentDate(){
    let date = new Date();
    let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    document.querySelector('.date').innerHTML = day[date.getDay()] + ', ' + month[date.getMonth()] + " " + date.getDate();
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
        document.body.style.background = `url("https://raw.githubusercontent.com/corvusfortis/stage1-tasks/assets/images/${folderName}/${num}.webp") center/cover, rgba(0, 0, 0, 0.5)`;
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
        console.log(num);
        document.body.style.background = `url("https://raw.githubusercontent.com/corvusfortis/stage1-tasks/assets/images/${folderName}/${num}.webp") center/cover, rgba(0, 0, 0, 0.5)`;
    });

})();

