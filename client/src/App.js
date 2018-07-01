import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/Navbar';
import MainContent from './components/MainContent';

import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />

        <MainContent />

        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

export default App;
