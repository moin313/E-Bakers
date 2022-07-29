import CartItem from "./CartItem";

{/*IT WILL PASS ONE CAKE AT A TIME TO PRINT IN ALIST*/}


function Cartlist(props) {
  return (
    <>
      {props.cakes.map((each, index) => {
        return <CartItem data={each} />
      })}
    </>
  );
}
export default Cartlist;