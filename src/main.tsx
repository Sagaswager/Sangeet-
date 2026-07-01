import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Agentation } from 'agentation';

// @ts-ignore
const isDev = import.meta.env.DEV;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {isDev && <Agentation />}
  </StrictMode>,
);
