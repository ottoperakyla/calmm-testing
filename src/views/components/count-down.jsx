const Countdown = ({ timeTo }) => {
  const timeLeft = Kefir.interval(1000)
    .map(() => getTimeLeft(timeTo))
    .toProperty(() => getTimeLeft(timeTo))
  
  const hours = timeLeft
    .map(obj => obj.hours.toString().padStart(2, '0'))

  const minutes = timeLeft
    .map(obj => obj.minutes.toString().padStart(2, '0'))

  const seconds = timeLeft
    .map(obj => obj.seconds.toString().padStart(2, '0'))
    .filter(timeLeft => timeLeft >= 0)

  const timerFinished = timeLeft
    .map(obj => obj.seconds)
    .map(timeLeft => timeLeft < 1)
    .toProperty(() => false)

  return (
      <div>
        <h2>Countdown</h2>
        <div className="component">
          <div>
            <div>Hours</div>
            <div>{hours}</div>
          </div>
          <div>
            <div>minutes</div>
            <div>{minutes}</div>
          </div>
          <div>
            <div>seconds</div>
            <div>{seconds}</div>
          </div>
        </div>
        {U.ift(timerFinished,
          <p>Done!</p>
        )}
        <button onClick={() => timeTo.set(+new Date()+5000)}>Set to 5 seconds</button>
      </div>
  )
}

export default Countdown

function getTimeLeft(timeTo) {
  let timeRemaining = parseInt((timeTo.get() - (+new Date())) / 1000)

  timeRemaining = (timeRemaining % 86400);
  
  const hours  =  parseInt(timeRemaining / 3600)
  timeRemaining = timeRemaining % 3600

  const minutes = parseInt(timeRemaining / 60)
  timeRemaining = timeRemaining % 60

  const seconds = parseInt(timeRemaining)

  return {hours, minutes, seconds}
}
