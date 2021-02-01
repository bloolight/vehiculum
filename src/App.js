import './App.css';
import { Header } from './components/header';
import { Chat } from './components/chat';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="App-body">
        <Chat/>
      </div>
    </div>
  );
}

export default App;
