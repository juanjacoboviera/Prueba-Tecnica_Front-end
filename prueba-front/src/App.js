import "./App.css";
import "primeicons/primeicons.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <PrimeReactProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:name" element={<UserProfile />} />
          </Routes>
        </BrowserRouter>
      </PrimeReactProvider>
    </Provider>
  );
}

export default App;
