import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css'
//import * as  serviceWorker from './serviceWorker'

console.log('%cTodo app with react', 'font-size:30px;padding:10px;background-color:#daae51;color:black;')
console.log('%cMade by Zsolt Boda', 'font-size:18px;padding:10px;background-color:#d53369;color:white;')

ReactDOM.render(<App />, document.getElementById('root'));

//serviceWorker.register();


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('Service worker registered'))
        .catch(err => console.log('Service worker not registered', err));
}