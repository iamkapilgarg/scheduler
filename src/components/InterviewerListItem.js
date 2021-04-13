import React from "react";
import "components/InterviewerListItem.scss";
import classnames from "classnames";

const InterviewerListItem = (props) => {

  const interviewerListItemClassList = classnames("interviewers__item",{
    "interviewers__item--selected": props.selectedName
  });

  const interviewerListItemClassImage = classnames("interviewers__item-image",{
    "interviewers__item-image--selected": props.selectedName
  });

  return (
    <li className={interviewerListItemClassList}>
      <img
        className={interviewerListItemClassImage}
        src={props.avatar}
        alt={props.name}
        onClick={()=>props.setInterviewer()}
      />
    {props.selectedName}
    </li>
  );
}

export default InterviewerListItem;