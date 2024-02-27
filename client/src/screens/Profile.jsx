import React, { useContext, useEffect, useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { AppContext } from "../contextAPI/appContext";
import useDrag from "../customHooks/useDrag";
export default function Profile() {
  const { startDrag, drag, endDrag } = useDrag();
  const { state, dispatch } = useContext(AppContext);
  const [user, setUser] = useState({});
  useEffect(() => {
    //console.log(state.user);
    setUser(state.user);
  }, []);
  const containerStyle = {
    display: "flex",
    maxWidth: "100vw",
    maxHeight: "100vh",
    marginLeft: "200px",
    marginTop: "20px",
  };

  const profileStyle = {
    maxWidth: "300px",
    maxHeight: "550px",
    margin: "20px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
  };

  const Style = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "800px",
    maxHeight: "520px",
    margin: "20px",
    padding: "0px",
    border: "1px",
    borderRadius: "10px",
  };

  const ratingStyle = {
    maxWidth: "800px",
    maxHeight: "180px",
    margin: "10px",
    padding: "50px",
    border: "1px solid #ccc",
    borderRadius: "10px",
  };

  const contentContainerStyle = {
    display: "flex",
  };

  const imageStyle = {
    borderRadius: "10%",
    width: "100px",
    height: "100px",
    marginRight: "20px",
  };

  const badgesContainerStyle = {
    marginTop: "5px",
    marginBottom: "5px", // Adjust this value to add a gap between the sections
  };

  return (
    <div
      style={containerStyle}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      onMouseMove={(e) => drag(e)}
      onTouchMove={(e) => drag(e.touches[0])}
      onMouseUp={endDrag}
      onTouchEnd={endDrag}
    >
      <section style={profileStyle}>
        <div style={contentContainerStyle}>
          <img src="images\Subrat.jpeg" alt="Profile" style={imageStyle} />
          <div>
            <h4>Subart Gupta</h4>
            <h6>syntax_terminator_2704</h6>
            <h6>Rank : 1,21,145</h6>
          </div>
        </div>
        <div>
          <h1></h1>
          <h6>Email : subratgupta2704@gmail.com</h6>
          <h6>Phone : 9876543210</h6>
          <p>
            An ambitious student pursuing B.Tech in Communication and Computer
            Engineering, I possess a strong skill set in Data Structures and
            Algorithms (DSA), full-stack web development (MERN Stack) and
            excellent problem-solving abilities. Throughout my academic journey,
            I have gained practical experience in creating efficient and
            intuitive web applications while also honing my analytical and
            logical thinking skills.
          </p>
          <Button
            size="md"
            height="38px"
            width="150px"
            border="3px"
            borderColor="green.200"
          >
            Edit Profile
          </Button>
        </div>
      </section>
      <section style={Style}>
        <section style={ratingStyle}>
          <div style={contentContainerStyle}>
            <h2>Rating & Graph</h2>
          </div>
        </section>
        <section style={{ ...ratingStyle, ...badgesContainerStyle }}>
          <section style={ratingStyle}>
            <div style={contentContainerStyle}>
              <h2>Solved Quizzes</h2>
            </div>
          </section>
          <section style={ratingStyle}>
            <div style={contentContainerStyle}>
              <h2>Badges</h2>
            </div>
          </section>
        </section>
        <section style={ratingStyle}>
          <div style={contentContainerStyle}>
            <h2>Daily Activity</h2>
          </div>
        </section>
      </section>
    </div>
  );
}
