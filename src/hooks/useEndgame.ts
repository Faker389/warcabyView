"use client"
export default function useEndgame(board:Array<Array<string>>,setBoard:Function,handleVictory:Function){
    function countPawns(){
        var X= 0
        var O= 0
        for(var x=0;x<8;x++){
            for(var y=0;y<8;y++){
                if(board[x][y]=="X"||board[x][y]=="Q"||board[x][y]=="Z"||board[x][y]=="B") X++
                else if(board[x][y]=="O"||board[x][y]=="K") O++
            }
        }
        if(X==0){
            handleVictory("White")
        }else if(O==0){
           
            handleVictory("Black")
        }
    }
    
    return {countPawns}
}