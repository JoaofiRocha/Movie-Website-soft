import './App.scss'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/Layout';
import Details from './pages/Details';
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="details/:type/:id" element={<Details />}/>
        <Route path="signup" element={<CreateAccount />}/>
        <Route path="login" element={<Login/>}/>
      </Route>
    </Routes>
  );
}

export default App
