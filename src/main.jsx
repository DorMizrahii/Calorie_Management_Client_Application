// Developers:
// First name: Tal, Dor, Yamit
// Last name: Lilo, Mizrahi, Segev
// ID:   206361321 , 315429175 , 206776486

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { ThemeProvider } from './Components/ThemeProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <ThemeProvider>
        <App />
    </ThemeProvider>
</React.StrictMode>,
)
