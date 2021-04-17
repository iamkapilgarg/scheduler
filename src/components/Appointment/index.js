import React from 'react';
import 'components/Appointment/styles.scss'
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from 'components/Appointment/Form'
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error'


const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const EDITING = 'EDITING';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';


const Appointment = (props) => {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview, true)
    .then(() => {
      transition(SHOW);
    })
    .catch((error) => {
      transition(ERROR_SAVE, true);
    })
    transition(SAVING);
  }

  const confirmDelete = () => {
    props.deleteInterview(props.id)
      .then(() => {
        transition(EMPTY);
      }).catch((error) => {
        console.log(error)
        transition(ERROR_DELETE, true);
      })
    transition(DELETING, true);
  }

  const edit = () => {
    transition(EDIT);
  }

  const editBookingInDB = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview, false).then(() => {
      transition(SHOW);
    }).catch((error) => {
      transition(ERROR_SAVE, true);
    })
    transition(EDITING);
  }

  const deleteInterview = () => {
    transition(CONFIRM);
  }

  return (
    <article className='appointment'>
      <Header
        time={props.time}
      />
      {mode === ERROR_DELETE && <Error message='Error while deleting appointment' onClose={()=>back()}/>}
      {mode === ERROR_SAVE && <Error message='Error while saving appointment' onClose={()=>back()}/>}
      {mode === CONFIRM && <Confirm onConfirm={confirmDelete} onCancel={() => back()} message='Are you sure you would like to delete?' />}
      {mode === SAVING && <Status message='Saving...' />}
      {mode === DELETING && <Status message='Deleting...' />}
      {mode === EDITING && <Status message='Editing...' />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteInterview}
          onEdit={edit}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={() => back()} onSave={editBookingInDB}
        />)}
    </article>
  );
}

export default Appointment;