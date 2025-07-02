import { useAuth } from "@/context/auth-context";
import { Navigate } from "react-router-dom";

function AuthRoutes({ children }: any) {
  const { user } = useAuth();

  if (user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }

  return children;
}

export default AuthRoutes;
