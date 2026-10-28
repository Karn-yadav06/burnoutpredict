// import { useState } from "react";
// import axios from "axios";

// function AIChat() {

//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);

//   const sendMessage = async () => {

//     if (!message.trim()) return;

//     const userMessage = {
//       sender: "user",
//       text: message
//     };

//     setChat((prev) => [...prev, userMessage]);

//     try {

//       const res = await axios.post(
//         "http://localhost:5000/api/ai/chat",
//         {
//           message: message,
//         }
//       );

//       const aiMessage = {
//         sender: "ai",
//         text: res.data.reply,
//       };

//       setChat((prev) => [...prev, aiMessage]);

//     } catch (err) {

//       console.log(err);

//     }

//     setMessage("");

//   };

//   return (

//     <div style={{padding:"30px"}}>

//       <h1>🤖 WorkConnect AI</h1>

//       <div
//         style={{
//           height:"450px",
//           border:"1px solid gray",
//           overflowY:"auto",
//           padding:"20px",
//           marginBottom:"20px"
//         }}
//       >

//         {

//           chat.map((msg,index)=>(
//             <div
//             key={index}
//             style={{
//               textAlign:msg.sender==="user"?"right":"left",
//               marginBottom:"15px"
//             }}
//             >

//               <b>

//               {msg.sender==="user" ? "You" : "AI"}

//               </b>

//               <br/>

//               {msg.text}

//             </div>
//           ))

//         }

//       </div>

//       <input

//       type="text"

//       value={message}

//       onChange={(e)=>setMessage(e.target.value)}

//       placeholder="Ask Anything..."

//       style={{
//         width:"80%",
//         padding:"12px"
//       }}

//       />

//       <button

//       onClick={sendMessage}

//       style={{
//         padding:"12px 25px",
//         marginLeft:"10px"
//       }}

//       >

//         Send

//       </button>

//     </div>

//   );

// }

// export default AIChat;