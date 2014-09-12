/**@jsx React.DOM*/
'use strict';
var xOBox = React.createClass({
  initUpdate: function(){
    this.props.update(this.props.ref);
  },
  render: function(){
    return (
        <button onClick={this.initUpdate} ref={this.props.ref}>{this.props.mark}</button>
      );
  }
});

var xORow = React.createClass({
  
  clickUpdate: function(ref){
    this.props.update(ref);
  },
  render: function(){
    var parent = this;
    var boxes = this.props.info.map(function(val){
      return <xOBox update={parent.clickUpdate} ref={val[0]} mark={val[1]}/>
    })
    return (
      <div>
        {boxes}
      </div>
      );
  }
});

var xOBoard = React.createClass({
  getInitialState : function(){
    return {
      clicks: 0,
      data: [
        [[0, '–'], [1, '–'], [2,'–']],
        [[3, '–'], [4, '–'], [5,'–']],
        [[6, '–'], [7, '–'], [8,'–']]
      ]
    }
  },
  updateState: function(ref){
    this.state.clicks = (this.state.clicks + 1)%2;
    var indexY = (ref - ref%3)/3;
    var indexX = ref % 3;
    this.state.data[indexY][indexX][1] = this.state.clicks%2 ? 'X' : 'O';
    this.setState({
      data: this.state.data
    });

  },
  render: function(){
    var parent = this;
    var rows = this.state.data.map(function(row){
      return <xORow info={row} update={parent.updateState}></xORow>
    })
    return (
      <div>
        {rows}
      </div>
      );
  }
})

React.renderComponent(<xOBoard/>, document.body);
