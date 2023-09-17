import { useState, useEffect } from "react";
import PropTypes from "prop-types";

Timer.propTypes = {
  timeLeft: PropTypes.number,
};

function Timer({ timeLeft }) {
  const [time, setTime] = useState(timeLeft / 1000);

  useEffect(() => {
    if (time > 0) {
      const id = setTimeout(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(id);
    }
  }, [time]);

  return (
    <>
      <p style={{ color: "lightcoral", textAlign: "center" }}>
        Next Color comes in {time} seconds...
      </p>
    </>
  );
}

export default Timer;
