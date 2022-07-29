import { toast } from "react-toastify"
import { useNavigate } from "react-router"
import { connect } from "react-redux"
import { useEffect } from "react"


{/*IT WILL TAKE INPUT FROM USER FOR ADDRESS AT EVERY ORDDER */ }


function Address(props) {
    var detail = {}
    var navigate = useNavigate()

    {/*RESTRICTED FOR EMPTY CART */ }
    useEffect(() => {
        toast.warning('Please wait', { autoClose: 2500 })
        setTimeout(() => {
            if (props.item == 0) {
                alert("No item to place")
                navigate("/cart")
            }
        }, 3000)
    })

    {/*IT WILL TAKE USERS INOUT AND VALIDATE IF OK THEN NAVIGATE TO CONFIRM */ }
    function readyToPlace() {
        detail.name = localStorage.getItem("name")
        detail.phone = document.getElementById('phone').value
        detail.address = document.getElementById('address').value
        detail.pincode = document.getElementById('zip').value
        detail.city = document.getElementById('city').value
        console.log(detail.phone)
        if (detail.name == "" || detail.phone == "" || detail.address == "" || detail.pincode == "" || detail.city == "") {
            toast.warning('All fields are necessary', { autoClose: 1000 })
        }
        else {
            props.dispatch({
                type: "Address success",
                detail: detail,
                flag: true
            })
            navigate("/checkout/confirm")
        }
    }

    return (
        <form>
            <h2>Order Address</h2>
            <hr></hr>
            <div class="form-group">
                <p>Phone</p>
                <input type="number" class="form-control" id="phone" placeholder="+91..." required />
            </div>

            <div class="form-group">
                <p>Address line</p>
                <input type="text" class="form-control" id="address" placeholder="1234 Main St" required />
            </div>
            <div class="form-group">
                <p>City</p>
                <input type="text" class="form-control" id="city" placeholder="Indore" required />
            </div>
            <div class="form-group">
                <p>Postal code</p>
                <input type="text" class="form-control" id="zip" placeholder="452001" required />
            </div>
            <div class="m-5" >
                <button className="btn" type="button" style={{ backgroundColor: "black", color: "white", width: "80%" }} onClick={readyToPlace}>Add address</button>
            </div>
        </form>
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
})(Address);