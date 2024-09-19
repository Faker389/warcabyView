import axios from "axios"
import { useEffect, useState } from "react"

export default function useFetchEnemy(setBoard:Function){
    const [enemyMove,setEnemyMove]= useState<boolean>(false)
    async function getEnemyMove() {
        const reques = await axios.get("https://localhost:7285/api/player/enemyMove").then(e=>{
          setBoard(e.data)
        })
      }
    useEffect(()=>{
        if(enemyMove){
            setTimeout(()=>{
              getEnemyMove()
            },500)
            setEnemyMove(false)
        }
    },[enemyMove])
    return {setEnemyMove}
}