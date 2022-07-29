import axios from "axios"
import { useEffect, useState } from "react/cjs/react.development"
import Loader from "../Day9/Loader"

{/*THIS IS THE ORDER PHASE TO DISPLAY RECENT ORDER */ }

function Order() {
    var [fetchDetail, setDetail] = useState({})
    var [loader, setLoader] = useState(true)
    var [history, setHistory] = useState({})

    {/*TO FETCH ORDER HOSTORY WITH API */ }
    useEffect(() => {
        setLoader(true)
        axios({
            url: "https://apifromashu.herokuapp.com/api/cakeorders",
            method: "post",
            data: {},
            headers: {
                authtoken: localStorage.getItem("token")
            }
        }).then((response) => {
            setHistory(response.data.cakeorders)
            console.log("myorder success 2", response.data.cakeorders[(response.data.cakeorders.length - 1)])
            setDetail(response.data.cakeorders[(response.data.cakeorders.length - 1)])
            setLoader(false)
        }, (error) => {
            console.log("error in myorder ", error);
            setLoader(false)
        })
    }, [])

    {/*IT WILL DISPLAY RECENT ORDER DETAILS */ }
    return (<>
        {loader == true ? <Loader></Loader> :
            <div>
                <div class="card">
                    <div class="card-header" id="heading0">
                        <h5 class="mb-0 white">
                            <button class="btn white" data-toggle="collapse" data-target="#collapse0" aria-expanded="true" aria-controls="collapse0">Order {fetchDetail.orderid}</button>
                        </h5>
                    </div>
                    <div id="collapse0" class="collapse show" aria-labelledby="heading0" data-parent="#accordion">
                        <div class="card-body">
                            <div class="row m-0">
                                <div class="col-md-6">
                                    <b>Order Information</b>
                                    <div>Price: ₹ {fetchDetail.price}</div>
                                    <div>Payment mode: {fetchDetail.mode}</div>
                                    <div>Status: {fetchDetail.pending ? "Pending" : "done"}</div>
                                    <div>Purchased on: {fetchDetail.orderdate}</div>
                                </div>
                                <div class="col-md-6">
                                    <b>Shipping Address:</b>
                                    <div>{fetchDetail.name}</div>
                                    <div>Phone: {fetchDetail.phone}</div>
                                    <div>{fetchDetail.address}, {fetchDetail.city}, {fetchDetail.pincode}</div>
                                </div>
                            </div><br />
                        </div></div>
                    <div class="col-md-12">
                        <div class="title">
                            <div class="row m-0">
                                <div class="col">
                                    <h6><b>Items</b></h6>
                                </div>
                            </div>
                        </div>

                        {
                            fetchDetail.cakes.map((each, index) => {
                                return (
                                    <div class="row m-0 border-top border-bottom">
                                        <div class="row main align-items-center">
                                            <div class="col-2">
                                                <img class="" src={each.image} alt="" width="60" height="60" />
                                            </div>
                                            <div class="col">
                                                <div class="row">{each.name}</div>
                                            </div>
                                            <div class="col">Qty: <span class="btn btn-sm border ml-2 mr-2 qty">{each.quantity}</span></div>
                                            <div class="col">₹ {each.price}</div>
                                        </div>
                                    </div>
                                )
                            }
                            )
                        }
                    </div>
                    <br></br>

                    {/*IT WILL DISPLAY ORDERS ID */}
                    <div style={{ backgroundColor: "black" }}>{
                        history.map((each, index) => {
                            return (
                                <p style={{ color: "white" }}>{each.orderid}</p>
                            )
                        })
                    }
                    </div>
                </div>
            </div>}
    </>)
}

export default Order