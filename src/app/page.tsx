"use client"
import Board from "@/component/board";

import { useEffect, useState } from "react";
import useBoardFetch from "@/hooks/useFetchBoard";
import useFetchPlayer from "@/hooks/useFetchPlayer";
import useEndgame from "@/hooks/useEndgame";
import axios from "axios";
interface scoreInterface{
  Black:number;
  White:number;
}
export default function Home(){
  const [board,setBoard]= useState<Array<Array<string>>|[]>([])
  const [errorMessage,setErrorMessage] = useState<string>("")
  const [whoWon,setWhoWon]=useState<string>('')
  const [showWindow,setShowWindow]=useState<boolean>(false)
  const [score,setScore] = useState<scoreInterface>({
    Black:0,
    White:0
  })
  const {getBoard}=useBoardFetch(setBoard,setErrorMessage)
  
  const {clearVariables}= useFetchPlayer(setBoard,board,setErrorMessage)
  
  const {countPawns}= useEndgame(board,setBoard,handleVictory)
  async function restartMap(){
    clearVariables()
    setShowWindow(false)
    await axios.get("https://localhost:7285/api/player/resetBoard").then(e=>{
        setBoard(e.data)
    })
}
  useEffect(()=>{
    getBoard()
  },[])
  function handleVictory(str:string){
    setShowWindow(true)
    setWhoWon(str)
    var obj = score
    str=="White"?obj.White++:obj.Black++
    setScore(obj)
  }
  useEffect(()=>{
    if(board.length>0){
      countPawns()
    }
  },[board])
  return <>
  <div>
    <h1 className="text-5xl absolute  left-1/2 -translate-x-1/2 top-16 text-white text-center  w-full ">{errorMessage}</h1>
    <div className="flex justify-between mb-4">
      <h1 className="text-white text-4xl">White: {score.White}</h1>
      <h1 className="text-white text-4xl">Black: {score.Black}</h1>
    </div>
    <div className="grid relative grid-rows-8 h-b-h w-b-w col-start-2 col-end-3 row-start-2 row-end-3 border border-black bg-black">
      <div className={`${showWindow?"block":"hidden"} absolute w-b-w h-b-h bg-black bg-opacity-50 z-10 flex justify-center items-center text-white`}>
        <div className="flex flex-col justify-center items-center w-96 h-96">
          <h1 className="text-6xl mb-5">{whoWon} won</h1>
          <h1 className="text-4xl">Reset map <i className="fa-solid fa-rotate-right text-4xl cursor-pointer" onClick={restartMap}></i></h1>
        </div>
      </div>
     {board&&<Board board={board} setBoard={setBoard} err={setErrorMessage}/>}
    </div>
  </div>
  </>
}