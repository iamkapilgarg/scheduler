import React from 'react';
import 'components/InterviewerList.scss'
import InterviewerListItem from 'components/InterviewerListItem';
import PropTypes from 'prop-types';

const InterviewerList = (props) => {

  const interviewListArray = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        avatar={interviewer.avatar}
        name={interviewer.name}
        selected={interviewer.id === props.value}
        onChange={event => props.onChange(interviewer.id)}
      />
    );
  })

  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>
      </h4>
      <ul className='interviewers__list'>
        {interviewListArray}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;