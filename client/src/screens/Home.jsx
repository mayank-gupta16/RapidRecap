import { useEffect, useState } from "react";
import Timeline from "../components/Timeline";
import axios from 'axios';
import Loading from "../components/Loading";
const Home = () => {
  const [items, setItems] = useState([]);
  const [page,setPage] = useState(1);
  const [load, setLoad] = useState(true);
  async function fetchData() {
    try {
      const response = await axios.get(`/api?page=${page}&pageSize=9`);
      //response.data.map((ele)=> console.log(ele.imgURL));
      //const result = await response.json();
      //console.log(response.data);
      //response.data.map((it)=>console.log(it));
      setItems((prev)=> [...prev,...response.data]);
      setLoad(false);
      //console.log(data);
      // Handle the response data here
    } catch (error) {
      // Handle errors
    }
  }

  const handleScroll = async () =>{
    console.log(`scrollHeight` + document.documentElement.scrollHeight);
    console.log(`innerHeight` + window.innerHeight);
    console.log(`scrollTop` + document.documentElement.scrollTop);

    try {
      if(window.innerHeight+document.documentElement.scrollTop + 1>document.documentElement.scrollHeight){
        setLoad(true);
        setPage((ele)=>ele+1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchData();
  },[page]);

  useEffect(()=>{
    window.addEventListener("scroll",handleScroll);
    return ()=> window.removeEventListener("scroll",handleScroll);
  },[])
  return (
    <div>
      <Timeline data={items}/>
      {load && <Loading/>}
    </div>
  );
};

export default Home;
