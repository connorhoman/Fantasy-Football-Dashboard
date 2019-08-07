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
  color: #525151;
`;
const Team = styled.span`
  float: right;
`;
const Img = styled.div`
  margin-top: -7px;
  padding-right: 25px;
  opacity: .7;
`;
const Bye = styled.span`
  font-size: 14px;
  margin-left: 5px;
  float: right;
  color: #525151;
`;
const Wrapper = styled.div`
  padding: 10px;
`;
const AAV = styled.span`
  float: left;
  margin-top: -2px;
  font-weight: 900;
  font-size: 19px;
  color: darkgreen;
`;
const Rank = styled.span`
  float: left;
  padding-left: 20px;
`;

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      background: '',
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
    this.props.addPlayerToTeam(this.props);
  }

  turnColor() {
    if (this.props.player.position === 'QB') {
      this.setState({background: '#ffa8ab'});
    }
    if (this.props.player.position === 'RB') {
      this.setState({background: '#bed8ff'});
    }
    if (this.props.player.position === 'WR') {
      this.setState({background: '#a6ff8e'});
    }
    if (this.props.player.position === 'TE') {
      this.setState({background: '#fff5a7'});
    }
    if (this.props.player.position === 'DEF') {
      this.setState({background: '#ffc986'});
    }
    if (this.props.player.position === 'PK') {
      this.setState({background: '#ffbef5'});
    }
    if (this.props.player.name.slice(0,4) === 'TIER') {
      this.setState({background: 'grey'});
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
              <Wrapper style={{backgroundColor: this.state.background}}>
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
                <Team>
                  <Img>
                    <img height='29px' width='29px' src={this.props.player.url}></img>
                  </Img>              
                </Team>
              </Wrapper>                
            </Card>
        )}
      </Draggable>   
    )
  }
}

export default Player;
