import { useState, useCallback,useEffect,useRef} from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const generatePassword =useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmopqrstuvwxyz";
    const no = "1234567890";
    const ch = "/?[]{}_*&%$#@";
    if (numberAllowed) str += no;
    if (charAllowed) str += ch;
    for (let i = 1; i <=length; i++) {
      pass +=str.charAt(Math.floor(Math.random() *str.length)) ;
    }

    setPassword(pass);
  },[length,numberAllowed,charAllowed,setPassword]);
  useEffect(()=>{
    generatePassword();
  },[length,numberAllowed,charAllowed,setPassword,generatePassword])

  const passwordRef=useRef(null);

  const copytoClipboard=useCallback(()=>{
   
    window.navigator.clipboard.writeText(password);
    alert('Copied!!')
  },[password])
  return (
    <div className=" flex flex-wrap w-full h-screen justify-center bg-black items-center ">
      <div className=" bg-slate-400 w-[60vw] flex-col flex flex-wrap h-56 rounded-3xl ">
        <h1 className="text-white font-semibold text-3xl py-3 mx-auto">
          Password Generator
        </h1>
        <div className="w-full flex overflow-hidden flex-wrap items-center justify-evenly py-3">
          <input
            type="text"
            placeholder="Password"
            value={password}
            ref={passwordRef}
            readOnly
            className="w-[40vw] rounded-xl px-4 py-2"
          />
          <button onClick={copytoClipboard} className=" px-6 text-white rounded-2xl py-2 hover:bg-blue-900 font-semibold z-10 shadow-inner bg-blue-500 ">
            Copy
          </button>
        </div>
        <div className=" w-full text-white font-semibold text-xl justify-evenly flex p-4 m-auto flex-wrap  ">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
           
            className=" w-[10vw] cursor-pointer"
          />
          <h2> Length :{length}</h2>
          <div className=" flex gap-3">
            <input
              type="checkbox"
              className="cursor-pointer"
              id="numberInput"
              defaultChecked={numberAllowed}
              onChange={() => {
                setnumberAllowed((prev)=>!prev)
              }}
            />
            <h2>Allow Numbers</h2>
          </div>
          <div className=" flex gap-3">
            <input
              type="checkbox"
              className="cursor-pointer"
              id="numberInput"
              defaultChecked={charAllowed}
              onChange={() => {
               setCharAllowed((prev)=>!prev)
              }}
            />
            <h2>Allow Characters</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
