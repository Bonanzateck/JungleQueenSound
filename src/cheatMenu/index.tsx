import React from "react";
import { constant, mockDataCheats } from "../slot/data/config";
import "./cheatModal.css";

export default function CheatMenu() {
  const [showModal, setShowModal] = React.useState(false);
 


  const [cheat, setCheat] = React.useState("");
  const updateCheat = () => {
    const cheatArr: any = String(cheat).split(',').map(str => Number(str));
    constant.configGame.gameCheatString = cheatArr;
  }
  const resetCheat = () => {
    const cheatArr: any = [];
    constant.configGame.gameCheatString = cheatArr;
  } 
  const cheatSelectOPTIONS = mockDataCheats && Object.values(mockDataCheats).map((row, index) => {
      return <option value={row.data} key={`cheatOp_${index}`}>{row.name}</option>
  });
  return (
    
    <>
      { !showModal ? ( <div className="keyModalWindow"   
        onClick={() => setShowModal(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 512 512" fill="#fff"><path d="M334.974,0c-95.419,0-173.049,77.63-173.049,173.049c0,21.213,3.769,41.827,11.211,61.403L7.672,399.928 c-2.365,2.366-3.694,5.573-3.694,8.917v90.544c0,6.965,5.646,12.611,12.611,12.611h74.616c3.341,0,6.545-1.325,8.91-3.686 l25.145-25.107c2.37-2.366,3.701-5.577,3.701-8.925v-30.876h30.837c6.965,0,12.611-5.646,12.611-12.611v-12.36h12.361 c6.964,0,12.611-5.646,12.611-12.611v-27.136h27.136c3.344,0,6.551-1.329,8.917-3.694l40.121-40.121 c19.579,7.449,40.196,11.223,61.417,11.223c95.419,0,173.049-77.63,173.049-173.049C508.022,77.63,430.393,0,334.974,0z M334.974,320.874c-20.642,0-40.606-4.169-59.339-12.393c-4.844-2.126-10.299-0.956-13.871,2.525 c-0.039,0.037-0.077,0.067-0.115,0.106l-42.354,42.354h-34.523c-6.965,0-12.611,5.646-12.611,12.611v27.136H159.8 c-6.964,0-12.611,5.646-12.611,12.611v12.36h-30.838c-6.964,0-12.611,5.646-12.611,12.611v38.257l-17.753,17.725H29.202v-17.821 l154.141-154.14c4.433-4.433,4.433-11.619,0-16.051s-11.617-4.434-16.053,0L29.202,436.854V414.07l167.696-167.708 c0.038-0.038,0.067-0.073,0.102-0.11c3.482-3.569,4.656-9.024,2.53-13.872c-8.216-18.732-12.38-38.695-12.38-59.33 c0-81.512,66.315-147.827,147.827-147.827S482.802,91.537,482.802,173.05C482.8,254.56,416.484,320.874,334.974,320.874z"></path><path d="M387.638,73.144c-26.047,0-47.237,21.19-47.237,47.237s21.19,47.237,47.237,47.237s47.237-21.19,47.237-47.237 S413.686,73.144,387.638,73.144z M387.638,142.396c-12.139,0-22.015-9.876-22.015-22.015s9.876-22.015,22.015-22.015 s22.015,9.876,22.015,22.015S399.777,142.396,387.638,142.396z"></path></svg>
          
      </div>
      ) : null}
      {showModal ? (
        <>
          <div className="parentCheatMenu">
              {/*content*/}
              <div  className="child">
                {/*header*/}
                <div className="title">
                  <h1 className="text-3xl font-semibold">
                  Cheat Panel
                  </h1>
                </div>
                {/*body*/}
              <div className="relative p- flex-auto">
                <select name="drinks" className="selectBoxCheat" defaultValue={""}  onChange={(e) => setCheat(e.target.value)}>
                <option value="" disabled hidden>Choose a cheat</option>
                {cheatSelectOPTIONS}
                </select>
                <textarea value={cheat} onChange={(e) => setCheat(e.target.value)} className="textBoxCheat" rows={7} cols={5} placeholder="Insert Cheat Value here..." />
                </div>
                {/*footer*/}
                <div className="btnParen">
                  
                {/* <button
                    className="btn"
                    type="button"
                    onClick={(e) => setCheat("")}>
                    CLEAN
                </button> */}
                  <button
                  className="btn generic"
                    type="button" onClick={() => { setCheat(""); resetCheat(); setShowModal(false);}}
                  >
                    RESET
                  </button>
                  <button 
                  className="btn submit"
                    type="button" onClick={() => { setShowModal(false); updateCheat(); }}
                  >
                    SUBMIT
                  </button>
                </div>
                <div className="closeBtn1">
                  
                  <button 
                    className="closeBtn"
                    type="button" onClick={() => { setShowModal(false);setCheat("");}}
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}