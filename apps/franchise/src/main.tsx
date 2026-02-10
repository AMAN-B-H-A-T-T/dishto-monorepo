import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import './styles.css';
import { TokenProvider } from './app/contexts/TokenContext';
import { ApiProvider } from './app/contexts/ApiContext';
import { AuthProvider } from './app/contexts/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <TokenProvider>
      <ApiProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ApiProvider>
    </TokenProvider>
  </BrowserRouter>
);
