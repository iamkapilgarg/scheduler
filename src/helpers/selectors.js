
/**
 * This function returns appointment for the provided day
 * from the state
 *
 * @param {*} state
 * @param {*} day
 * @return {*} 
 */
const getAppointmentsForDay = (state, day) => {
  let dayData = state.days.find((d) => d.name === day);
  if (dayData) {
    return dayData.appointments.map((id) => state.appointments[id]);
  }
  return [];
}

/**
 * This function returns the interview object
 *
 * @param {*} state
 * @param {*} interview
 * @return {*} 
 */
const getInterview = (state, interview) => {
  if (interview) {
    const obj = {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
    return obj;
  }
  return null;
}

/**
 *This function will return all the interviewers for the provided day
 *
 * @param {*} state
 * @param {*} day
 * @return {*} 
 */
const getInterviewersForDay = (state, day) => {
  let dayData = state.days.find((d) => d.name === day);
  if (dayData) {
    return dayData.interviewers.map((id) => state.interviewers[id]);
  }
  return [];
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };