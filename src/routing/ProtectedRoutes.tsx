import { useAuth } from "@/context/auth-context";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const { user } = useAuth();

  if (!user) {
    // user is not authenticated
    return <Navigate to="/giris" />;
  }
  return children;
};

export default ProtectedRoute;
