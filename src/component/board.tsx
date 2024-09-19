"use client"
import useFetchPlayer from '@/hooks/useFetchPlayer';
import Image from 'next/image';
interface props{
    board:Array<Array<string>>;
    setBoard:Function;
    err:Function;
}
export default function Board({board,setBoard,err}:props){
    const{handleCoordinates}= useFetchPlayer(setBoard,board,err)
    return  <div className="h-b-h w-b-w  border border-black ">
        <div className="grid grid-rows-8 grid-cols-8 h-b-h">
            {board.map((el1:Array<string>, x:number) => (
                el1.map((el2:string, y:number) => (
                <div key={y} className={`${(x+y)%2==0?"black":"white"}   row-start-${x+1} row-end-${x+2} col-start-${y+1} col-end-${y+2} flex  items-center justify-center border border-black`} onClick={()=>handleCoordinates({x:x,y:y})}>
                    <Image src={(() => {
                        switch (el2) {
                        case 'O':return "/img/pionekWhite.png";
                        case 'X':return "/img/pionekBlack.png";
                        case 'T':return "/img/target.png";
                        case 'B':return "/img/targetBlack.png";
                        case 'K':return "/img/kingWhite.png";
                        case 'Q':return "/img/kingBlack.png";
                        case 'Z':return "/img/targetBlackKing.png";
                        default:return "/img/blank.png";
                        }
                    })()} alt="pawn"  width={60} height={60}/>
                </div>
                ))
            ))}
        </div>
  </div>
}
