const React = require('react');
const ReactDOM = require('react-dom');
require('enable-browser-mode');

class Test extends React.Component {

	state = {
  	total: 0
  };
  
  render() {
    return React.createElement('div', 'total: ', this.state.total);
  }
}

ReactDOM.render(
  React.createElement(Test, null),
  document.body
);
