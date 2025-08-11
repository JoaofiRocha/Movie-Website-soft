import './App.scss'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/Layout';
import Details from './pages/Details';
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="details/:type/:id" element={<Details />}/>
        <Route path="signup" element={<CreateAccount />}/>
        <Route path="login" element={<Login/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Route>
    </Routes>
  );
}

export default App
