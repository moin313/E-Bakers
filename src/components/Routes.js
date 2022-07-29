import { BrowserRouter ,Routes,Route } from "react-router-dom";
import Carousel from "./Carousel";
import Signup from "./Signup";
import AddCartItem from "./addCartItem";
import CakeOrder from "./day7/cakeOrder";
import PageNotFound from "./day7/PageNotFound";
import SearchCake from "./Day8/Search";
// import Test from "../componentsmie/cart/test"
import NavbarRedux from "./Day9/NavbarRedux";
import ReduxLogin from "./Day9/loginRedux"
import CheckOut from "./day10/cheakOut";
import Summary from "./day10/summary";
import Address from "./day10/address";
import App from "../App";
import Confirm from "./day10/confirm";
import Order from "./day10/myOrder";
// import AddCake from "./day10/addNewCake";

{/*ROUTES PHASE TO NAVIGATE USING PATH*/}


function MyRouter(){
    return(
        <>
        <BrowserRouter>
        <NavbarRedux></NavbarRedux>   {/* all tag prifix with redux implinting redux too */}
        <Routes>
            <Route path="/" element={<Carousel/>}></Route>
            <Route path="/home" element={<App></App>}></Route>
            <Route path="/cart" element={<AddCartItem/>}></Route>
            <Route path="/Signup" element={<Signup/>}></Route>
            <Route path="/cakeOrder/:cakeid" element={<CakeOrder></CakeOrder>}></Route>
            <Route path="/*" element={<PageNotFound></PageNotFound>}></Route>
            <Route path="/search" element={<SearchCake></SearchCake>}></Route>
            <Route path="/reduxlogin" element={<ReduxLogin></ReduxLogin>}></Route>
                {/* NESTED ROUTES */}
            <Route path="/checkout" element={<CheckOut></CheckOut>}>
                <Route path="/checkout/summary" element={<Summary></Summary>}></Route>
                <Route path="/checkout/address" element={<Address></Address>}></Route>
                <Route path="/checkout/confirm" element={<Confirm></Confirm>}></Route>    
            </Route>
            <Route path="/order" element={<Order></Order>}></Route>
            {/* <Route path="/test" element={<Test></Test>}></Route> */}
            {/* <Route path="/addcake" element={<AddCake></AddCake>}></Route> */}
        </Routes>
        </BrowserRouter>
        </>
    )
}
export default MyRouter;