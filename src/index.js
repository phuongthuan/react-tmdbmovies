import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import fontawesome from '@fortawesome/fontawesome'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faArrowRight from '@fortawesome/fontawesome-free-solid/faArrowAltCircleRight';
import faArrowLeft from '@fortawesome/fontawesome-free-solid/faArrowAltCircleLeft';


import App from './app/App';
import registerServiceWorker from './registerServiceWorker';

fontawesome.library.add(faSearch, faArrowRight, faArrowLeft);
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();
