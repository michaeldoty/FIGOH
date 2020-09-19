import React from 'react';
import './App.css';
import LiveVideo from './components/LiveVideo';
import Avatar from './components/Avatar';
import RecordButton from './components/RecordButton';
import RecordView from './components/RecordView';
import SearchBar from './components/SearchBar';
import ArchVid from './components/ArchVid';
import { Provider } from 'react-redux';
import store from './store';
import logo from './assets/icon2.png';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <div className='App'>
          <span className='topBar'>
            <img src={logo} className='logo' alt='FIGOH' />
            <header className='header'>
              <div className='center-text'>FIGOH</div>
            </header>
          </span>
          <div className='liveVideo'>
            <RecordView />
            <LiveVideo />
            <RecordButton />
          </div>
          <div className='statusBar'>
            <Avatar class='avatarButton' name='' />
            <SearchBar />
          </div>
          <ArchVid />
        </div>
      </div>
    </Provider>
  );
};

export default App;
