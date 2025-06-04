import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import MoreProductPage from "./pages/MoreProductPage/MoreProductPage";
import CheckLocationPage from "./pages/CheckLocationPage/CheckLocationPage";
import { NavBar } from "./components/NavBar/NavBar";
import MapsPage from "./pages/MapsPage/MapsPage";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import SearchAddress from "./components/SearchAddress/SearchAddress";
import Scrap from "./pages/Scrap/Scrap";
import { MyContextProvider } from "./components/MyContextProvider/MyContextProvider";
import ChatList from "./pages/ChatList/ChatList";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import MainPage from "./pages/MainPage/MainPage";
import Explore from "./pages/Explore/Explore";
import RecipeDetail from "./pages/RecipeDetail/RecipeDetail";
import RecipeReg from "./pages/RecipeReg/RecipeReg";
import SearchPage from "./pages/SearchPage/SearchPage";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import EditProfile from "./pages/EditProfile/EditProfile"; // 추가된 import
import RecipeSearchPage from "./pages/ReceipSearchPage/RecipeSearchPage";
import { LoginProvider } from "./contexts/LoginProvider";
import ProductListPage from "./pages/ProductListPage/ProductListPage";
import PostProduct from "./pages/PostProduct/PostProduct";

function App() {
    return (
        <Router>
            <LoginProvider>
                <MyContextProvider>
                    <div className="App">
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/login" element={<Signin />} />
                            <Route
                                path="/product-detail/:productId"
                                element={<ProductDetail />}
                            />
                            <Route
                                path="/product/:productId"
                                element={<ProductDetail />}
                            />
                            <Route path="/maps" element={<MapsPage />} />
                            <Route
                                path="/search-address"
                                element={<SearchAddress />}
                            />
                            <Route path="/scrap" element={<Scrap />} />
                            <Route path="/explore" element={<Explore />} />
                            <Route path="/recipes" element={<Explore />} />
                            <Route path="/search" element={<SearchPage />} />
                            <Route
                                path="/recipe/search"
                                element={<RecipeSearchPage />}
                            />
                            <Route
                                path="/more-product"
                                element={<MoreProductPage />}
                            />
                            <Route
                                path="/products"
                                element={<ProductListPage />}
                            />
                            <Route
                                path="/check-location"
                                element={<CheckLocationPage />}
                            />
                            <Route
                                path="/edit-profile"
                                element={<EditProfile />}
                            />
                            <Route
                                path="/chatroom/list"
                                element={<ChatList />}
                            />
                            <Route
                                path="/chatroom/:chatroomId"
                                element={<ChatRoom />}
                            />
                            <Route
                                path="/recipe/:recipeId"
                                element={<RecipeDetail />}
                            />
                            <Route
                                path="/recipeRegister"
                                element={<RecipeReg />}
                            />
                            <Route path="/signup" element={<Signup />} />
                            <Route
                                path="/post/product*"
                                element={<PostProduct />}
                            />
                        </Routes>
                        <ConditionalNavBar />
                    </div>
                </MyContextProvider>
            </LoginProvider>
        </Router>
    );
}

function ConditionalNavBar() {
    const location = useLocation();
    const hideNavBarRoutes = [
        /^\/login/,
        /^\/chatroom\/(?!list)/,
        /^\/post\/product/,
    ]; // Navbar를 표시하지 않을 경로

    const isNavBarHide = hideNavBarRoutes.some(
        (route) => !!location.pathname.match(route)
    );

    if (isNavBarHide) {
        return null;
    }

    return <NavBar />;
}

export default App;
