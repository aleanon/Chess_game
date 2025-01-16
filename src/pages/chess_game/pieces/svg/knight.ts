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
            transform="translate(-100,500) scale(0.15,-0.13)" 
            fill=${color} stroke="none"
        >
        <path xmlns="http://www.w3.org/2000/svg" d="M2550 3774 c-40 -21 -90 -92 -152 -213 -61 -120 -88 -207 -111 -356 -19 -128 -19 -221 1 -276 16 -47 18 -56 143 -584 131 -554 169 -811 178 -1200 l6 -240 -68 -19 c-80 -23 -116 -50 -145 -112 -27 -56 -31 -184 -7 -230 16 -31 60 -74 92 -92 16 -9 9 -11 -41 -12 -94 0 -94 0 -94 -222 0 -166 2 -187 18 -201 17 -16 90 -17 840 -17 809 0 822 0 842 20 19 19 20 33 20 200 0 217 -1 220 -101 220 l-62 0 29 23 c70 54 94 102 94 187 0 70 -18 118 -62 166 -34 36 -54 48 -115 67 -64 19 -73 25 -69 42 3 11 8 50 12 87 l7 66 42 17 c135 51 213 243 185 454 -13 104 -56 231 -101 307 -40 66 -83 117 -284 336 -291 316 -290 314 -287 363 4 92 68 212 136 255 51 31 94 34 224 16 62 -9 146 -16 187 -16 64 0 77 3 104 26 20 17 36 44 47 79 14 48 14 57 0 83 -9 17 -31 40 -51 52 -19 12 -35 28 -35 36 0 16 38 45 100 76 62 32 70 62 35 134 -17 35 -44 69 -75 93 -45 36 -56 39 -182 59 -73 11 -209 31 -303 43 -144 19 -175 26 -203 47 -31 23 -41 25 -160 26 -156 1 -258 28 -292 76 -12 16 -34 31 -53 35 -47 11 -87 33 -134 76 -36 33 -49 39 -85 39 -24 -1 -55 -7 -70 -16z"/>
        </svg>
    `;
};

export const KNIGHT_SVG = {
  white: svg(Color.WHITE),
  black: svg(Color.BLACK),
} as const;