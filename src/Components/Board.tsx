import React, { useState } from "react";

const squareColor1 =  `#ebecd0`
const squareColor2 =`#739552`

const COLUMNS = 8
const ROWS = 8

const whiteSoldierPiece = 'https://images.chesscomfiles.com/chess-themes/pieces/wood/150/wp.png'
const whiteRookPiece = "https://images.chesscomfiles.com/chess-themes/pieces/wood/150/wr.png"
const whiteKnightPiece = "https://images.chesscomfiles.com/chess-themes/pieces/wood/150/wn.png"
const whiteBishopPiece =  'https://images.chesscomfiles.com/chess-themes/pieces/wood/150/wb.png'
const whiteKingPiece = "https://images.chesscomfiles.com/chess-themes/pieces/wood/150/wk.png"
const whiteQueenPiece = "https://images.chesscomfiles.com/chess-themes/pieces/wood/150/wq.png"

const blackSoldierPiece = 'https://images.chesscomfiles.com/chess-themes/pieces/wood/150/bp.png'
const blackRookPiece = "https://images.chesscomfiles.com/chess-themes/pieces/wood/150/br.png"
const blackKnightPiece = "https://images.chesscomfiles.com/chess-themes/pieces/wood/150/bn.png"
const blackBishopPiece = "https://images.chesscomfiles.com/chess-themes/pieces/wood/150/bb.png"
const blackKingPiece = "https://images.chesscomfiles.com/chess-themes/pieces/wood/150/bk.png"
const blackQueenPiece = "https://images.chesscomfiles.com/chess-themes/pieces/wood/150/bq.png"

const Soldier = "Soldier"
const Knight = "Knight"
const Rook = "Rook"
const Bishop = "Bishop"
const Queen = "Queen"
const King = "King"

const Color1 = "white"
const Color2 = "black"

const clickedColor = "#b9ca43"  
let userColor : typeof Color1 | typeof Color2 = Color1  
let userTurn :  boolean = true

let prevClickedSet: null | React.Dispatch<React.SetStateAction<boolean>> = null
let lastPieceClickedPos: null | [number, number]

let logicalBoard:   Square [][] = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null));
interface Piece{
    color: typeof Color1 | typeof Color2
    type: typeof Soldier | typeof Knight | typeof Rook | typeof Bishop | typeof Queen | typeof King
}

interface Square{
    row: number
    column: number
    pieceState: [Piece | null, React.Dispatch<React.SetStateAction<Piece | null>>]
    color: 1 | 2
    isClicked: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}


function handlePieceClicked(row: number, column: number){
    if(logicalBoard[row][column].pieceState[0]?.color == userColor){
        lastPieceClickedPos = [row, column]
    }
}

function renderPiece(piece: Piece | null, row: number, column: number) : JSX.Element{
    

    let piecesImagesDict = {
      Color1: {Soldier: whiteSoldierPiece, Rook: whiteRookPiece, Knight: whiteKnightPiece, Bishop: whiteBishopPiece, King: whiteKingPiece, Queen: whiteQueenPiece}
    , Color2: {Soldier: blackSoldierPiece, Rook: blackRookPiece, Knight: blackKnightPiece, Bishop: blackBishopPiece, King: blackKingPiece, Queen: blackQueenPiece}
    }
    piecesImagesDict.Color1[Soldier]
    return (
        piece != null ? 
               <div onClick={() => handlePieceClicked(row, column)} style={{backgroundColor:  "transparent" ,
                 backgroundImage: `url(${piece.color == Color1 ? piecesImagesDict.Color1[piece.type] : piecesImagesDict.Color2[piece.type] })` }} 
               className="w-[80%] h-[80%] bg-cover bg-center ml-[10%] mt-[10%]"  ></div> :<></> );

        
}

