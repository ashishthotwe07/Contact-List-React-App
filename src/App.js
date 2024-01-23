import ContactList from "./components/ContactList";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ContactList />
      </div>
    </Provider>
  );
}

export default App;
