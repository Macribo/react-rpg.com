import React       from 'react';
import { connect } from 'react-redux';

import GameMusic    from './game-music';
import GameSettings from './game-settings';
import Inventory    from '../inventory';
import Snackbar     from '../snackbar';
import Stats        from '../stats';
import {BtnB} from '../../components/ui/btn-b';

import './styles.scss';

const GameMenus = ({ appState, dialog }) => {

  const { sideMenu, largeView } = appState;
  const { gameOver, gameStart, paused, inventory, settings } = dialog;

  // disable the inventory button when we are in settings or paused and not in the inventory
  const disableInventory = settings || (paused && !inventory);
  // disable the stats view when in game start or game over or settings
  const disableStats = gameStart || gameOver || settings;
let incrementStory = () =>{alert(1)}
let decrementStory = () =>{alert(0)}
  return(
    <div className='flex-row centered'>
      <div className={`game-menu__container ${sideMenu ? 'flex-column' : 'flex-row'}`}
        style={{
          maxWidth: largeView ? 400 : 350,
          paddingLeft: sideMenu ? 8 : 0,
          height: sideMenu ? '380px' : 'unset',
          justifyContent: disableInventory ? 'flex-end' : 'center'
        }}>

        <Stats
          largeView={largeView}
          sideMenu={sideMenu}
          disabled={disableStats} />

        <Inventory
          sideMenu={sideMenu}
          disabled={disableInventory} />

        <Snackbar
          largeView={largeView}
          sideMenu={sideMenu} />

        <div className='flex-column'>
          <GameMusic sideMenu={sideMenu} />
          <GameSettings />
          <BtnB />
          <div className="directional-pad-hist">
                    <div className='grid-container'>

                        <div className="grid-item"></div>
                        <div className="grid-item" id="north"  onMouseUp={incrementStory} onTouchEnd={ incrementStory}  >


                        </div>
                        <div className="grid-item" ></div>
                        <div className="grid-item" id="west"  onMouseUp={decrementStory} onTouchEnd={ decrementStory}  >
                        </div>
                        <div className="grid-item" ><div className="btn-middle-history" /></div>
                        <div className="grid-item" id="east"  onMouseUp={incrementStory} onTouchEnd={ incrementStory}  >

                        </div>
                        <div className="grid-item"></div>
                        <div className="grid-item" id="south"
                        onMouseUp={decrementStory} onTouchEnd={ decrementStory} >
                        </div>
                        <div className="grid-item"></div>
                    </div>
                </div>

        </div>

      </div>
    </div>
  );
};

const mapStateToProps = ({ appState, dialog }) => ({ appState, dialog });

export default connect(mapStateToProps)(GameMenus);