import './App.scss'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/Layout';
import Details from './pages/Details';
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import DeleteAccount from './pages/Settings/DeleteAccount';
import EditAccount from './pages/Settings/EditAccount';
import Settings from './pages/Settings';
import Favorites from './pages/Favorites';
import PrivateRoutes from './components/PrivateRoutes/index';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="details/:type/:id" element={<Details />} />
        <Route path="signup" element={<CreateAccount />} />
        <Route path="login" element={<Login />} />

        <Route element={<PrivateRoutes />}>
          <Route path="favorites" element={<Favorites />} />

          <Route path="settings/" element={<Settings />}>
            <Route path="delete" element={<DeleteAccount />} />
            <Route path="edit" element={<EditAccount />} />
          </Route>
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App
