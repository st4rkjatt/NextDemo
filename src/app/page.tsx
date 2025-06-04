"use client"
import { useState } from "react";
import SocketProvider from "./containers/SocketProvider";
import StatUpdateBtn from "./components/StatUpdateBtn";
import StatsTracker from "./components/StatsTracker";



const Home: React.FC = () => {
  const [enableSocket, setEnableSocket] = useState(false);
  const [isAutoConnect, setIsAutoConnect] = useState(false);

  return (
    <div style={{ margin: "24px" }}>
      <h2>socket.io Example with SocketProvider for granular socket control</h2>

      <div
        style={{
          display: "flex",
          gap: "24px",
          border: "1px solid black",
          padding: "24px"
        }}
      >
        <button type="button" onClick={() => setEnableSocket(!enableSocket)}>
          {enableSocket ? "Disable socket.io" : "Enable socket.io"}
        </button>

        <span>
          <input
            id="autoConnect"
            type="checkbox"
            checked={isAutoConnect}
            onChange={() => setIsAutoConnect(!isAutoConnect)}
          />
          <label htmlFor="autoConnect">Enable auto connect</label>
        </span>
      </div>

      <div
        style={{
          border: "1px solid black",
          padding: "24px",
          marginTop: "24px"
        }}
      >
        {!enableSocket && <h3>Disabled</h3>}

        {enableSocket && (
          <SocketProvider autoConnect={isAutoConnect}>
            <div>
              <div style={{ display: "flex", gap: "12px" }}>
                <StatUpdateBtn text="Increment" update="increment" />
                <StatUpdateBtn text="Decrement" update="decrement" />
              </div>

              <div
                style={{
                  border: "1px solid black",
                  marginTop: "24px",
                  padding: "12px"
                }}
              >
                <StatsTracker />
              </div>
            </div>
          </SocketProvider>
        )}
      </div>
    </div>
  );
};

export default Home;
