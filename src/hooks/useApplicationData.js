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

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return new Promise((resolve, reject) => {
      axios.put(`/api/appointments/${id}`, appointment)
        .then((response) => {
          if (response.status === 204) {
            setState({
              ...state,
              appointments
            });
            resolve();
          } else {
            reject();
          }
        }).catch((error) => {
          reject(error);
        });
    });
  };


  const deleteInterview = (id) => {
    return new Promise((resolve, reject) => {
      axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        if(response.status===204) {
          resolve();
        } else {
          reject();
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }
  return {state, setDay, bookInterview, deleteInterview};
};

export default useApplicationData;