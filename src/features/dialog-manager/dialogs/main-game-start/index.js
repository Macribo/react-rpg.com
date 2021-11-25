import React       from 'react';
import { connect } from 'react-redux';

import Button        from '../../../../components/button';
import Dialog        from '../../../../components/dialog';
import backToSelect  from '../../actions/back-to-select';
import startMainGame from '../../../world/actions/start-main-game';

import './styles.scss';

const MainGameStart = ({ startMainGame, backToSelect }) => {
  let flavorText = ['Lorem ipsum']
  return(
    <Dialog
      goBack={backToSelect}
      onKeyPress={startMainGame}>

      <span className='flex-row game-start__title'>
        {flavorText[0]}     </span>

      <span className='flex-column game-start__text'>
        {'lorem ipsum'}
      </span>

      <div className='flex-column game-start__button'>
        <Button
          onClick={startMainGame}
          title={'Ar Aghaidh'} />
      </div>

    </Dialog>
  );
};

const actions = { backToSelect, startMainGame };

export default connect(null, actions)(MainGameStart);
