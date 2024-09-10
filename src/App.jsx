import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./layouts/homePage/HomePage";
import Home from "./pages/home/Home";
import NotFound from "./components/notFound/NotFound";
import Login from "./pages/login/Login";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Cart from "./pages/cart/Cart";
import ProFile from "./pages/proFile/ProFile";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<HomePage />}>
            {/* Home page */}
            <Route index element={<Home />} />

            {/* Auth */}
            <Route path="/auth">
              <Route index element={<Login />} />
            </Route>

            {/* Cart */}
            <Route path="cart" element={<Cart />} />

            {/* Profile */}
            <Route path="profile" element={<ProFile />} />

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
