import React from 'react';
import 'components/InterviewerListItem.scss';
import classnames from 'classnames';

const InterviewerListItem = (props) => {

  const interviewerListItemClassList = classnames('interviewers__item',{
    'interviewers__item--selected': props.selected
  });

  const interviewerListItemClassImage = classnames('interviewers__item-image',{
    'interviewers__item-image--selected': props.selected
  });

  return (
    <li className={interviewerListItemClassList} onClick={props.onChange}>
      <img
        className={interviewerListItemClassImage}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}

export default InterviewerListItem;