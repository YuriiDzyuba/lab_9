import axios from "axios";
import React,{useState,useEffect} from 'react';
import "./App.css";

function App() {
  const [comments,setComments] = useState([])

  useEffect(() => {
    fetchComments();
  }, [])

  useEffect(() => {
    console.log(comments)
  }, [comments])

  const fetchComments=async()=>{
    const response = await axios("/api/get-users");
    console.log(response,"response")
    setComments(response.data)

  }
  return (
      <div className="App">

        <div className="App">
          <br/>
          <button onClick={fetchComments}>Make new api request</button>
        </div>
        {
            comments && Object.values(comments).map(comment=>{
              return(
                  <>
                    <div key={comment.id} style={{alignItems:'center',margin:'20px 60px'}}>
                      <h4>{comment.name} {comment.second_name}</h4>
                    </div>
                  </>
              )
            })
        }
      </div>
  );
}

export default App;
