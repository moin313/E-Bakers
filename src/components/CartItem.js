import axios from "axios";
import { useState } from "react";
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


{/*IT WILL SHOW ITEM ROW WISE IN THE CART*/ }




function CartItem(props) {
  var [count, setCount] = useState(props.data.quantity);

  {/*IT WILL ADD THE SINGLE CAKE TO CART ON INCREASING CAKES QUANTITY*/ }
  function Increase() {
    toast.success('Please wait', { autoClose: 2000 })
    axios({
      url: "https://apifromashu.herokuapp.com/api/addcaketocart",
      data: { cakeid: props.data.cakeid, name: props.data.name, price: props.data.price, image: props.data.image, weight: props.data.weight },
      method: "post",
      headers: {
        authtoken: localStorage.getItem("token")
      }
    }).then((response) => {
      console.log("Success increase detail", response.data.data)
      setCount(++props.data.quantity);
      setTimeout((console.log("+ ", count)), 3000)
      let sum = (props.total + response.data.data.price)
      props.dispatch({
        type: "Increase",
        total: sum
      })
    }, (error) => {
      console.log(error)
    })
  }


  {/*IT WILL REMOVE SINGLE CAKE FROM ITS TOTAL ORDERED QUANTITY*/ }
  function Decrease() {
    if (count > 0)
      toast.success('Please Wait', { autoClose: 2000 })

    setCount(--props.data.quantity)
    axios({
      url: "https://apifromashu.herokuapp.com/api/removeonecakefromcart",
      method: "POST",
      data: { cakeid: props.data.cakeid },
      headers: { authtoken: localStorage.getItem("token") }
    }).then((response) => {
      setTimeout((console.log("+ ", count)), 3000)
      console.log("success in decreasing one ", response)
      let sum = (props.total - props.data.price)
      props.dispatch({
        type: "Decrease",
        total: sum
      })
    }, (error) => {
      console.log("error wile decreasing one ", error)
    })
  }

  {/*IT WILL REMOVE THE CAKES ALONG WITH ITS WHOLE QUANTITY*/ }
  function removeCakefromCart() {
    toast('Removing the cake', { autoClose: 1000 })
    axios({
      url: "https://apifromashu.herokuapp.com/api/removecakefromcart",
      method: "POST",
      data: { cakeid: props.data.cakeid },
      headers: { authtoken: localStorage.getItem("token") }
    }).then((Response) => {
      console.log(props.total, "cartitem")
      props.dispatch({
        type: "Remove from cart",
        payload: props.item - 1,
        id: props.data.cakeid,
        total: (props.total - (props.data.quantity * props.data.price))
      })
    }, (error) => {
      console.log("error while deleting")
    })
  }


  return (
    <tr >
      <td> <img
        src={props.data.image}
        className="card-img-top"
        alt="..."
        style={{ height: "80px", width: "100px" }}
      /></td>
      <td><h5 className="card-title">{props.data.name}</h5></td>
      <td><p className="card-text text-danger">{props.data.price}</p></td>
      <td><button type="button" onClick={Decrease} className="btn btn-outline-danger ">-</button>{count}<buuton type="button" onClick={Increase} className="btn btn-outline-success">+</buuton></td>
      <td> <button className="btn btn-danger" onClick={removeCakefromCart}>X</button></td>
    </tr>
  );
}
export default connect(function (state, props) {
  return {
    isloggedin: state["isloggedin"],
    item: state["item"],
    total: state["total"]
  }
})(CartItem);