function handleBoardClick(square: Square){
       
    if(userTurn == null || userTurn == false )
    {
        return
    }

    // currClickedSet and prevClickedSet are just for marking the board when it's clciked
    let currClickedSet = square.isClicked[1]
    let currClicked = square.isClicked[0]

    // this means user first clicked on a piece, then clicked on a square or an enemey piece - meaning we need to move the piece 
    if((square.pieceState[0] == null || square.pieceState[0].color != userColor) && lastPieceClickedPos != null && prevClickedSet){
        prevClickedSet(false)
        movePiece(lastPieceClickedPos[0], lastPieceClickedPos[1], square.row, square.column)
        lastPieceClickedPos = null
        
        userTurn = true
        userColor = userColor == "black" ? "white" : "black"
    }
    // this means the user just clicked on a regular square or just an enemy piece first
    else if(square.pieceState[0] == null || square.pieceState[0].color != userColor)
        return 
    // this means the user just clicked on a piece that belongs to him
    else{
        if(prevClickedSet != null){
        prevClickedSet(false)
        if(prevClickedSet == currClickedSet && currClicked){
            currClickedSet(false)
            lastPieceClickedPos = null
        }
        else{
            currClickedSet(true)
        }
    }
    else{
        currClickedSet(true)
    }

    }
   

    prevClickedSet = currClickedSet
}




function renderSquare(square: Square, key: number): JSX.Element{
    let backgroundColorList = [squareColor1, squareColor2]
   
    return (
          <div onClick={() => handleBoardClick(square)} className={`h-[8vh] bg-cover `} 
    style={{transition:'background-color 0.7s ease',  backgroundColor: square.isClicked[0] ? clickedColor :  backgroundColorList[square.color - 1]}}   key={key}  >
       {renderPiece(square.pieceState[0], square.row, square.column)}</div> 
    )
}

function renderBoard(){
    const renderPieces = []
    for(let i=0;i<logicalBoard.length;i++){
        for(let j=0;j<logicalBoard[0].length;j++){
            renderPieces.push(renderSquare(logicalBoard[i][j], i * ROWS + j))
        }
    }
    return (
        <div className="grid grid-cols-8 gap-0 w-[90%] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[90vh] sm:h-[610px] ml-auto mr-auto mt-[15vh]">
            {
                renderPieces
            }
        </div>
      );
            
}



function movePiece(prevRow: number, prevColumn: number, newRow: number, newColumn: number){
    let temp = logicalBoard[prevRow][prevColumn].pieceState[0]
    logicalBoard[prevRow][prevColumn].pieceState[1](null)
    logicalBoard[newRow][newColumn].pieceState[1](temp)

}

export function Board(){

    let piecesArr : Piece[] = []
    let currColor: "black" | "white" = "white" 
    let piecesRowsIndexesMap = {0:0,1:1,6:3,7:2}
    // this variable decides which pieces index maps to which index on the board row-wise
    for(let i=0;i<2;i++){   
        piecesArr.push({color: currColor, type: Rook})
        piecesArr.push({color: currColor, type: Knight})
        piecesArr.push({color: currColor, type: Bishop})
        piecesArr.push({color: currColor, type: Queen})
        piecesArr.push({color: currColor, type: King})
        piecesArr.push({color: currColor, type: Bishop})
        piecesArr.push({color: currColor, type: Knight})
        piecesArr.push({color: currColor, type: Rook})

        for (let j=0; j<COLUMNS;j++){
            piecesArr.push({color: currColor, type: Soldier})
        }
               currColor = "black"
        // so here when we go to write the 7th  of the board we acctually map it to the 2 "row" of the array we created that holds the pieces
        // meaning that it will be the tools that are black and not regular Soldiers (Rook Knight... etc) we do the map in piecesRowIndexesMap[i as 7 | 6 | 1 | 0] 
    }
    for (let i=0; i < ROWS; i++){
        for(let j=0; j < COLUMNS; j++){
            logicalBoard[i][j] = {row: i, column: j,
                 pieceState: i in piecesRowsIndexesMap ? useState<Piece | null>(piecesArr[j + piecesRowsIndexesMap[i as 7 | 6 | 1 | 0] * COLUMNS]) : useState<Piece | null>(null)
                , color: (j + i % 2) % 2 == 0 ? 1 : 2,isClicked: useState(false)}
        }
    }
   
    return renderBoard()
}
