import { Outlet } from "react-router-dom";
import Header from "../UI/Header";

function AppLayout() {
  return (
    <>
      <nav>
        <Header />
      </nav>
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
}
export default AppLayout;
