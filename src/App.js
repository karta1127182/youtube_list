import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home/index";
import Favorite from "./pages/favorite/index";
import Playpage from "./pages/playPage/index";
import Header from "./component/header/header";
import Footer from "./component/footer/footer";
export default function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/favorite" component={Favorite} />
          <Route exact path="/palypage" component={Playpage} />
        </Switch>
        <Footer />
      </>
    </Router>
  );
}
