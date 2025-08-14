import { Navigate, Outlet } from 'react-router-dom'
import { useAccountStore } from '../../store/useAccountStore'

const PrivateRoutes = () => {
    const {user} = useAccountStore();
    
    return (
        user ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes