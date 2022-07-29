import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Loader from "./Day9/Loader";


{/*IT WILL REGISTER THE NEW USER*/}

var usersList = [];
function SignUp() {
    var user = {};//store user details
    var [loader, setLoader] = useState(false)
    var navigate = useNavigate()

    function signup(event) {
        // var newUser = { ...user }; {for local storage commented}
        // usersList.push(newUser);
        setLoader(true)
        //register new user
        axios({
            url: "https://apifromashu.herokuapp.com/api/register",
            method: "post",
            data: { email: user.email, name: user.name, password: user.password }
        }).then((responce) => {
            alert(responce.data.message)
            console.log("Signup success")
            setLoader(false)
            navigate("/")
        }, (error) => {
            setLoader(false)
            alert("Something went wrong please ensure correct details")
            console.log("error")
        })
    }

    //set inputs to user object
    function getEmail(event) {
        user.email = event.target.value;
    }
    function getName(event) {
        user.name = event.target.value;
    }
    function getPassword(event) {
        user.password = event.target.value;
    }

    return (
        <>
            {loader == true ? <Loader></Loader> :
            <div className="container d-flex justify-content-center mt-3 ">
                <form className=" justify-content-center mt-3 " style={{ border: "1px outset black", padding: " 5%", borderRadius:"20px"}}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Name</label>
                        <input type="text" placeholder="Enter your name" onChange={getName} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Email</label>
                        <input type="text" placeholder="abc@gmail.com" onChange={getEmail} class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="text" placeholder="********" onChange={getPassword} class="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="button" onClick={signup} class="btn btn-primary">Submit</button>
                </form>
            </div>}    
        </>
    )
}

export default SignUp