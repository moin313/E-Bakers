import axios from "axios";
import { useState } from "react/cjs/react.development";
import { connect } from "react-redux"
import { useNavigate } from "react-router";
import Loader from "./Loader";


{/*LOGIN USING REDUX */ }


function ReduxLogin(props) {
    var user = {};
    var [loader, setLoader] = useState(false)
    var navigate = useNavigate()

    {/*VALIDATE THE USER */ }
    function login(event) {
        setLoader(true)
        axios({
            url: "https://apifromashu.herokuapp.com/api/login",
            method: "post",
            data: { email: user.email, password: user.password }
        }).then((response) => {
            console.log("Login successfull", response.data)
            if (response.data.token) {
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("name", response.data.name)
                props.dispatch({
                    type: "Login Success"
                })
                setLoader(false)
                navigate("/")
            }
        }, (error) => {
            console.log("error")
            setLoader(false)
        })
    }

    {/*GET INPUTS FROM USER */ }
    function getEmail(event) {
        user.email = event.target.value;
    }
    function getPassword(event) {
        user.password = event.target.value;
    }

    {/*LOGIN FORM*/ }
    return (
        <>
            {loader == true ? <Loader></Loader> :
                <div className="container d-flex justify-content-center mt-5 ">
                    <form style={{ width: "30%", backgroundColor: "(0,0,0,0.3)" }}>
                        <form className=" justify-content-center mt-5 " style={{ border: "1px solid black", padding: " 20%" }}>
                            <h4>Login</h4>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Email</label>
                                <input type="text" placeholder="abc@gmail.com" onChange={getEmail} class="form-control" id="exampleInputPassword1" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="text" placeholder="********" onChange={getPassword} class="form-control" id="exampleInputPassword1" />
                            </div>
                            <button type="button" onClick={login} class="btn btn-primary">Submit</button>
                        </form>
                    </form>
                </div>}
        </>
    )
}

export default connect()(ReduxLogin)







