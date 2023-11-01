import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import Body from './Components/Body/Body';
import { Provider } from 'react-redux';
import { store } from './Redux/store';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Header></Header>
        <div className="main-div">
          <Body></Body>
        </div>
      </div>
    </Provider>

  );
}

export default App;
