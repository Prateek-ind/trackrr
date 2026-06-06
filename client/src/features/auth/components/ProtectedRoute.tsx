import { Navigate } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import Loading from "@/features/shared/components/Loading"

const ProtectedRoute = ({children}: {children: React.ReactNode})=>{

    const   { isAuthenticated, isLoading} = useAuth()

    if(isLoading) return <Loading/>

    if(!isAuthenticated){
        return <Navigate to={"/login"} replace />
    }

    return children
}

export default ProtectedRoute