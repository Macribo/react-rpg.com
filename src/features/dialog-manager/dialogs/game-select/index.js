import React       from 'react';
import { connect } from 'react-redux';

import Button            from '../../../../components/button';
import Dialog            from '../../../../components/dialog';
import Flame             from '../../../../components/flame';
import mainGameDialog    from '../../actions/main-game-dialog';
import endlessGameDialog from '../../actions/endless-game-dialog';
import Solas from './feitheamh1.gif';
import './styles.scss';
const GameSelect = ({ mainGameDialog, endlessGameDialog }) => {
  let welcomes = ['ssSOLASsss...'];
  let actions = ['las solas', 'ar aghaidh'];
  return(
    <Dialog>
      <span className='flex-row game-select__title'>
        {''}
      </span>

      <span className='flex-column game-select__text'>
        {welcomes[0]}
      
      
      
      </span>

      {/* <div className='game-select__flame--1'>
        <Flame />
      </div> */}
      <div className='game-select__flame--2'>
      </div>

      <div className='flex-column game-select__button'>
        <Button
          style={{marginBottom: 16}}
          onClick={mainGameDialog}
          icon={Solas}
          title={actions[0]} > 
        <Flame />
          </Button>

        <Button
          onClick={endlessGameDialog}
          icon='infinity'
          title={'Síar'} />
      </div>


    </Dialog>


);
};

const actions = { mainGameDialog, endlessGameDialog };

export default connect(null, actions)(GameSelect);
