import { useRef, useContext } from "react";
import { AppContext } from "../contextAPI/appContext";
import { Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const News = () => {
  const { state, dispatch } = useContext(AppContext);
  const data = state.news;
  return (
    <div className="d-flex justify-content-center flex-column align-items-center text-white">
      <Image src={data.imgURL[0]} style={{ width: "95%" }} />
      <div style={{ width: "80%" }}>
        <h1 className="mt-2 mb-5">{data.title}</h1>
        <p className="mb-4">
          {data.mainText[0].length > 1000
            ? `${data.mainText[0].substring(0, 1000)}...`
            : data.mainText[0]}
        </p>
        <Link to={`/article/${data._id}`}>
          <Button colorScheme="teal">Source</Button>
        </Link>
      </div>
    </div>
  );
};

export default News;
