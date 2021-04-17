import { useState, useEffect } from 'react';
import axios from 'axios';

const useApplicationData = () => {

  const [state, setState] = useState({
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
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, []);

  const setDay = (day) => {
    setState({ ...state, day })
  };

  const getUpdatedDays = (dayName, daysArray, isCreated) => {
    let daysClone = [ ...daysArray ];
    for (let day of daysClone) {
      if (day.name === dayName) {
        if (isCreated) {
          day.spots--;
        } else {
          day.spots++;
        }
      }
    }
    return daysClone;
  }

  const bookInterview = (id, interview) => {
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
        setState({ ...state, appointments, days: getUpdatedDays(state.day, state.days, true) });
      });
  };

  const deleteInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, days: getUpdatedDays(state.day, state.days, false) });
      });
  };

  return { state, setDay, bookInterview, deleteInterview };
};

export default useApplicationData;