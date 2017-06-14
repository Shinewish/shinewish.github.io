const urlEvents = 'http://128.199.53.150/events';


const makeCounter = () => {
    let currentCount = 3;

    return function () { // (**)
        return currentCount--;
    };
};

const counter = makeCounter();

export const fetchEvents = () => (
    fetch(urlEvents).then(response => {
        let i = counter();
        if (i > 0) {
            if (i === 1) {
                throw new Error('I\'m test error. See me '+i+' more tyme. =)');
            }
            throw new Error('I\'m test error. See me '+i+' more tymes. =)');
        }
        return response.json();
    })
);

// Original api request

// export const fetchEvents = () =>
//     fetch(urlEvents).then(response => response.json());

export const fetchEvent = (eventId) =>
  fetch('${urlEvents}/' + eventId).then(response => response.json());

const urlTrainers = 'http://128.199.53.150/trainers';

export const fetchTrainers = () =>
  fetch(urlTrainers).then(response => response.json());

export const fetchTrainer = (trainerId) =>
  // fetch('${urlTrainers}/' + trainerId).then(response => response.json());
  fetch('${urlTrainers}/' + trainerId);
