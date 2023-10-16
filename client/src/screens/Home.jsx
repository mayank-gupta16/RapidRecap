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

      setItems((prev)=> [...prev,...response.data]);
      setLoad(false);

    } catch (error) {
      // Handle errors
      console.log(error.message);
    }
  }

  const handleScroll = async () =>{
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
