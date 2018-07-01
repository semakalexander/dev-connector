import React from 'react';
import { NavLink } from 'react-router-dom';

import waitUntilImageLoaded from './hocs/waitUntilImageLoaded';

import BlurUpImage from './BlurUpImage';
import Preloaded from '../img/background-tiny-preload.jpg';
import Loaded from '../img/background.jpg';

const Landing = () => (
  <div className="landing">
    <BlurUpImage srcPreloaded={Preloaded} srcLoaded={Loaded} />
    <div className="dark-overlay landing-inner text-light">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="display-4 mb-4">Developer Connector</h1>
            <p className="lead">
              Create a developer profile/portfolio, share posts and get help
              from other developers
            </p>

            <NavLink className="btn btn-lg btn-info mr-2" to="/signup">
              Sign Up
            </NavLink>
            <NavLink className="btn btn-lg btn-light" to="/signin">
              Sign In
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default waitUntilImageLoaded(Preloaded)(Landing);
