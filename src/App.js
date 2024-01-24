import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactList from "./components/ContactList";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* Rendering the ContactList component */}
        <ContactList />

        {/* Rendering the ToastContainer for displaying notifications */}
        <ToastContainer />
      </div>
    </Provider>
  );
}

export default App;
