import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setcharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);
  // useEffect(
  //   () => {generatePassword();}, [length, numberAllowed, characterAllowed]
  // );
  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, characterAllowed]);

  function generatePassword() {
    let words = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let specialCharacters = "!@#$&*()_+-=[]{}|;:.<>/?";
    let numbers = "0123456789";

    let string = words;
    if (numberAllowed) {
      string += numbers;
    }

    if (characterAllowed) {
      string += specialCharacters;
    }

    if (numberAllowed && characterAllowed) {
      string += specialCharacters + numbers;
    }
    let pass = "";
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * (string.length - 0 + 1));
      pass += string.charAt(index);
    }
    setPassword(pass);
  }

  function copyPasswordToClipboard() {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-gray-700 mx-auto rounded-lg px-4 py-3 text-orange-400">
          <h1 className="text-center">Password Generator</h1>

          <div className="flex shadow rounded-lg overflow-hidden mb-4 my-3">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-2 px-3"
              placeholder="password"
              readOnly
              ref={passwordRef}
            />
            <button
              className="bg-blue-700 text-white p-2"
              onClick={copyPasswordToClipboard}
            >
              Copy
            </button>
          </div>

          <div className=" flex flex-row gap-2">
            <div className=" flex gap-1 p-1">
              <input
                type="range"
                min={8}
                max={20}
                onChange={(e) => setLength(e.target.value)}
                value={length}
              />
              <label className="text-nowrap">Length: {length}</label>
            </div>

            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
              <label className=" text-nowrap">Numbers</label>
            </div>

            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                defaultChecked={characterAllowed}
                onChange={() => setcharacterAllowed((prev) => !prev)}
              />
              <label className="text-nowrap">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
