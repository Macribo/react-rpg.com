import React, { useState } from 'react';
import { connect }         from 'react-redux';

import Button        from '../button';
import ConfirmDialog from '../confirm-dialog';
import EmptySlot     from '../empty-slot';
import MicroDialog   from '../micro-dialog';
import StatsItem     from './stats-item';
import uuidv4        from '../../utils/uuid-v4';

import consumePotion from '../../features/inventory/actions/consume-potion';
import buyItem       from '../../features/inventory/actions/buy-item';
import dropItem      from '../../features/inventory/actions/drop-item';
import equipItem     from '../../features/inventory/actions/equip-item';
import unequipItem   from '../../features/inventory/actions/unequip-item';
import sellItem      from '../../features/inventory/actions/sell-item';

import './styles.scss';

const ViewItem = ({ sell, buy, onClose, data, stats, unequipItem, buyItem,
                    equipItem, dropItem, consumePotion, sellItem, open }) => {

  const [confirmPotion, setConfirmPotion] = useState(false);
  const [confirmDrop, setConfirmDrop] = useState(false);
  const [confirmSell, setConfirmSell] = useState(false);
  const [confirmBuy, setConfirmBuy] = useState(false);

  if(!open) return null;

  const itemStats = [];
  let itemIsEquipped = false;
  const equipped = stats.equippedItems;

  // find the type of item
  switch(data.type) {

    case 'upgrade::backpack':
      itemStats.push(<StatsItem stats={{ name: 'slots', value: data.slots }} key={uuidv4()} />);
      break;

    case 'potion':
      itemStats.push(<StatsItem stats={{ name: 'leigheas', value: Math.ceil((data.hp / stats.maxHp) * 100) }} key={uuidv4()} />);
      break;

    case 'uirlis':
      itemIsEquipped = (JSON.stringify(equipped.weapon) === JSON.stringify(data));
      itemStats.push(<StatsItem stats={{ name: 'damáiste', value: data.damage }} key={uuidv4()} />);
      // if there's a bonus
      if(data.bonus) {
        const [bonusType] = data.bonus.split('::');
        const bonusMult = parseFloat(data.bonus.split('::')[1], 10);
        itemStats.push(<StatsItem stats={{ name: `VS. ${bonusType}`, value: `${bonusMult}x` }} key={uuidv4()} />);
      }
      break;

    case 'ring':
      itemIsEquipped = (JSON.stringify(equipped.ring) === JSON.stringify(data));
      // find each effect
      Object.keys(data.effect).forEach(name => {
        itemStats.push(<StatsItem stats={{ name, value: data.effect[name] }} key={uuidv4()} />);
      });
      break;

    case 'armor::helmet':
      itemIsEquipped = (equipped.armor && JSON.stringify(equipped.armor.helmet) === JSON.stringify(data));
      itemStats.push(<StatsItem stats={{ name: 'cosaint', value: data.defence }} key={uuidv4()} />);
      break;

    case 'armor::body':
      itemIsEquipped = (equipped.armor && JSON.stringify(equipped.armor.body) === JSON.stringify(data));
      itemStats.push(<StatsItem stats={{ name: 'cosaint', value: data.defence }} key={uuidv4()} />);
      break;

    case 'armor::gloves':
      itemIsEquipped = (equipped.armor && JSON.stringify(equipped.armor.gloves) === JSON.stringify(data));
      itemStats.push(<StatsItem stats={{ name: 'cosaint', value: data.defence }} key={uuidv4()} />);
      break;

    case 'armor::boots':
      itemIsEquipped = (equipped.armor && JSON.stringify(equipped.armor.boots) === JSON.stringify(data));
      itemStats.push(<StatsItem stats={{ name: 'cosaint', value: data.defence }} key={uuidv4()} />);
      break;

    case 'armor::pants':
      itemIsEquipped = (equipped.armor && JSON.stringify(equipped.armor.pants) === JSON.stringify(data));
      itemStats.push(<StatsItem stats={{ name: 'cosaint', value: data.defence }} key={uuidv4()} />);
      break;

    default:
  }

  let ViewItemButtons = null;

  if(buy) ViewItemButtons = (
    <Button
      onClick={() => setConfirmBuy(true)}
      icon='coins'
      title={'Buy Item'} />
  );
  else if(sell) ViewItemButtons = (
    <Button
      onClick={() => setConfirmSell(true)}
      icon='coins'
      title={'Sell Item'} />
  );
  else if(itemIsEquipped) ViewItemButtons = (
    <Button
      onClick={() => {
        unequipItem(data);
        onClose();
      }}
      icon='archive'
      title={'Dí-fheistigh'} />
  );
  else ViewItemButtons = (
    <>
      <Button
        onClick={() => setConfirmDrop(true)}
        icon='trash'
        title={'chait uaim é'} />

      {
        data.type === 'potion' ?
          <Button
            onClick={() => setConfirmPotion(true)}
            icon='medkit'
            title={'ól'} />
          :
          <Button
            onClick={() => {
              equipItem(data);
              onClose();
            }}
            icon='hand-paper'
            title={'feistigh'} />
      }
    </>
  );

  return(
    <MicroDialog onClose={onClose}>

      <div className='view-item__title'>
        <EmptySlot className='white-border view-item__image'>
          <div style={{
              backgroundImage: `url('${data.image}')`,
              width: '40px',
              height: '40px'
            }} />
        </EmptySlot>

        <span className='view-item__text'>
          { data.name || '-' }
        </span>
      </div>

      <div className='flex-column view-item__stats'>
        { itemStats }
      </div>

      <div className='flex-column view-item__button-container'>
        <div className='flex-row view-item__button'>
          { ViewItemButtons }
        </div>
      </div>

      <ConfirmDialog
        open={confirmDrop}
        text={'An bhfuil tú cinnte!? Ní beidh fáil agat arís ar...'}
        cancelText={'coimeád é'}
        cancelIcon={'archive'}
        acceptText={'chaith uaim é'}
        acceptIcon={'trash'}
        confirm={() => {
          dropItem(data);
          setConfirmDrop(false);
          onClose();
        }}
        onClose={() => setConfirmDrop(false)} />

      <ConfirmDialog
        open={confirmSell}
        text={`An míann leat ${data.name} a dhíoll i gcomhair ${Math.ceil(data.value / 2)}?`}
        cancelText={'Ní míann liom'}
        acceptText={'Is mhíann liom'}
        acceptIcon={'coins'}
        confirm={() => {
          sellItem(data);
          setConfirmSell(false);
          onClose();
        }}
        onClose={() => setConfirmSell(false)} />

      <ConfirmDialog
        open={confirmBuy}
        text={`An míann leat ${data.name} a cheannacht ar ${data.value} ?`}
        cancelText={'ní míann liom'}
        acceptText={'is míann liom'}
        acceptIcon={'coins'}
        confirm={() => {
          buyItem(data);
          setConfirmBuy(false);
          onClose();
        }}
        onClose={() => setConfirmBuy(false)} />

      <ConfirmDialog
        open={confirmPotion}
        text={`An míann leat do ${data.name} a usáid anois?`}
        cancelText={'Ní anois'}
        acceptText={'Is mían liom'}
        acceptIcon={'medkit'}
        confirm={() => {
          consumePotion(data);
          setConfirmPotion(false);
          onClose();
        }}
        onClose={() => setConfirmPotion(false)} />

    </MicroDialog>
  );
};

const mapStateToProps = ({ stats }) => ({ stats });

const actions = { buyItem, consumePotion, dropItem, equipItem, unequipItem, sellItem };

export default connect(mapStateToProps, actions)(ViewItem);
