/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as Tooltip from '@radix-ui/react-tooltip';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Tooltip.Provider>
    <App />
  </Tooltip.Provider>,
);
