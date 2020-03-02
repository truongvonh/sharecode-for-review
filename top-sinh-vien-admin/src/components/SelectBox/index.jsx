import React from 'react';
import { 
  Form
} from 'react-bootstrap';
import { array, string } from 'prop-types';

const selectType = {
  round: 'round',
  team: 'team',
  battle: 'battle',
};

const checkType = (type, item) => {
  if (type === selectType.round) return item.title;
  if (type === selectType.team) return item.school && item.school.name;
  if (type === selectType.battle) return item.battle_id && item.battle_id.name_battle;
  return item.name;
};

const SelectBox = ({ type, allSelect, ...props }) => {
  return (
    <Form.Group>
      <Form.Control 
        as="select" 
        { ...props }
      >
        { allSelect.length ? allSelect.map((item, index) => (
          <option 
            key={index} 
            value={item._id || item.name}
          >
            {checkType(type, item) }
          </option>
        )) : <option value="">No value</option> }
      </Form.Control>
    </Form.Group>
  );
};

SelectBox.propTypes = {
  allSelect: array,
  type: string,
};

export default SelectBox;
