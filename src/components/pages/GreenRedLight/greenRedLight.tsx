import Header from "@/components/widjets/Header/header";
import "./style.css";
import ButtonDefault from "@/components/shared/UI/Buttons.tsx/buttons";
import { useEffect, useState } from "react";
import close from "@assets/icons/close.svg";
function GreenRedLight() {
  const [light, setLight] = useState("red");
  const [timeResult, setTimeResult] = useState<string>("~");
  const [showModal, setShowModal] = useState(false);
  const [startTimer, setStartTimer] = useState<number>(0);
  const handleStartClick = () => {
    setShowModal(true);
  };

  const handleCloseClick = () => {
    setShowModal(false);
  };

  const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleReactionClick = (start: number) => {
    let end = Date.now();
    let result = end - start;
    setLight("red");
    setTimeResult(`${result / 1000}`);
  };

  useEffect(() => {
    let start = Date.now();
    const timer = setInterval(() => {
      const end = Date.now();
      console.log("result", (end - start) / 1000, "seconds");
      start = Date.now();
      setLight("green");
      setStartTimer(start);
    }, random(3000, 7000));
    if (!showModal) {
      setLight("red");
      setTimeResult("~");
      clearInterval(timer);
      return;
    }
    return () => {
      clearInterval(timer);
    };
  }, [showModal]);

  return (
    <>
      <Header />
      <h1 style={{ textAlign: "center" }}>Green Red Light</h1>
      <main className="main container">
        {showModal && (
          <div className="light-container">
            <ButtonDefault
              handlClick={handleCloseClick}
              styles={{
                background: "none",
                position: "absolute",
                top: "20px",
                right: "20px",
                borderRadius: 0,
              }}
            >
              <img src={close} alt="" />
            </ButtonDefault>
            <div
              onClick={() => {
                handleReactionClick(startTimer);
              }}
              className={"light " + light}
            ></div>
            <h2 className="time-result">
              Your reaction time: {timeResult} seconds
            </h2>
          </div>
        )}

        <ButtonDefault handlClick={handleStartClick}>Start</ButtonDefault>
      </main>
    </>
  );
}

export default GreenRedLight;
