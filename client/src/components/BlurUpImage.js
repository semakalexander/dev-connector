import React, { Component } from 'react';
import { string } from 'prop-types';

import '../styles/blur-up.css';

class BlurUpImage extends Component {
  hdImage = null;

  static propTypes = {
    srcLoaded: string,
    srcPreloaded: string
  };

  componentDidMount = () => {
    const { srcLoaded } = this.props;

    const imageLoader = new Image();

    imageLoader.src = srcLoaded;

    imageLoader.onload = () => {
      this.hdImage.setAttribute(
        'style',
        `background-image: url('${srcLoaded}');`
      );

      this.hdImage.classList.add('blur-up-fade-in');
    };
  };

  render() {
    const { srcPreloaded } = this.props;

    return [
      <div
        key="blur-up-loaded"
        className="blur-up-loaded"
        ref={node => (this.hdImage = node)}
      />,
      <div
        key="blur-up-preloaded"
        className="blur-up-preload"
        style={{ backgroundImage: `url('${srcPreloaded}')` }}
      />
    ];
  }
}

export default BlurUpImage;
