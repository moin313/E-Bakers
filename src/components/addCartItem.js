import { Component } from "react";
import Cartlist from "./Cartlist";
import { useState, useEffect } from "react";
import { connect } from "react-redux"
import axios from "axios";
import Loader from "./Day9/Loader";
import { useNavigate } from "react-router";

{/*THIS A CART PHASE */ }

var cake = {};

function AddCartItem(props) {
  var [cakes, setCake] = useState([]);
  var [loader, setLoader] = useState(false)
  var navigate = useNavigate()

  {/*IT WILL FETCH OUT WHOLE ORDERED CAKES & PASS TO CARTLIST */ }
  useEffect(() => {
    setLoader(true)
    axios({
      url: `https://apifromashu.herokuapp.com/api/cakecart`,
      method: "POST",
      data: {},
      headers: {
        authtoken: localStorage.getItem("token")
      }
    }).then((response) => {
      console.log("add cart table Success", response.data.data)
      cakes = response.data.data;
      var total = 0
      cakes.forEach(element => {
        total += (element.price * element.quantity)
      });
      props.dispatch({
        type: "Added to cart",
        payload: response.data.data.length,
        total: total,
        cakes: cakes
      })
      setLoader(false)
      setCake(cakes)
    }, (error) => {
      console.log(error)
    })
  }, [])

  if (props.id != 0) {
    var index = 0
    cakes.forEach(element => {
      if (element.cakeid == props.id) {
        cakes.splice(index, 1)
      }
      index++
    });
  }

  function toNavigate() {
    navigate("/checkout/summary")
  }

  {/*TO SHOW CART IS EMPTY IF.*/ }
  var head
  function setHead() {
    if (!cakes.length) {
      head = <h1 style={{ color: "gray" }}>No item to show</h1>;
    }
  }
  setHead()


  return (
    <div className="text-center">
      {loader == true ? <Loader></Loader>
        : <>
          < div class="container" style={{ marginTop: "5%", width: "84%" }} >
            < div class="card mb-3">
              <div class="row g-0">
                <div class="col-md-8">
                  <h1>Cart item list</h1>
                  <table class="table mt-5">
                    {head}
                    <thead></thead>
                    <tbody>
                      <Cartlist cakes={cakes} />
                    </tbody>
                  </table>
                </div>
                <div class="col-md-4 d-flex flex-row" style={{ height: "90%" }}>
                  <div class="card-body" style={{ backgroundColor: "rgba(0,0,0,0.2)", border: "50px" }}>
                    <h5 style={{ marginTop: "1%" }}>Summary</h5>
                    <hr></hr>
                    <div style={{ textAlign: "left", padding: "5%" }}>
                      <p >Items {props.item}<span style={{ marginLeft: "53%" }}>₹{props.total}</span></p>
                      <hr></hr>
                      <p>Total Price<span style={{ marginLeft: "46%" }}>₹{props.total}</span></p>

                    </div>
                    <div class="mt-4" style={{ padding: "10%" }}>
                      <button className="btn" style={{ backgroundColor: "black", color: "white", width: "80%" }} onClick={toNavigate}>CheckOut</button>
                    </div>
                  </div>
                </div>
              </div>
            </div >
          </div>
        </>}
    </div>
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
})(AddCartItem);
















{/* <form className="text-center">
        <table align="center" cellPadding="11" cellSpacing="8">
          <tbody>
            <tr align="start">
              <td><b>Name</b></td>
              <td><input type="text" onChange={setName} placeholder="Enter Cake Name" style={{ width: "300px" }} required/></td>
            </tr>
            <tr align="start">
              <td><b>Price</b></td>
              <td><input type="text" onChange={setPrice} placeholder="Enter Cake Price" style={{ width: "300px" }} required/></td>
            </tr>
            <tr align="start">
              <td><b>Quantity</b></td>
              <td><input type="text" onChange={setqty} placeholder="Enter cake Quantity" style={{ width: "300px" }} required/></td>
            </tr>
            <tr align="start">
              <td><b>Image</b></td>
              <td><input type="text" onChange={setPath} placeholder="Enter cake Path" style={{ width: "300px" }} required/></td>
            </tr>
            <tr >
              <td colSpan="3" >
                <button type="submit" onSubmit={addCake} className="btn btn-warning mt-3">
                  Add to Cart
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form> */}
