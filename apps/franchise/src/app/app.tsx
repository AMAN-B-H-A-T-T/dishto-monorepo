// Uncomment this line to use CSS modules
// import styles from './app.module.css';

import { Login } from './pages/login';
import { RoutesProvider } from './routes/router';

export function App() {
  return <RoutesProvider />;
}

export default App;
