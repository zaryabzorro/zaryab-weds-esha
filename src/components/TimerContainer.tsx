// import React from 'react'
// import { NumberBox } from './NumberBox'

// interface timeProps {
//   days: number | string,
//   hours: number | string,
//   minutes: number | string,
//   seconds: number | string,
// }

// export const TimerContainer = ({ days, hours, minutes, seconds }: timeProps) => {

//   // Ensure all values are treated as numbers for comparisons
//   const daysNum = Number(days);
//   const hoursNum = Number(hours);
//   let minutesNum = Number(minutes);
//   let secondsNum = Number(seconds);

//   let daysFlip = false;
//   let hoursFlip = false;
//   let minutesFlip = false;
//   let secondsFlip = true;

//   if (secondsNum <= 0 && minutesNum <= 0 && hoursNum <= 0 && daysNum <= 0) {
//     daysFlip = false;
//     hoursFlip = false;
//     minutesFlip = false;
//     secondsFlip = false;
//   }

//   if (secondsNum === 0) {
//     if (minutesNum !== 0) {
//       secondsNum = 59;
//     }

//     secondsFlip = false;
//     minutesFlip = true;
//   }
//   if (minutesNum === 0) {
//     if (hoursNum !== 0) {
//       minutesNum = 59;
//     }

//     minutesFlip = false;
//     hoursFlip = true;
//   }

//   if (hoursNum === 0) {
//     hoursFlip = false;
//     if (daysNum !== 0) {
//       daysFlip = true;
//     }
//   }

//   // Format the numbers to always display 2 digits as strings for display
//   const formattedDays = daysNum < 10 ? `0${daysNum}` : `${daysNum}`;
//   const formattedHours = hoursNum < 10 ? `0${hoursNum}` : `${hoursNum}`;
//   const formattedMinutes = minutesNum < 10 ? `0${minutesNum}` : `${minutesNum}`;
//   const formattedSeconds = secondsNum < 10 ? `0${secondsNum}` : `${secondsNum}`;

//   return (
//     <div className="flex">
//       <NumberBox num={formattedDays} unit="Days" flip={daysFlip} />
//       <NumberBox num={formattedHours} unit="Hours" flip={hoursFlip} />
//       <NumberBox num={formattedMinutes} unit="Minutes" flip={minutesFlip} />
//       <NumberBox num={formattedSeconds} unit="Seconds" flip={secondsFlip} />
//     </div>
//   )
// }


import React, { useState, useEffect } from 'react'
import { NumberBox } from './NumberBox'

interface timeProps {
  days: number | string,
  hours: number | string,
  minutes: number | string,
  seconds: number | string,
}

export const TimerContainer = ({ days, hours, minutes, seconds }: timeProps) => {
  const [time, setTime] = useState({
    days: Number(days),
    hours: Number(hours),
    minutes: Number(minutes),
    seconds: Number(seconds),
  });

  const [flip, setFlip] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        const newSeconds = prevTime.seconds - 1;
        const newMinutes = newSeconds < 0 ? prevTime.minutes - 1 : prevTime.minutes;
        const newHours = newMinutes < 0 ? prevTime.hours - 1 : prevTime.hours;
        const newDays = newHours < 0 ? prevTime.days - 1 : prevTime.days;

        return {
          days: newDays < 0 ? 0 : newDays,
          hours: newHours < 0 ? 0 : newHours,
          minutes: newMinutes < 0 ? 59 : newMinutes,
          seconds: newSeconds < 0 ? 59 : newSeconds,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update flip states when time changes
    setFlip((prevFlip) => ({
      days: time.days !== Number(days),
      hours: time.hours !== Number(hours),
      minutes: time.minutes !== Number(minutes),
      seconds: time.seconds !== Number(seconds),
    }));
  }, [time, days, hours, minutes, seconds]);

  const formattedDays = time.days < 10 ? `0${time.days}` : `${time.days}`;
  const formattedHours = time.hours < 10 ? `0${time.hours}` : `${time.hours}`;
  const formattedMinutes = time.minutes < 10 ? `0${time.minutes}` : `${time.minutes}`;
  const formattedSeconds = time.seconds < 10 ? `0${time.seconds}` : `${time.seconds}`;

  return (
    <div className="flex">
      <NumberBox num={formattedDays} unit="Days" flip={flip.days} />
      <NumberBox num={formattedHours} unit="Hours" flip={flip.hours} />
      <NumberBox num={formattedMinutes} unit="Minutes" flip={flip.minutes} />
      <NumberBox num={formattedSeconds} unit="Seconds" flip={flip.seconds} />
    </div>
  );
}
