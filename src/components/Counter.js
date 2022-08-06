import React from 'react';
import { bool, func } from 'prop-types';

class Counter extends React.Component {
  constructor() {
    super();
    this.state = { counter: 30 };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    const { action } = this.props;

    this.timer = setInterval(() => {
      this.setState(
        (prev) => ({ counter: prev.counter > 0 ? prev.counter - 1 : 0 }),
        () => {
          const { counter } = this.state;
          const { stop } = this.props;
          if (counter === 0 || stop) { action(); clearInterval(this.timer); }
        },
      );
    }, ONE_SECOND);
  }

  componentWillUnmount() { clearInterval(this.timer); }

  render() {
    const { counter } = this.state;
    return (
      <div>
        <p>
          Timer:
          {' '}
          {counter}
        </p>
      </div>
    );
  }
}

Counter.defaultProps = {
  action: () => {},
  stop: false,
};

Counter.propTypes = {
  action: func,
  stop: bool,
};

export default Counter;
