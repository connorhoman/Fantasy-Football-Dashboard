import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import PlayerList from './components/PlayerList.jsx';

const Background = styled.div`
  font-family: 'Courier New', Courier, monospace;
  font-size: 15px;
  text-align: center;
  display: flex;
  margin-top: 8px;
`;
const List = styled.span`
  border-right: 2px ridge black;
`;
const Header = styled.div`
  background-color: black;
  font-size: 20px;
  color: white;
`;
const Title = styled.div`
  background-color: black;
  font-family: 'Courier New', Courier, monospace;
  font-size: 20px;
  font-weight: bold;
  color: white;
  align-content: center;
  display: inline;
`;
const Players = styled.span`
  color: white;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 900;
  padding-left: 5px;
`;
const Position = styled.span`
  color: gold;
`;
const Info = styled.span`
  float: left;
  padding-bottom: 10px;
  padding-right: 100px;
`;
const Team = styled.span`
  font-size: 14px;
`;
const User = styled.div`
  align-content: center;
  display: inline;
  font-family: 'Courier New', Courier, monospace;
  font-size: 12px;
  color: white;
  padding-left: 125px;
`;
const Input = styled.input`
  font-family: 'Courier New', Courier, monospace;
  font-size: 20px;
  background-color: lightgrey;
  margin-top: 25px;
`;
const Wrapper = styled.div`
`;
const Find = styled.button`
  font-family: 'Courier New', Courier, monospace;
  margin-left: 5px;
  font-size: 20px;
  background-color: lightgrey;
`;
const Save = styled.button`
  font-family: 'Courier New', Courier, monospace;
  margin-right: 20px;
  font-size: 20px;
  background-color: lightgrey;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: '',
      userRanking: '',
      qb: [],
      rb: [],
      wr: [],
      te: [],
      def: [],
      k: [],
      teamqb: [],
      teamrb: [],
      teamwr: [],
      teamte: [],
      teamdef: [],
      teamk: []
    }
  }
  
  componentDidMount() {
    $.ajax({
      url: '/players', 
      success: (data) => {
        var sorted = data.sort(function(a,b) {
          return a.rank - b.rank;
        });
        var qbs = sorted.filter(player => player.position === 'QB');
        var rbs = sorted.filter(player => player.position === 'RB');
        var wrs = sorted.filter(player => player.position === 'WR');
        var tes = sorted.filter(player => player.position === 'TE');
        var defs = sorted.filter(player => player.position === 'DEF');
        var ks = sorted.filter(player => player.position === 'K');
        this.setState({
          user: 'ESPN',
          userRanking: '',
          qb: qbs,
          rb: rbs,
          wr: wrs,
          te: tes,
          def: defs,
          k: ks,
          teamqb: [],
          teamrb: [],
          teamwr: [],
          teamte: [],
          teamdef: [],
          teamk:[],
        });
        this.findRankings();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  findRankings() {
    $.ajax({
      url: `/rankings/${this.state.user}`,
      success: (data) => {
        if (data) {
          console.log('Successfully loaded', data[0].user, 's rankings');
          this.setState(data[0]);
          this.setState({userRanking: data[0].user});
        } else {
          this.handleNotFound();
        } 
        
      },
      error: (err) => {
        console.log('Failed to speak to database', err);
      }
    });
  }

  handleNotFound() {
    window.alert('User Not Found');
  }

  saveRankings() {

    $.ajax({
      url: '/rankings',
      type: 'POST',
      data: {
        user: this.state.user,
        userRanking: this.state.userRanking,
        qb: this.state.qb,
        rb: this.state.rb,
        wr: this.state.wr,
        te: this.state.te,
        def: this.state.def,
        k: this.state.k
      },
      success: () => {
        window.alert(`Successfully Saved ${this.state.user}'s Rankings`);
      },
      error: (err) => {
        console.log('Failed to save rankings', err);
      }
    });
  }

  onDragEnd(result) {
    const destination = result.destination;
    const source = result.source;
    const droppableId = result.destination.droppableId;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
    const players = this.state[droppableId];
    const newRanks = Array.from(players);
    newRanks.splice(source.index, 1);
    newRanks.splice(destination.index, 0, players[source.index]);
    this.setState({[droppableId]: newRanks});
  }

  addPlayerToTeam(player, rank) {
    if (player.player.position === 'QB') {
      let currentTeam = this.state.teamqb;
      currentTeam.push(rank + ':' + player.player.name);
      this.setState({teamqb: currentTeam});
    }
    if (player.player.position === 'RB') {
      let currentTeam = this.state.teamrb;
      currentTeam.push(rank + ':' + player.player.name);
      this.setState({teamrb: currentTeam});
    }
    if (player.player.position === 'WR') {
      let currentTeam = this.state.teamwr;
      currentTeam.push(rank + ':' + player.player.name);
      this.setState({teamwr: currentTeam});
    }
    if (player.player.position === 'TE') {
      let currentTeam = this.state.teamte;
      currentTeam.push(rank + ':' + player.player.name);
      this.setState({teamte: currentTeam});
    }
    if (player.player.position === 'DEF') {
      let currentTeam = this.state.teamdef;
      currentTeam.push(rank + ':' + player.player.name);
      this.setState({teamdef: currentTeam});
    }
    if (player.player.position === 'K') {
      let currentTeam = this.state.teamk;
      currentTeam.push(player.player.name + rank);
      this.setState({teampk: currentTeam});
    }

  }

  render () {
    return (
      <div>
        <Info>
          <Wrapper>
            <Title>Fantasy Football Draft Dashboard</Title>
          </Wrapper>
          <Wrapper>
            <User>showing {this.state.userRanking}'s ranks</User>
          </Wrapper>
          <Input placeholder='Username' onChange={(e) => this.setState({user: e.target.value})}/>
          <Find onClick={this.findRankings.bind(this)}>Find</Find>      
          <Save onClick={this.saveRankings.bind(this)}>Save</Save> 
        </Info>
        <Team>         
          <div>
            <Position>QB:</Position>
            <Players>{this.state.teamqb.toString()}</Players>
          </div>
          <div>
            <Position>RB:</Position>
            <Players>{this.state.teamrb.toString()}</Players>
          </div>
          <div>
            <Position>WR:</Position>
            <Players>{this.state.teamwr.toString()}</Players>
          </div>
          <div>
            <Position>TE:</Position>
            <Players>{this.state.teamte.toString()}</Players>
          </div>
          <div>
            <Position>DEF:</Position>
            <Players>{this.state.teamdef.toString()}</Players>
          </div>
            <Position>K:</Position>
          <div>
            <Players>{this.state.teamk.toString()}</Players>
          </div>
        </Team>
        <Background>
          <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
            <List>
              <Header>
                Quarterbacks
              </Header>
              <PlayerList addPlayerToTeam={this.addPlayerToTeam.bind(this)} key={1} id={'qb'} players={this.state.qb}/>
            </List>
            <List>
              <Header>
                Running Backs
              </Header>
              <PlayerList addPlayerToTeam={this.addPlayerToTeam.bind(this)} key={2} id={'rb'} players={this.state.rb}/>
            </List>
            <List>
              <Header>
                Wide Recievers
              </Header>
              <PlayerList addPlayerToTeam={this.addPlayerToTeam.bind(this)} key={3} id={'wr'} players={this.state.wr}/>
            </List>
            <List>
              <Header>
                Tight Ends
              </Header>
              <PlayerList addPlayerToTeam={this.addPlayerToTeam.bind(this)} key={4} id={'te'} players={this.state.te}/>
            </List>
            <List>
              <Header>
                Defenses
              </Header>
              <PlayerList addPlayerToTeam={this.addPlayerToTeam.bind(this)} key={5} id={'def'} players={this.state.def}/>
            </List>
            <List>
              <Header>
                Kickers
              </Header>
              <PlayerList addPlayerToTeam={this.addPlayerToTeam.bind(this)} key={6} id={'k'} players={this.state.k}/>
            </List>         
          </DragDropContext>   
        </Background> 
      </div>    
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
