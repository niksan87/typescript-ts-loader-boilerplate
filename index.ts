import { Engine, hot } from 'src';

window.onload = () => {
    Engine.activate();
    Engine.run();
};

if (typeof module.hot !== 'undefined') module.hot.accept('./src', hot);
