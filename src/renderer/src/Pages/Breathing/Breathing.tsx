import { p } from "node_modules/react-router/dist/development/index-react-server-client-2EDmGlsZ.mjs";
import "./Breathing.css";
import { useEffect, useState } from "react";

enum States {
  INHALE = "anim_in",
  HOLD = "anim_hold",
  EXHALE = "anim_ex",
  STOP = "",
}

const BreathingPage = () => {
  const [state, setState] = useState(States.STOP);
  const [t, setT] = useState(null as NodeJS.Timeout | null);

  useEffect(() => {
    if (state === States.STOP) {
      clearTimeout(t!);
      return;
    }
    if (state === States.INHALE) {
      setT(setTimeout(() => setState(States.HOLD), 4000));
    }
    if (state === States.HOLD) {
      setT(setTimeout(() => setState(States.EXHALE), 2000));
    }
    if (state === States.EXHALE) {
      setT(setTimeout(() => setState(States.INHALE), 4000));
    }
  }, [state]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <h1 style={{ margin: "1rem", padding: 0 }}>
        {state === States.STOP
          ? "Start breathing exercise"
          : state === States.INHALE
            ? "Inhale"
            : state === States.HOLD
              ? "Hold"
              : "Exhale"}
      </h1>
      <div
        style={{
          filter: "blur(10px)",
          width: "300px",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
        onClick={() => {
          setState((prev) =>
            prev === States.STOP ? States.INHALE : States.STOP,
          );
        }}
      >
        <div
          style={{
            background: "radial-gradient(circle, #8BC34A 0%,#00BCD4 100%)",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
          }}
          className={state}
        ></div>
      </div>
      <h5 style={{ margin: "1rem", padding: 0 }}>
        {state === States.STOP ? "Click to start..." : "Click to stop..."}
      </h5>
    </div>
  );
};

export default BreathingPage;
