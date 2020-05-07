import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div`
  border: 3px ridge white;
  display: inline-block;
  width: 355px;
`;
const Name = styled.span`
  font-weight: 900;
  align-content: left;
  margin-left: 5px;
  font-size: 100%;
  color: white;
`;
const Bye = styled.span`
  font-size: 14px;
  margin-left: 5px;
  float: right;
  color: silver;
`;
const Wrapper = styled.div`
  padding: 10px;
  border: 4px solid;
`;
const AAV = styled.span`
  float: left;
  margin-top: -2px;
  font-weight: 900;
  font-size: 19px;
  color: silver;
`;
const Rank = styled.span`
  float: left;
  padding-left: 20px;
  color: silver;
`;

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      background: '',
      borderColor: '',
      AAV: '',
    }
  }
  componentDidMount() {
    this.turnColor();
    if (this.props.player.AAV !== '') {
      this.setState({AAV: '$' + this.props.player.AAV});
    }
  }

  onClick(e) {
    if (e.metaKey) {
      this.onRightClick();
    } else {
      if (this.state.background === 'black') {
        this.turnColor();
      } else {
        this.setState({background: 'black'});
      }
    }
  }

  onRightClick() {
    if (this.state.background === 'gold') {
      this.turnColor();
    } else {
      this.setState({background: 'gold'})
    }
  }

  onDoubleClick() {
    this.props.addPlayerToTeam(this.props, this.getRank());
  }

  turnColor() {
    this.setState({background:'grey'})
    var teamColors = {
      ARI: 'brown',
      ATL: 'red',
      BAL: 'purple',
      BUF: 'blue',
      CAR: 'lightblue',
      CHI: 'darkblue',
      CIN: 'orange',
      CLE: 'maroon',
      DAL: 'darkblue',
      DEN: 'blue',
      DET: 'lightblue',
      GB: 'green',
      HOU: 'navy',
      IND: 'blue',
      JAX: 'turquoise',
      KC: 'red',
      LAC: 'lightblue',
      LAR: 'blue',
      LV: 'grey',
      MIA: 'lightblue',
      MIN: 'purple',
      NE: 'silver',
      NO: 'gold',
      NYG: 'blue',
      NYJ: 'green',
      PHI: 'darkgreen',
      PIT: 'yellow',
      SEA: 'darkblue',
      SF: 'red',
      TEN: 'lightblue',
      TB: 'red',
      WAS: 'brown',
    };
    var teamBorderColors = {
      ARI: 'black',
      ATL: 'black',
      BAL: 'black',
      BUF: 'red',
      CAR: 'blue',
      CHI: 'orange',
      CIN: 'black',
      CLE: 'orange',
      DAL: 'lightblue',
      DEN: 'orange',
      DET: 'blue',
      GB: 'yellow',
      HOU: 'maroon',
      IND: 'white',
      JAX: 'green',
      KC: 'gold',
      LAC: 'yellow',
      LAR: 'yellow',
      LV: 'grey',
      MIA: 'orange',
      MIN: 'gold',
      NE: 'blue',
      NO: 'black',
      NYG: 'red',
      NYJ: 'silver',
      PHI: 'green',
      PIT: 'black',
      SEA: 'lightgreen',
      SF: 'gold',
      TEN: 'silver',
      TB: 'brown',
      WAS: 'yellow',
    };
    if (!this.props.player.team) {
      this.setState({background: 'black', borderColor: 'black'})
    } else {
      this.setState({
        background: teamColors[this.props.player.team],
        borderColor: teamBorderColors[this.props.player.team],
      });
    }
  }

  getRank() {
    if (this.props.player.name.slice(0,4) === 'TIER') {
      return;
    }

    var rank;
    var tiers = 0;
    var players = 0;
    for (let i = 0; i < this.props.players.length; i++) {
      if (this.props.players[i].name === this.props.player.name) {
        rank = players + 1;
      } else if (this.props.players[i].name.slice(0,4) === 'TIER') {
        tiers++;
      } else {
        players++;
      }
    }

    if (this.props.player.position === 'QB') {
      return 'QB' + rank.toString();
    }
    if (this.props.player.position === 'RB') {
      return 'RB' + rank.toString();
    }
    if (this.props.player.position === 'WR') {
      return 'WR' + rank.toString();
    }
    if (this.props.player.position === 'TE') {
      return 'TE' + rank.toString();
    }
    if (this.props.player.position === 'DEF') {
      return 'DEF' + rank.toString();
    }
    if (this.props.player.position === 'PK') {
      return 'K' + rank.toString();
    }
  }
  
  render() {
    return (  
      <Draggable draggableId={this.props.player.id} index={this.props.index}>
        {(provided) => (
            <Card onDoubleClick={this.onDoubleClick.bind(this)} onClick={this.onClick.bind(this)} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <Wrapper style={{backgroundColor: this.state.background, borderColor: this.state.borderColor}}>
                <AAV>
                  { this.state.AAV }
                </AAV>
                <Rank>
                  { this.getRank(this.props.index) }
                </Rank> 
                <Name>
                  { this.props.player.name }
                </Name>         
                <Bye>
                  { this.props.player.bye }
                </Bye>
              </Wrapper>                
            </Card>
        )}
      </Draggable>   
    )
  }
}

export default Player;
