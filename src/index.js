import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import "./styles.css";
import io from "socket.io-client";

const socket = io("https://socket-api.glitch.me/");

function Cat() {
  let props = {};
  socket.on("from server", data => {
    props = data;
  });

  const [coord, setCoord] = useState({
    x: 10,
    y: 60
  });
  const mouseMove = () => setCoord({ x: props.x - 20, y: props.y - 30 });
  return (
    <div onMouseMove={mouseMove}>
      <img
        src="http://www.fillster.com/images/pictures/81g.jpg"
        width="60"
        style={{ position: "absolute", left: coord.x, top: coord.y }}
      />
    </div>
  );
}

function useMouse() {
  const [coords, setCoords] = useState({
    x: 0,
    y: 0
  });
  const MouseMove = e => setCoords({ x: e.clientX, y: e.clientY });

  socket.emit("event", coords);

  useEffect(() => {
    window.addEventListener("mousemove", MouseMove);
    return () => window.removeEventListener("mousemove", MouseMove);
  }, [coords]); // rerender only if change (state);
}

function MouseTracker() {
  return (
    <div>
      <h1>Move the mouse around!</h1>
      {useMouse()}
      <Cat />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<MouseTracker />, rootElement);
