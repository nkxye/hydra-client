import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

//containers
import AboutPage from "./AboutPage";
import LandingPage from "./LandingPage";
import CropsPage from "./CropsPage";
import RegisterPage from "./RegisterPage";
import HistoryPage from "./HistoryPage";
import resetPassword from "./ResetPassword";
// navbar
import Headers from "../components/layouts/headers";

//styles
import { theme } from "../themes/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "./../redux/reducers";

//images
import FooterWaveImage from "./../assets/footerWave.png";
import ResetPassword from "./ResetPassword";

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function MainPage() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <Headers />
            <Switch>
              <Redirect exact from="/" to="/register" />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/home" component={LandingPage} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/home/crops/:pod_name" component={CropsPage} />
              <Route exact path="/history" component={HistoryPage} />
              <Route
                exact
                path="/reset/:resetToken"
                component={ResetPassword}
              />
              <Redirect to="/home" />
            </Switch>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default MainPage;
