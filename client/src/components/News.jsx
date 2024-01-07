import { useRef, useContext } from "react";
import { AppContext } from "../contextAPI/appContext";
import { Image } from "@chakra-ui/react";
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
        <button
          style={{
            backgroundColor: "rgb(64, 177, 169)",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "rgb(44, 147, 139)")
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "rgb(64, 177, 169)")
          }
          onClick={(e) => {
            e.target.style.backgroundColor = "rgb(34, 124, 116)";
            window.open(`${data.url}`, "_blank");
          }}
        >
          Source
        </button>
      </div>
    </div>
  );
};

export default News;
