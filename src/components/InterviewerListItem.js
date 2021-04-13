import React from "react";
import "components/InterviewerListItem.scss"

const InterviewerListItem = (props) => {

  let name='';
  if(props.selected) {
    name = props.name;
  }

  return (
    <li className={props}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
        onClick={()=>props.setInterviewer()}
      />
    {name}
    </li>
  );
}

export default InterviewerListItem;