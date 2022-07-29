import { NavLink } from "react-router-dom";

{/*IT WILL DISPLAY A SINGLE RECIEVED CAKE DETAIL IN THE FORM OF CARD*/ }
function Cake(props) {
    if (props.data.Eggless != true) {
        var lable = <p style={{ backgroundColor: "green", width: "80px", borderRadius: "5px" }}>EggLess</p>;
    }
    else {
        lable = <p style={{ backgroundColor: "red", width: "90px", borderRadius: "5px" }}>Egg contain</p>;
    }
    return (
        <div className="card mt-4" style={{ width: "18rem" }}>
            <NavLink to={`/cakeOrder/${props.data.cakeid}`}><img src={props.data.image} className="card-img-top" alt="..." style={{ height: "200px", width: "250px" }} /></NavLink>
            {lable}
            <div className="card-body">
                <h5 className="card-title">{props.data.name}</h5>
                <p className="card-text text-danger">Price: {props.data.price}</p>
                <NavLink to={`/cakeOrder/${props.data.cakeid}`} className="btn btn-warning">Order now</NavLink>
            </div>
        </div>
    );
}
export default Cake;
