import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "components/InterviewerListItem";

const InterviewerList = (props) => {

  const interviewListArray = props.interviewers.map(interviewer => {
    
    let selectedName = '';
    if(props.interviewer) {
      if(interviewer.id === props.interviewer) {
        selectedName = interviewer.name;
      }
    }

    return (
        <InterviewerListItem
          avatar={interviewer.avatar}
          name={interviewer.name}
          setInterviewer={interviewer.setInterviewer}
          selectedName={selectedName}
        />
    );
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">
      </h4>
      <ul className="interviewers__list">
      {interviewListArray}
      </ul>
    </section>
  );
}

export default InterviewerList;