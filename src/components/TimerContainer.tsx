import React from 'react'
import { NumberBox } from './NumberBox'

interface timeProps {
  days: number | string,
  hours: number | string,
  minutes: number | string,
  seconds: number | string,
}

export const TimerContainer = ({ days, hours, minutes, seconds }: timeProps) => {

  // Ensure all values are treated as numbers for comparisons
  const daysNum = Number(days);
  const hoursNum = Number(hours);
  let minutesNum = Number(minutes);
  let secondsNum = Number(seconds);

  let daysFlip = false;
  let hoursFlip = false;
  let minutesFlip = false;
  let secondsFlip = true;

  if (secondsNum <= 0 && minutesNum <= 0 && hoursNum <= 0 && daysNum <= 0) {
    daysFlip = false;
    hoursFlip = false;
    minutesFlip = false;
    secondsFlip = false;
  }

  if (secondsNum === 0) {
    if (minutesNum !== 0) {
      secondsNum = 59;
    }

    secondsFlip = false;
    minutesFlip = true;
  }
  if (minutesNum === 0) {
    if (hoursNum !== 0) {
      minutesNum = 59;
    }

    minutesFlip = false;
    hoursFlip = true;
  }

  if (hoursNum === 0) {
    hoursFlip = false;
    if (daysNum !== 0) {
      daysFlip = true;
    }
  }

  // Format the numbers to always display 2 digits as strings for display
  const formattedDays = daysNum < 10 ? `0${daysNum}` : `${daysNum}`;
  const formattedHours = hoursNum < 10 ? `0${hoursNum}` : `${hoursNum}`;
  const formattedMinutes = minutesNum < 10 ? `0${minutesNum}` : `${minutesNum}`;
  const formattedSeconds = secondsNum < 10 ? `0${secondsNum}` : `${secondsNum}`;

  return (
    <div className="flex">
      <NumberBox num={formattedDays} unit="Days" flip={daysFlip} />
      <NumberBox num={formattedHours} unit="Hours" flip={hoursFlip} />
      <NumberBox num={formattedMinutes} unit="Minutes" flip={minutesFlip} />
      <NumberBox num={formattedSeconds} unit="Seconds" flip={secondsFlip} />
    </div>
  )
}
