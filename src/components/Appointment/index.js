import React from 'react';
import 'components/Appointment/styles.scss'
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from 'components/Appointment/Form'
import Status from 'components/Appointment/Status'


const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';


const Appointment = (props) => {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    })
    transition(SAVING);
  }

  function deleteInterview() {
    props.deleteInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
    transition(DELETING)
  }

  return (
    <article className='appointment'>
      <Header
        time={props.time}
      />
      {mode === SAVING && <Status message='Saving...'/>}
      {mode === DELETING && <Status message='Deleting...'/>}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteInterview}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}
    </article>
  );
}

export default Appointment;