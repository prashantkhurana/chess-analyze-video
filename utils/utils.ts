import { Chess, validateFen } from 'chess.js';

function getMovesFromPgn(pgn:string) {
    pgn = pgn.substring(pgn.lastIndexOf("]") + 1);
    const chess = new Chess();
    chess.loadPgn(pgn, { strict: false});
    return chess.pgn().replaceAll(/{.*?}/gm, "");
}

function removeHeaders(chessGame : Chess) {
    const headers = chessGame.header();
    for (const key in headers) {
        chessGame.removeHeader(key);
    }
    return chessGame;
}

export {
    getMovesFromPgn
}

