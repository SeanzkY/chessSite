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

interface Piece{
    color: typeof Color1 | typeof Color2
    type: typeof Soldier | typeof Knight | typeof Rook | typeof Bishop | typeof Queen | typeof King
}

interface Square{
    row: number
    column: number
    piece: Piece | null
    color: 1 | 2
}

function renderPiece(piece: Piece, row: number, column: number) : JSX.Element{
    

    let piecesImagesDict = {
      Color1: {Soldier: whiteSoldierPiece, Rook: whiteRookPiece, Knight: whiteKnightPiece, Bishop: whiteBishopPiece, King: whiteKingPiece, Queen: whiteQueenPiece}
    , Color2: {Soldier: blackSoldierPiece, Rook: blackRookPiece, Knight: blackKnightPiece, Bishop: blackBishopPiece, King: blackKingPiece, Queen: blackQueenPiece}
    }
    piecesImagesDict.Color1[Soldier]
    const [isExists, setIsExists] = useState(true)
    return (
        isExists ? 
               <div style={{backgroundColor:  "transparent" ,
                 backgroundImage: `url(${piece.color == Color1 ? piecesImagesDict.Color1[piece.type] : piecesImagesDict.Color2[piece.type] })` }} 
               className="w-[80%] h-[80%] bg-cover bg-center ml-[10%] mt-[10%]"  ></div> : <></>);

        
}

function handleBoardClick(){
    console.log("I have been clicked")
}

function renderSquare(square: Square, key: number): JSX.Element{
    let backgroundColorList = [squareColor1, squareColor2]

    return (
          <button onClick={handleBoardClick} className={`h-[8vh] bg-cover `} 
    style={{ backgroundColor: backgroundColorList[square.color - 1]}}   key={key}  >
       {square.piece == null ? null : renderPiece(square.piece, square.row, square.column)}</button> 
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
    for (let i=0; i < ROWS; i++){
        for(let j=0; j < COLUMNS; j++){
            logicalBoard[i][j] = {row: i+1, column: j+1, piece: null, color: (j + i % 2) % 2 == 0 ? 1 : 2}
        }
    }
    return renderBoard(logicalBoard)
}
