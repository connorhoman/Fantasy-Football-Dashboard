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
        this.setState({background: 'black', borderColor: 'black'});
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
      ARI: '#97233F',
      ATL: '#C8102E',
      BAL: '#241773',
      BUF: '#00338D',
      CAR: '#0085CA',
      CHI: '#0B162A',
      CIN: '#FB4F14',
      CLE: '#311D00',
      DAL: '#003594',
      DEN: '#FB4F14',
      DET: '#0076B6',
      GB: '#203731',
      HOU: '#03202F',
      IND: '#003087',
      JAX: '#006778',
      KC: '#E31827',
      LAC: '#002A5E',
      LAR: '#002244',
      LV: '#000000',
      MIA: '#008E97',
      MIN: '#4F2683',
      NE: '#012169',
      NO: '#D3BC8D',
      NYG: '#0B2265',
      NYJ: '#046A38',
      PHI: '#004C54',
      PIT: '#FFB612',
      SEA: '#002244',
      SF: '#AA0000',
      TEN: '#0C2340',
      TB: '#D50A0A',
      WAS: '#773141',
      FA: 'white'
    };
    var teamBorderColors = {
      ARI: '#000000',
      ATL: '#000000',
      BAL: '#000000',
      BUF: '#C60C30',
      CAR: '#000000',
      CHI: '#C83803',
      CIN: '#000000',
      CLE: '#FF3C00',
      DAL: '#041E42',
      DEN: '#002244',
      DET: '#B0B7BC',
      GB: '#FFB612',
      HOU: '#A71930',
      IND: '#A2AAAD',
      JAX: '#D7A22A',
      KC: '#FFB81C',
      LAC: '#FFC20E',
      LAR: '#866D4B',
      LV: '#A5ACAF',
      MIA: '#FC4C02',
      MIN: '#FFC62F',
      NE: '#C8102E',
      NO: '#000000',
      NYG: '#A71930',
      NYJ: '#FFF',
      PHI: '#A5ACAF',
      PIT: '#000000',
      SEA: '#69BE28',
      SF: '#B3995D',
      TEN: '#4B92DB',
      TB: '#34302B',
      WAS: '#FFB612',
      FA: 'black'
    };
    if (!this.props.player.team) {
      this.setState({background: 'black', borderColor: 'white'})
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
