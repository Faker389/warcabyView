import axios from "axios";
export default function useBoardFetch(setBoard:Function,setErrorMessage:Function){
    async function getBoard(){
        setErrorMessage("")
        const request = await axios.get("https://localhost:7285/api/player/getBoard").then(e=>{
          setBoard(e.data)
        }).catch(err=>{
          setErrorMessage("Couldn't fetch board")
        })
      }

      return {getBoard}
}