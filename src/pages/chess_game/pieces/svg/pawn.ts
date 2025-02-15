import { Color } from "../chess_piece.js";

const svg = (color: Color) => {
  return /*svg*/ `
        <svg 
            xmlns="http://www.w3.org/2000/svg" version="1.0" 
            viewBox="0 0 750 350"
            preserveAspectRatio="xMidYMid meet"
            width="100%"
            height="100%"
        >
        <metadata>
        </metadata>
        <g 
            transform="translate(-150,500) scale(0.17,-0.17)" 
            fill=${color} stroke="none"
        >
        <path xmlns="http://www.w3.org/2000/svg" d="M3050 2830 c-203 -43 -349 -190 -392 -393 -32 -154 12 -308 125 -429 l44 -47 -40 -10 c-95 -26 -162 -107 -187 -227 -18 -84 -19 -196 -3 -212 8 -8 47 -12 110 -12 l98 0 -5 -27 c-2 -16 -7 -58 -10 -94 -14 -164 -103 -343 -246 -493 -62 -66 -76 -76 -106 -76 -73 0 -150 -52 -184 -125 -36 -78 -19 -165 45 -230 24 -24 57 -46 75 -50 36 -8 42 -25 8 -25 -43 0 -47 -14 -47 -186 0 -134 3 -165 16 -178 14 -14 96 -16 759 -16 663 0 745 2 759 16 13 13 16 44 16 178 0 168 -4 186 -43 186 -10 0 -17 3 -15 8 30 58 42 99 46 162 6 106 -8 150 -66 202 -139 126 -221 224 -276 335 -55 110 -68 165 -70 296 l-2 117 117 0 c92 0 119 3 129 15 19 23 6 197 -19 266 -36 96 -104 157 -193 174 l-36 7 43 45 c211 220 165 586 -94 753 -97 61 -254 93 -356 70z m65 -43 c0 -1 -48 -50 -107 -107 l-108 -105 105 108 c97 99 110 112 110 104z"/>
        </svg>
    `;
};

export const PAWN_SVG = {
  white: svg(Color.WHITE),
  black: svg(Color.BLACK),
} as const;
