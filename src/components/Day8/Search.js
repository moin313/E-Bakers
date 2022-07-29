import axios from "axios"
import { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import Cakelist from "../Cakelist"
import Loader from "../Day9/Loader"


{/*THIS WORKS FOR THE SEARCH RESULT ON USING NAVBAR SEARCH FIELD */ }



function SearchCake() {
  var [loader, setLoader] = useState(true)
  var cakes = [];
  let path = window.location

  {/*IT WILL SEARCH FOR THAT PARTICULAR TYPE OF CAKE RECIEVED IN (KEY) VARIABLE*/ }
  useEffect(() => {
    let path = window.location
    var key = new URLSearchParams(path.search).get('q')
    axios({
      url: `https://apifromashu.herokuapp.com/api/searchcakes?q=${key}`,
      method: "get",
    }).then((response) => {
      console.log("Searching Success")
      cakes = response.data.data;
      console.log(response.data.data)
      setCakes(cakes)
      setLoader(false)
    }, (error) => {
      console.log(error)
    })
  }, [])


  {/*THIS WILL SORT THE CAKES DATA ON THE BASIS OF ITS PRICE  */ }

  {/*HIGH TO LOW*/ }
  var [cake, setCakes] = useState([]);
  function desc() {
    setCakes([...cake.sort((a, b) => {
      return b.price - a.price;
    })]);
  }

  {/*LOW TO HIGH */ }
  function asc() {
    setCakes([...cake.sort((a, b) => {
      return a.price - b.price;
    })]);
  }

  {/*IT WORKS ON EGG-FIELD AND FILETR OUT THE EGGLESS CAKES*/ }
  function filterCake() {
    if (document.getElementById('filter').checked) {
      var egglessCakes = [];
      cake.map((each) => {
        if (each.Eggless == true) {
          egglessCakes.push(each);
        }
      })
      setCakes(egglessCakes);
    } else {
      setCakes(cakes);
      document.location.reload();
    }
  }

  return (
    <div className="App ">
      {loader == true ? <Loader></Loader> :
        <>
          <h3 className="mt-4">Sort by price</h3>
          <img src='./sort-up.svg' style={{ margin: "20px", height: "30px" }} onClick={asc}></img>
          <img src='./sort-down.svg' style={{ margin: "20px", height: "30px" }} onClick={desc}></img>
          <input type="checkbox" onChange={filterCake} style={{ marginRight: "10px" }} id='filter'></input>
          <b>See-Eggless</b>
          <Cakelist cake={cake} />
        </>}
    </div>
  );
}

export default SearchCake