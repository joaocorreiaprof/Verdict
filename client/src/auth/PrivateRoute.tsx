import { Route, Navigate } from "react-router-dom";

interface PrivateRouteProps {
  component: React.ComponentType<React.PropsWithChildren<object>>;
  path?: string;
  exact?: boolean;
  strict?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? <Component /> : <Navigate to="/login" replace />
      }
    />
  );
};

export default PrivateRoute;
