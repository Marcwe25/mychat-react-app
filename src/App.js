import logo from './logo.svg';
import './App.css';
import Login from "./containers/authentication/Login";
import AuthRequired from './containers/authentication/AuthRequired';
import "./icons/icons.css"

function App() {
  return (
   <>
    <AuthRequired/>
   </>
  );
}

export default App;
