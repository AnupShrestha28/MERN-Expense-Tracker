import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GlobalStyle } from "./styles/GlobalStyle";
import { GlobalProvider } from "./context/GlobalContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <GlobalStyle />
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </>
);
