const getAppointmentsForDay = (state, day) => {
  let appointmentsArray = [];
  if (state.days) {
    for (let d of state.days) {
      if (d.name === day) {
        for (let id of d.appointments) {
          appointmentsArray.push(state.appointments[id])
        }
      }
    }
  }
  return appointmentsArray;
}

const getInterview = (state, interview) => {
  if(interview) {
    const obj = {
      student: interview.student, 
      interviewer: state.interviewers[interview.interviewer]
    }
    return obj;
  }
  return null;
}

module.exports = { getAppointmentsForDay, getInterview };