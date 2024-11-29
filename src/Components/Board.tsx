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

let prevClickedSet: null | React.Dispatch<React.SetStateAction<boolean>> = null

interface Piece{
    color: typeof Color1 | typeof Color2
    type: typeof Soldier | typeof Knight | typeof Rook | typeof Bishop | typeof Queen | typeof King
}

interface Square{
    row: number
    column: number
    pieceState: [Piece, React.Dispatch<React.SetStateAction<Piece>>] | null
    color: 1 | 2
    isClicked: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

function renderPiece(piece: Piece, row: number, column: number) : JSX.Element{
    

    let piecesImagesDict = {
      Color1: {Soldier: whiteSoldierPiece, Rook: whiteRookPiece, Knight: whiteKnightPiece, Bishop: whiteBishopPiece, King: whiteKingPiece, Queen: whiteQueenPiece}
    , Color2: {Soldier: blackSoldierPiece, Rook: blackRookPiece, Knight: blackKnightPiece, Bishop: blackBishopPiece, King: blackKingPiece, Queen: blackQueenPiece}
    }
    piecesImagesDict.Color1[Soldier]
    return (
               <div style={{backgroundColor:  "transparent" ,
                 backgroundImage: `url(${piece.color == Color1 ? piecesImagesDict.Color1[piece.type] : piecesImagesDict.Color2[piece.type] })` }} 
               className="w-[80%] h-[80%] bg-cover bg-center ml-[10%] mt-[10%]"  ></div> );

        
}

function handleBoardClick(square: Square){
    let currClickedSet = square.isClicked[1]
    let currClicked = square.isClicked[0]
    if(prevClickedSet != null){
        prevClickedSet(false)
        if(prevClickedSet == currClickedSet && currClicked){
            currClickedSet(false)
        }
        else{
            currClickedSet(true)
        }
    }
    else{
        currClickedSet(true)
    }
    prevClickedSet = currClickedSet
}

function renderSquare(square: Square, key: number): JSX.Element{
    let backgroundColorList = [squareColor1, squareColor2]

    return (
          <div onClick={() => handleBoardClick(square)} className={`h-[8vh] bg-cover `} 
    style={{transition:'background-color 0.7s ease',  backgroundColor: square.isClicked[0] ? clickedColor :  backgroundColorList[square.color - 1]}}   key={key}  >
       {square.pieceState == null ? null : renderPiece(square.pieceState[0], square.row, square.column)}</div> 
    )
}

function renderBoard(board: Square[][]){
    const renderPieces = []
    for(let i=0;i<board.length;i++){
        for(let j=0;j<board[0].length;j++){
            renderPieces.push(renderSquare(board[i][j], i * ROWS + j))
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

export function Board(){
    let logicalBoard:   Square [][] = Array.from({ length: 8 }, () => Array(8).fill(null));
    let piecesArr : Piece[] = []
    let currColor: "black" | "white" = "white" 
    let piecesRowsIndexesMap = {0:0,1:1,6:3,7:2}
    // this variable decides which pieces index maps to which index on the board row-wise
    for(let i=0;i<2;i++){   
        piecesArr.push({color: currColor, type: "Rook"})
        piecesArr.push({color: currColor, type: "Knight"})
        piecesArr.push({color: currColor, type: "Bishop"})
        piecesArr.push({color: currColor, type: "Queen"})
        piecesArr.push({color: currColor, type: "King"})
        piecesArr.push({color: currColor, type: "Bishop"})
        piecesArr.push({color: currColor, type: "Knight"})
        piecesArr.push({color: currColor, type: "Rook"})

        for (let j=0; j<COLUMNS;j++){
            piecesArr.push({color: currColor, type: "Soldier"})
        }
               currColor = "black"
        // so here when we go to wite the 7th (index 7 = 8 row) of the board we acctually map it to the 2 "row" of the array we created that holds the pieces
        // meaning that it will be the tools that are black and not regular Soldiers (Rook Knight... etc) we do the map in piecesRowIndexesMap[i as 7 | 6 | 1 | 0] 
    }
    for (let i=0; i < ROWS; i++){
        for(let j=0; j < COLUMNS; j++){
            logicalBoard[i][j] = {row: i+1, column: j+1, pieceState: i in piecesRowsIndexesMap ? useState(piecesArr[j + piecesRowsIndexesMap[i as 7 | 6 | 1 | 0] * COLUMNS]) : null
                , color: (j + i % 2) % 2 == 0 ? 1 : 2,isClicked: useState(false)}
        }
    }
    return renderBoard(logicalBoard)
}
