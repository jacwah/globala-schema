// Browser modules are imported through new ES6 syntax.
//import loadSchedule from './schedule_loader/loader.js';

// window.env contains data from config/env_XXX.json file.
var envName = window.env.name;

const url = 'http://www.novasoftware.se/ImgGen/schedulegenerator.aspx?format=png&schoolid=29120/sv-se&type=-1&id=es13a&period=&week=38&mode=0&printer=0&colors=32&head=0&clock=0&foot=0&day=0&width=1222&height=415&maxwidth=1222&maxheight=415';

document.getElementById('schedule-img').src = url;

console.log("hi!");
