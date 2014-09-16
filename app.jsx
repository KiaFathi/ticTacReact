/**@jsx React.DOM*/
'use strict';
var xOBox = React.createClass({
  initUpdate: function(){
    this.props.update(this.props.key);
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
    var boxes = this.props.key.map(function(val){
      return <xOBox update={parent.clickUpdate} key={val[0]} mark={val[1]}/>
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
      data: this.props.data
    }
  },
  resetState: function(){
    this.setState({
      clicks: 0,
      data: [
        [[0, '–'], [1, '–'], [2,'–']],
        [[3, '–'], [4, '–'], [5,'–']],
        [[6, '–'], [7, '–'], [8,'–']]
      ]
    });
  },
  updateState: function(ref){
    var indexY = (ref - ref%3)/3;
    var indexX = ref % 3;
    if(this.state.data[indexY][indexX][1] === '–'){
      this.state.clicks = (this.state.clicks + 1)%2;
      this.state.data[indexY][indexX][1] = (this.state.clicks%2 ? 'X' : 'O')
      this.setState({
        data: this.state.data
      });      
    }
    var solved = isSolved(this.state.data);
    if(solved === 'X' || solved === 'O'){
      alert(solved + ' Wins!!!');
      this.resetState();
    } else if(solved === -1){
      alert('Cat\'s Game :-(');
      this.resetState();
    }    

  },
  render: function(){
    var parent = this;
    var rows = this.state.data.map(function(row){
      return <xORow key={row} update={parent.updateState}></xORow>
    })
    return (
      <div>
        {rows}
      </div>
      );
  }
})

var boardData = [
        [[0, '–'], [1, '–'], [2,'–']],
        [[3, '–'], [4, '–'], [5,'–']],
        [[6, '–'], [7, '–'], [8,'–']]
      ];


function isSolved(board) {
  // TODO: Check if the board is solved!
  function checkRow(row){
    if(row[0][1] === row[1][1] && row[1][1] === row[2][1]){
      return row[0][1];
    }
  }
  function checkCol(col){
    if(board[0][col][1] === board[1][col][1] && board[1][col][1] === board[2][col][1]){
      return board[0][col][1];
    }
  }
  function checkDiags(){
    if(board[0][0][1] === board[1][1][1] && board[1][1][1] === board[2][2][1]){
      return board[0][0][1];
    }
    if(board[2][0][1] === board[1][1][1] && board[1][1][1] === board[0][2][1]){
      return board[2][0][1];
    }
  }
  //Check rows/col wins
  for(var i = 0; i < board.length; i++){
    if(checkRow(board[i])){
      return checkRow(board[i]);
    }
    if(checkCol(i)){
      return checkCol(i);
    }    
  }
  //checkDiags
  if(checkDiags()){
    return checkDiags();
  }
  
  //Check if not complete
  for(var i = 0; i < 9; i++){
    var indX = i%3;
    var indY = (i - i%3)/3;
    if(board[indY][indX][1] === '–'){
      return 0;
    }
  }
  
  //if cat's game
  return -1;
  
}



React.renderComponent(<xOBoard data={boardData}/>, document.body);
