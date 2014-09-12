/**@jsx React.DOM*/
'use strict';
var xOBox = React.createClass({
  getInitialState: function(){
    return {
      clicks: 0,
      mark: '–'
    };
  },
  render: function(){
    return (
        <button onClick={this.updateOnClick}>{this.state.mark}</button>
      );
  },
  updateOnClick: function(){
    var newClicks = (this.state.clicks + 1)%2;
    var newMark; 
    if(newClicks === 1){
      newMark = 'X';
    } else {
      newMark = 'O';
    }
    this.setState({
      clicks: newClicks,
      mark: newMark
    });
  }
});

var xORow = React.createClass({
  render: function(){
    return (
      <div>
        <xOBox/><xOBox/><xOBox/>
      </div>
      );
  }
});

var xOBoard = React.createClass({
  render: function(){
    return (
      <div>
        <xORow/><xORow/><xORow/>
      </div>
      );
  }
})

React.renderComponent(<xOBoard/>, document.body);
