import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'
import Login from './components/Login';
import Branding from './components/Branding';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/branding" element={<Branding />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  </Provider>
  );
}

export default App;
