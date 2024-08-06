import './patch-local-storage-for-github-pages';

import React, {StrictMode} from 'react'
import { render } from 'react-dom';
import App from './App'
import './index.scss'
import eruda from "eruda";
import axios from 'axios';


eruda.init();

render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById('root') as HTMLElement
)
