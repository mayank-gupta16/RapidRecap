import React from "react";

export default function Profile() {
  const containerStyle = {
    display: "flex", // Added display flex to make sections side by side
    maxWidth: "100vw",
    maxHeight: "100vh",
    marginLeft: "200px",
    marginTop: "20px",
  };

  const profileStyle = {
    maxWidth: "300px",
    maxHeight: "500px",
    margin: "20px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    display: "flex", // Added display flex to align items in a column
    flexDirection: "column", // Align items in a column
  };
  const Style = {
    display: "flex", // Added display flex to make sections side by side
    flexDirection: "column", // Align items in a column
    maxWidth: "800px",
    maxHeight: "360px",
    margin: "20px",
    padding: "0px",
    border: "1px",
    borderRadius: "10px",
  };

  const ratingStyle = {
    maxWidth: "800px",
    maxHeight: "180px",
    margin: "0px",
    padding: "80px",
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

  return (
    <div style={containerStyle}>
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
          <h6></h6>
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
        </div>
      </section>
      <section style={Style}>
        <section style={ratingStyle}>
          <div style={contentContainerStyle}>
            <h2>Rating & Graph</h2>
          </div>
        </section>
        <section style={ratingStyle}>
          <section style={ratingStyle}>
            <div style={contentContainerStyle}>
              <h2>Solved Quizes</h2>
            </div>
          </section>
          <section style={ratingStyle}>
            <div style={contentContainerStyle}>
              <h2>Badges</h2>
            </div>
          </section>
        </section>
      </section>
    </div>
  );
}