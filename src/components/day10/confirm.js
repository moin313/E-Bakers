import { useNavigate } from "react-router"
import { connect } from "react-redux"
import { useEffect } from "react/cjs/react.development"
import axios from "axios"
import { toast } from 'react-toastify';


{/*THIS IS THE CONFIRM SECTION FOR CONFIRMING BEFORE FINAL ORDER */ }


function Confirm(props) {

    var navigate = useNavigate()

    {/*RESTRICTED FOR EMPTY CART */ }
    useEffect(() => {
        if (props.flag == false)
            navigate("/checkout/address")
    }, [])

    {/*IT WILL PLACE ORDER AND SEND NECESSARY DETAIL TO WITH API */ }
    function placeOrder() {
        console.log("before", props.detail)
        props.detail.cakes = props.cakes
        props.detail.price = props.price
        console.log("after", props.detail)
        toast('Please wait your cart is getting ready', { autoClose: 3000 })
        axios({
            url: "https://apifromashu.herokuapp.com/api/addcakeorder",
            method: "post",
            data: props.detail,
            headers: {
                authtoken: localStorage.getItem("token")
            }
        }).then((Response) => {
            let item = 0
            props.dispatch({
                type: "Ordered",
                payload: item
            })
            console.log("Success in order", Response)
            if (Response.data.error) {
                alert("Something went wrong please re checkout")
                setTimeout(navigate("/cart"), 3000)
            } else {
                setTimeout(navigate("/order"), 3000)
            }
        }, (error) => {
            console.log("error in ordering ", error)
        })
    }

    {/*ORDER DETAIL TO LOOK FOR ANY MISTAKES IN THE ORDER DETAIL */ }
    return (
        <div class="col-md-12 cart">
            <div class="title">
                <div class="row m-0">
                    <div class="col">
                        <h4><b>Order Confirmation</b></h4>
                    </div>
                </div>
            </div><hr />
            <div class="col">
                <h6>Shipping Address: {props.detail.address}</h6>
                <div>Name: {props.detail.name}</div>
                <div>Phone: {props.detail.phone}</div>
                <div>{props.detail.city},{props.detail.zip}</div>
            </div><hr />
            <div class="col">
                <h6>Delivery: </h6>Cash On delivery
            </div><hr />
            <div class="m-5" >
                <button className="btn" type="button" style={{ backgroundColor: "black", color: "white", width: "80%" }} onClick={placeOrder}>Place order</button>
            </div>
        </div>
    )
}

export default connect(function (state, props) {
    return {
        flag: state["flag"],
        detail: state["detail"],
        cakes: state["cakes"],
        price: state["total"],

    }
})(Confirm);
