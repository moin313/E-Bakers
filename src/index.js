import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; 
import reportWebVitals from './reportWebVitals';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import MyRouter from './components/Routes'; 
import store from './components/Day9/reduxDemoStore';
import { Provider } from "react-redux"
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <MyRouter></MyRouter>
    </React.StrictMode>,
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
{/* <Addnewcake></Addnewcake> */ }
{/* <CakeOrder></CakeOrder> */ }
{/* <Test></Test> */ }
{/* <LiftinDemo></LiftinDemo> */ }
{/* <store></store> */ }
{/* <GeeksforGeeks></GeeksforGeeks> */ }

reportWebVitals();
