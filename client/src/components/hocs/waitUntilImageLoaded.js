import React from 'react';

const waitUntilImageLoaded = imageSrc =>
  WrappedComponent =>
    class WaitUntilImageLoaded extends React.Component {
      state = { done: false };

      componentWillMount() {
          const img = new Image();
          img.src = imageSrc;
          img.onload = () => this.setState({ done: true });
      }

      render() {
        return this.state.done ? <WrappedComponent {...this.props} /> : null;
      }
}

export default waitUntilImageLoaded;
