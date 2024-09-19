import axios from "axios";
import { useEffect, useRef, useState } from "react";
import useBoardFetch from "./useFetchBoard";
import useFetchEnemy from "./useFetchEnemy";
interface coordinatesInterface{
  x:number;
  y:number;
}
export default function useFetchPlayer(setBoard:Function,board:Array<Array<string>>,setErrorMessage:Function){
  const [moveCoordinates,setMoveCoordinates]=useState<coordinatesInterface|undefined>()
  const [pawnCoordinates,setPawnCoordinates]=useState<coordinatesInterface|undefined>()
  const selectStage = useRef<boolean>(false)
  const {getBoard}=useBoardFetch(setBoard,setErrorMessage)
  const {setEnemyMove}=useFetchEnemy(setBoard)
  async function getPossibleMoves(obj:coordinatesInterface) {
    const reques = await axios.post("https://localhost:7285/api/player/getMove",obj).then(e=>{
      setBoard(e.data)
    })
  }
  function clearVariables(){
    setPawnCoordinates(undefined)
    setMoveCoordinates(undefined)
    selectStage.current=false
}
  async function sendMove(){
    setErrorMessage!("")
    var obj = {
      playerX:pawnCoordinates!.x,
      playerY:pawnCoordinates!.y,
      moveX:moveCoordinates!.x,
      moveY:moveCoordinates!.y,
    }
    clearVariables()
    const request = await axios.post("https://localhost:7285/api/player/sendMove",obj).then(e=>{
     setBoard(e.data)
     setEnemyMove(true)
    }).catch(err=>{
      getBoard()
      setErrorMessage!("Invalide Move");
    })
  }
  function handleCoordinates(obj:coordinatesInterface){
    setErrorMessage("")
    if(board![obj.x][obj.y]=="O"||board![obj.x][obj.y]=="K") {
      clearVariables()
      getPossibleMoves(obj)
    }
    selectStage.current?setMoveCoordinates(obj):setPawnCoordinates(obj)
    selectStage.current=!selectStage.current
  }
  useEffect(()=>{
    if(moveCoordinates&&pawnCoordinates){
      if(moveCoordinates.x==pawnCoordinates.x&&moveCoordinates.y==pawnCoordinates.y){
        clearVariables()
        getBoard()
      }else{
        sendMove()
      }
      } 
  },[pawnCoordinates,moveCoordinates])
  return {handleCoordinates,clearVariables}
}