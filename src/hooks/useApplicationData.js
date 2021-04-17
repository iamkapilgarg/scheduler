import { useEffect, useReducer } from 'react';
import axios from 'axios';

const useApplicationData = () => {

  const SET_DAY = "SET_DAY";
  const SET_DAYS = "SET_DAYS";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

 const reducer = (state, action) => {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.value };
      case SET_DAYS:
        return { ...state, days: action.value.days };
      case SET_APPLICATION_DATA:
        return { ...state, days: action.value.days, appointments: action.value.appointments, interviewers: action.value.interviewers };
      case SET_INTERVIEW: {
        return { ...state, days: action.value.days, appointments: action.value.appointments };
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });


  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, value: { days: all[0].data, appointments: all[1].data, interviewers: all[2].data } });
    })
  }, []);


  const setDay = (day) => {
    dispatch({ type: SET_DAY, value: day });
  };


  const getUpdatedDays = (dayName, daysArray, isCreated, isNew) => {
    let daysClone = [...daysArray];
    for (let day of daysClone) {
      if (day.name === dayName) {
        if (isCreated && isNew) {
          day.spots--;
        } else if (!isCreated) {
          day.spots++;
        }
      }
    }
    return daysClone;
  }


  const bookInterview = (id, interview, isNew) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, value: { appointments, days: getUpdatedDays(state.day, state.days, true, isNew) } });
      });
  };

  const deleteInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_DAYS, value: { days: getUpdatedDays(state.day, state.days, false, false) } });
      });
  };
  return { state, setDay, bookInterview, deleteInterview };
};

export default useApplicationData;