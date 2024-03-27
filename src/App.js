import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home/Home";
import User from "./pages/User/User";
import Product from "./pages/Product/Product";
import Order from "./pages/Order/Order";
import UserDetail from "./pages/UserDetail/UserDetail";
import AddProduct from "./pages/AddProduct/AddProduct";
import UpdateProduct from "./pages/updateProduct/updateProduct";

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/users" element={<User />}></Route>
        <Route path="/products" element={<Product />}></Route>
        <Route path="/orders" element={<Order />}></Route>
        <Route path="/user/:id" element={<UserDetail />}></Route>
        <Route path="/product" element={<AddProduct />}></Route>
        <Route path="/updateProduct/:id" element={<UpdateProduct />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
