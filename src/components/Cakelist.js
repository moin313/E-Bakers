import Cake from "./Cake";

{/*IT WILL PASS THE SINGLE CAKE ITTERATIVELY TO CAKE COMPONENT TO DISPLAY*/ }
function Cakelist(props) {
  return (
    <div className="container-fluid row justify-content-around mt-5">
      {props.cake.map((each, index) => {
        return <Cake data={each} />;
      })}
    </div>
  );
}
export default Cakelist;
