import { connect } from "react-redux";
import { Link, Outlet } from "react-router-dom"

{/*THIS IS THE NESTED ROUTE AND THE PARENT OF (SUMMARY, ADDRESS AND CONFIRM)*/ }

function CheckOut(props) {
    return (
        <div>
            {props.isloggedin == true ?
                <div className="container border" style={{ marginTop: "5%", width: "80%", borderRadius: "20px" }}>
                    <div className="row " >
                        <div className="col-md-8 mt-1">
                            <Outlet></Outlet>
                        </div>
                        <div class="col-md-4">
                            <div class="card-body h-100" style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
                                <div class="nested-div">
                                    <Link class="nested" to="/checkout/summary">Cart Summary</Link>
                                    <Link class="nested" to="/checkout/address">Address</Link>
                                    {props.flag && <Link class="nested" to="/checkout/confirm">Confirm</Link>}
                                </div>
                                <div className="mt-2">
                                    <h5>Summary</h5>
                                    <hr></hr>
                                    <div style={{ textAlign: "left", padding: "5%" }}>
                                        <p >Items {props.item}<span style={{ marginLeft: "53%" }}>₹ {props.total}</span></p>
                                        <hr></hr>
                                        <p>Total Price<span style={{ marginLeft: "46%" }}>₹ {props.total}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <h1>Please login</h1>
            }
        </div>)
}

export default connect(function (state, props) {
    return {
        isloggedin: state["isloggedin"],
        item: state["item"],
        total: state["total"],
        flag: state["flag"]
    }
})(CheckOut)