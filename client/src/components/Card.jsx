import { Slide } from "@mui/material";
import { useRef } from "react";

const Card = () => {

  const summary = `nd produces its world-famous French Fries in a zero-water discharge facility in India, significantly reducing water consumption.   McDonald's India North and East on Thursday said it has installed a solar plant of 3.2 MW capacity, which is expected to generate an annual output of 4.2 million units of power.McDonald's franchise for North and East has invested Rs 14 crore in the plant, which will result in the reduction of 3,822 tonnes of CO2 emissions annually, said a statement.Commenting over the initiative, Chairman Sanjeev Agrawal said, "We are stepping up our sustainability efforts with the installation of Delhi's BRPL (BSES Rajdhani Power Ltd) largest solar power plant which has already enabled 24 percent of our Delhi restaurants running on solar energy." McDonald's India North and East is also taking steps to reduce greenhouse gas, keep waste out of nature and preserve natural resources such as FSC-certified paper-based packaging, responsible sourcing etc.The brand produces its world-famous French Fries in a zero-water discharge facility in India, significantly reducing water consumption.It uses cooking oil and is repurposed into biodiesel, which is known to have lower carbon emissions than conventional fuel.McDonald's restaurants in North and East of India are operated by Connaught Plaza Restaurants Pvt Ltd.`;
    const cardWrapper = useRef(null);
    const card = useRef(null);
    const project_meta = useRef(null);
    // highest values for angle
    const mostX = 10; // 10 or -10
    const mostY = 10; // 10 or -10
    const mousemove = (e) =>{
      card.current.style.transition = "none";
      project_meta.current.style.transition = "none";

      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;
      const { width, height } = cardWrapper.current.getBoundingClientRect();
      const halfWidth = width / 2;
      const halfHeight = height / 2;

      // calculate angle
      const rotationY = ((x - halfWidth) / halfWidth) * mostX;
      const rotationX = ((y - halfHeight) / halfHeight) * mostY;

      // set rotation
      card.current.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
      project_meta.current.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
    }
    const mouseleave = () =>{
      card.current.style.transition = "transform 0.5s ease-in-out";
      card.current.style.transform = `rotateY(0) rotateX(0)`;
      project_meta.current.style.transition = "transform 0.5s ease-in-out";
      project_meta.current.style.transform = `rotateY(0) rotateX(0)`;
    }

  return (
      <div className="containers">
        <div
          className="cardWrapper"
          ref={cardWrapper}
          onClick={() =>
            (location.href = `https://www.moneycontrol.com/news/business/mcdonalds-india-north-and-east-commissions-3-2-mw-solar-plant-10918321.html`)
          }
          onMouseMove={mousemove}
          onMouseLeave={mouseleave}
        >
          <div className="project-meta" ref={project_meta}>
            <div className=" projects">
              <span className="block-reveal__text">
                McDonald{`'`}s India North and East commissions 3.2 MW solar
                plant
              </span>
            </div>
            <div className="divider"></div>
            <div className="project-nav">
              <span className="block-reveal__text numb">
                00
                <br /> <span className="arr">→</span>
              </span>
            </div>
          </div>
          <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <div className="cards" ref={card} >
              <div className="img-box">
                <img
                  src="https://images.moneycontrol.com/static-mcnews/2023/06/Collage-Maker-16-Jun-2023-07-51-PM-5659-770x433.jpg?impolicy=website&width=770&height=431"
                  alt=""
                  // style={{ opacity: "0.5" }}
                />
              </div>
              <div className="contents">
                <h2> Click here to know More </h2>
                <p>
                  {summary.length > 60 ? `${summary.substring(0,300)}...` : summary}
                </p>
              </div>
            </div>
          </Slide>
        </div>
      </div>
  );
};

export default Card;
