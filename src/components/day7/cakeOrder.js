import { useEffect, useState } from "react"
import { useParams } from "react-router"
import axios from "axios"
// import { createStore } from "redux"
import { Reducer } from "../Day9/reducer"
import { connect } from "react-redux"
import Loader, { Toast } from "../Day9/Loader"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router"


{/*THIS IS THE CAKE DETAIL PAGE FROM WHERE USER CAN 
   SEE CAKE DETAIL AND ADD CAKE TO CART*/}


// var cartStore = createStore(Reducer)
function CakeOrder(props) {
    var [cakeDetails, setCakeDetails] = useState({})
    var [loader, setLoader] = useState(false)
    var params = useParams()
    var navigate = useNavigate()

    {/*THIS CALL WILL SEARCH FOR THAT PARTICULAR CAKE FROM API AND FETCH ITS DETAILS*/ }
    useEffect(() => {
        setLoader(true)
        var cakeid = params.cakeid
        axios({
            url: `https://apifromashu.herokuapp.com/api/cake/${cakeid}`,
            method: "get"
        }).then((response) => {
            console.log("success")
            setCakeDetails(response.data.data)
            setLoader(false)
            console.log(response.data.data)
        }, (error) => {
            console.log(error)
        })
    }, [])


    {/*IF USER ORDER THEN THIS CALL WILL ADD THAT CAKE TO THE CART WITH DEFAULT QUANTITY 1 */ }
    function addtoCart(event) {
        if (props.isloggedin) {
            toast('Adding in to the cart', { autoClose: 1000 })
            axios({
                url: "https://apifromashu.herokuapp.com/api/addcaketocart",
                data: { cakeid: cakeDetails.cakeid, name: cakeDetails.name, price: cakeDetails.price, image: cakeDetails.image, weight: cakeDetails.weight },
                method: "post",
                headers: {
                    authtoken: localStorage.getItem("token")
                }
            }).then((response) => {
                console.log("Success addcake detail", response.data.data)
                navigate("/cart")
            }, (error) => {
                console.log(error)
            })
        } else {
            alert("Please login for add to cart...!")
        }
    }


    return (
        <>
            {loader == true ? <Loader></Loader> :
                <div class="container" style={{ marginTop: "2%", width: "80%" }}>
                    <div class="card mb-3" style={{ width: "540px;" }}>
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src={cakeDetails.image} class="img-fluid rounded-start" style={{ padding: "20px", height: "400px", width: "600px" }} alt="Cake" />
                                <p style={{ marginLeft: "20px" }}><b>Note: </b>Design and icing cake may vary from the image<br />shown here since each chef has his/her own way of baking designing a cake.</p>
                                <img style={{ marginLeft: "50px", borderRadius: "20px" }} src="https://neoangularwebsite.herokuapp.com/assets/hygienic.webp"></img>
                            </div>
                            <div class="col-md-4 d-flex flex-row">
                                <div class="card-body">
                                    <h2 class="card-title">{cakeDetails.name}</h2>
                                    <h6>{cakeDetails.ratings} Ratings</h6>
                                    <h1>₹ {cakeDetails.price}</h1>
                                    <h6>Inclusive of all taxes.</h6>
                                    <ul>
                                        <li>Cake Flavour : {cakeDetails.flavour}</li>
                                        <li>Type of Cake : {cakeDetails.type}</li>
                                        <li>Minimum Weight : {cakeDetails.weight} Kg</li>
                                        <li>Type of Bread : {cakeDetails.ingredients + ", "}</li>
                                    </ul>
                                    <div className="d-flex flex-row bd-highlight">
                                        <div class="form-check mr-2">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                            <label class="form-check-label" for="flexRadioDefault1">500gm</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                            <label class="form-check-label" for="flexRadioDefault1">1Kg</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                            <label class="form-check-label" for="flexRadioDefault1">1.5Kg</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                            <label class="form-check-label" for="flexRadioDefault1">2Kg</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                            <label class="form-check-label" for="flexRadioDefault1">2.5Kg</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                            <label class="form-check-label" for="flexRadioDefault1">3Kg</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" />
                                            <label class="form-check-label" for="flexRadioDefault1">4Kg</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" />
                                            <label class="form-check-label" for="flexRadioDefault1">5Kg</label>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row">
                                        <div class="form-check mt-2">
                                            <input class="form-check-input" type="checkbox" name="flexRadioDefault" />
                                            <label class="form-check-label" for="flexRadioDefault1"><strong>Eggless</strong></label>
                                        </div>
                                        <span class="m-2">
                                            <input class="form-check-input" type="checkbox" name="flexRadioDefault" />
                                            <label class="form-check-label" for="flexRadioDefault1"><strong>Heart Shape</strong></label>
                                        </span>
                                    </div>
                                    <div class="mt-4">
                                        <input type="email" class="form-control" value={cakeDetails.description} />
                                    </div>
                                    <div >
                                        <button class="btn btn-warning" style={{ margin: "8%" }} onClick={addtoCart} >Add To Cart</button>
                                    </div>
                                </div>
                                <div class="col-md-4" style={{ marginLeft: "-120px" }}>
                                    <img style={{ marginLeft: "50px", borderRadius: "20px", height: "280px" }} src="https://neoangularwebsite.herokuapp.com/assets/assured_secure_payments.png"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }</>
    )
}

export default connect(function (state, props) {
    return {
        isloggedin: state["isloggedin"],
        item: state["item"]
    }
})(CakeOrder)