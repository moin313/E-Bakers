import { createSearchParams, NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router";
import { connect } from "react-redux"


{/*NAVBAR USING REDUX*/ }


function ReduxNavbar(props) {

  function logout() {
    localStorage.clear()
    window.location.href = "/"
  }

  var [data, setData] = useState("");
  function getSearchDetail(event) {
    setData(event.target.value)
  }

  var navigate = useNavigate();
  function goToPosts() {
    setData(document.getElementById('search').value)
    { (data) ? navigate(`/search?q=${data}`) : alert("Please re-enter your choice") }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg  navbar-light" >
        <div className="container-fluid ">
          <a className="navbar-brand text-black" href="#">
            E Bakers
          </a>
          <button
            className="navbar-toggler navbar-toggler-right text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon text-white"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center "
            id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ms-5">
                <NavLink
                  className="nav-link active text-black "
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item ms-5">
                {props.isloggedin != true ?
                  <NavLink className="nav-link active text-black " to="/reduxlogin">Login</NavLink> :
                  <NavLink className="nav-link active text-black " to="/" onClick={logout}>Logout</NavLink>
                }
              </li>
              {props.isloggedin != true &&
                <li className="nav-item ms-5">
                  <NavLink className="nav-link active text-black " to="/Signup">
                    Sign Up
                  </NavLink>
                </li>}
              <li className="nav-item ms-5">
                {props.isloggedin == true ? <NavLink className="nav-link active text-black " to="/cart">
                  Cart{props.item > 0 && <span>({props.item})</span>}
                </NavLink> : <></>}
              </li>
            </ul>

            <NavLink
              className="nav-link active text-black "
              aria-current="page"
              to="/order"
            >
              My-orders
            </NavLink>

            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                // style={{width:"30%"}}
                id="search"
                onChange={getSearchDetail}
              />
              <button type="button" className="btn btn-outline-success" onClick={goToPosts} >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}
export default connect(function (state, props) {
  return {
    isloggedin: state["isloggedin"],
    item: state["item"]
  }
})(ReduxNavbar)