import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <main id="auth_root" className="h-screen">
      <Outlet />
    </main>
  );
}

export default AuthLayout;
