import { toast } from "react-toastify";
import { connect } from "react-redux";
import { useEffect } from "react/cjs/react.development";
import { useNavigate } from "react-router";

{/*SUMMARY SECTION FOR THE ORDERED CAKES */ }

function Summary(props) {
    var navigate = useNavigate()

    {/*RESTRICT TO DIRECT ACCESS WITH EMPTY CART */ }
    useEffect(() => {
        toast.warning('Please wait', { autoClose: 2500 })
        setTimeout(() => {
            if (props.item == 0) {
                alert("Your summary is empty")
                navigate("/cart")
            }
        }, 3000)
    }, [])


    {/*ITEM WILL BE DISPLAY WITH IMMUTABLE LIST*/ }
    return (
        props.cakes.map((each, index) => {
            return (
                <div class="container mt-2">
                    <div class="row border" >
                        <div class="col-sm">
                            <img src={each.image} className="card-img-top" alt="..." style={{ height: "80px", width: "100px" }}></img>
                        </div>
                        <div class="col-sm">
                            <h4 className="card-title mt-2" >{each.quantity}</h4>
                        </div>
                        <div class="col-sm">
                            <h5 className="card-title mt-2">{each.price}</h5>
                        </div>
                    </div>
                </div>
            )
        })
    )
}

export default connect(function (state, props) {
    return {
        isloggedin: state["isloggedin"],
        item: state["item"],
        id: state["id"],
        total: state["total"],
        cakes: state["cakes"]
    }
})(Summary);
