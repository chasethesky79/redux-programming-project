import { createStore } from 'redux';

function tubeLight(state = 'OFF', action){
    switch(action.type) {
        case 'TURN_ON':
          return 'ON';
        case 'TURN_OFF':
          return 'OFF';
        default:
            return state;
    }
}

const store = createStore(tubeLight);
console.log(`Initially tubelight is ${store.getState()}`);

store.dispatch({ type: 'TURN_ON' });
console.log(`Now tubelight is now ${store.getState()}`);

const button = document.createElement('button');
button.setAttribute('id', 'lightButton');
const text = document.createTextNode('Toggle Light');
button.appendChild(text);

const render = () => {
    document.body.innerText = store.getState();
    document.body.appendChild(button)
};
render();
document.getElementById('lightButton').addEventListener('click', () => {
    if (store.getState() === 'ON') {
        store.dispatch({ type: 'TURN_OFF'});
    } else {
        store.dispatch({ type: 'TURN_ON'})
    }
});
store.subscribe(render);
