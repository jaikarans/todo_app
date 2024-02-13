import Navbar from "./router/Navbar";
import { Fragment } from "react";
import RootRouter from "./router/RootRouter";

function App() {
  return (
    <Fragment>
      <Navbar />
      <RootRouter />
    </Fragment>
  );
}

export default App;
