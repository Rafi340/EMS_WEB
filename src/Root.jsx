import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
export default function Root() {
  return (
    <>
      <App />
      <div id="detail">
        <main className="relative mx-auto mt-10 w-full max-w-7xl">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Outlet />
          </section>
        </main>
      </div>
      <ToastContainer />
    </>
  );
}
