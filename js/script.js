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


(function date(){
    let date = new Date();
    let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    document.querySelector('.date').innerHTML = day[date.getDay()] + ', ' + month[date.getMonth()] + " " + date.getDate();
})();