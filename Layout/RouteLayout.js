import { Outlet } from "react-router-dom";

const RouteLayout = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default RouteLayout;
