// import logo from './logo.svg';
import './App.css';
// import Carousel from './components/Carousel';
import Cakelist from './components/Cakelist';
// import Signup from './components/Signup';
// import Demo from './components/statedemo';
import React, { Component, useState } from 'react';
// import AddCartItem from './components/addCartItem'
import { useEffect } from 'react/cjs/react.development';
import axios from 'axios';
import Loader from './components/Day9/Loader';
function App() {
  /* let cakes = [
     {name: "Pista-rosy", price: 250, image: "cake1.jpg", Eggless: 1},
     {name: "Guava cake", price: 350, image: "cake2.jpg", Eggless: 0},
     {name: "Doddle-pineapple", price: 400, image: "cake3.jpg", Eggless : 0},
     {name: "Mix-rubdy", price: 450, image: "Cake4.jpg", Eggless : 0},
     {name: "Stravberry", price: 500, image: "Cake5.jpg", Eggless : 1},
     {name: "Pista-rosy", price: 600, image: "Cake1.jpg", Eggless : 0},
     {name: "Guava cake", price: 700, image: "cake2.jpg", Eggless : 1},
     {name: "Doddle-pineapple", price: 800, image: "cake3.jpg", Eggless : 0},
   ];
 */
  var cakes = [];
  var [loader, setLoader] = useState(true)
  useEffect(() => {
    axios({
      url: "https://apifromashu.herokuapp.com/api/allcakes",
      method: "get",
    }).then((response) => {
      console.log("fetch cakes Success")
      cakes = response.data.data;
      setCakes(cakes)
      setLoader(false)
    }, (error) => {
      console.error()
    })
  }, [])

  var [cake, setCakes] = useState([]);
  function desc() {
    setCakes([...cake.sort((a, b) => {
      return b.price - a.price;
    })]);

  }
  function asc() {
    setCakes([...cake.sort((a, b) => {
      return a.price - b.price;
    })]);

  }

  function filterCake() {
    if (document.getElementById('filter').checked) {
      var egglessCakes = [];
      cake.map((each) => {
        if (each.Eggless == 1) {
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
        <div>
          <h3 className="mt-4">Sort by price</h3>
          <img src='./sort-up.svg' style={{ margin: "20px", height: "30px" }} onClick={asc}></img>
          <img src='./sort-down.svg' style={{ margin: "20px", height: "30px" }} onClick={desc}></img>
          <input type="checkbox" onChange={filterCake} style={{ marginRight: "10px" }} id='filter'></input>
          <b>See-Eggless</b>
          <Cakelist cake={cake} />
        </div>}
    </div>
  );
}

export default App;
