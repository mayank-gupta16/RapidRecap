import React from "react";
import "./About.css";

export default function About() {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
      />

      <div class="about mt-3">
        <h1>Our Team</h1>
        <p>Meet our awesome team!</p>
      </div>
      <section class="container about">
        <figure>
          <div class="layer">
            <h3>Full Stack Web Developer</h3>
            <p>
              I developed the UI and back-end of RapidRecap using MERN Stack.
            </p>
          </div>
          <img src="img\Subrat.jpeg" alt="Subrat Gupta" />
          <figcaption>
            <h3>Subrat Gupta</h3>
            <br />
            <a
              href="https://www.linkedin.com/in/subratgupta2704"
              class="fa fa-linkedin fa-2x"
            ></a>
            <a
              href="https://www.instagram.com/subrat.gupta.2704/"
              class="fa fa-instagram fa-2x mx-3"
            ></a>
            <a
              href="https://github.com/subratgupta2704"
              class="fa fa-github fa-2x"
            ></a>
          </figcaption>
        </figure>

        <figure>
          <div class="layer">
            <h3>Team Lead</h3>
            <p>
              I developed the UI and back-end of RapidRecap using MERN Stack.
            </p>
          </div>
          <img src="img\Saransh.jpg" alt="" />
          <figcaption>
            <h3>Saransh Mittal</h3>
            <br />
            <a
              href="https://www.linkedin.com/in/saransh-mittal-824927248/"
              class="fa fa-linkedin fa-2x"
            ></a>
            <a
              href="https://www.instagram.com/saransh._.mittal/"
              class="fa fa-instagram fa-2x mx-3"
            ></a>
            <a
              href="https://github.com/Saransh-mittal"
              class="fa fa-github fa-2x"
            ></a>
          </figcaption>
        </figure>

        <figure>
          <div class="layer">
            <h3>Data Scientist</h3>
            <p>I developed python servers to do web scrapping.</p>
          </div>
          <img src="img\Mayank.jpeg" alt="" />
          <figcaption>
            <h3>Mayank Gupta</h3>
            <br />
            <a
              href="https://www.linkedin.com/in/mayank-gupta-7104a21a6/"
              class="fa fa-linkedin fa-2x"
            ></a>
            <a
              href="https://www.instagram.com/mkgupta.exe/"
              class="fa fa-instagram fa-2x mx-3"
            ></a>
            <a
              href="https://github.com/mayank-gupta16"
              class="fa fa-github fa-2x"
            ></a>
          </figcaption>
        </figure>
      </section>
    </div>
  );
}
