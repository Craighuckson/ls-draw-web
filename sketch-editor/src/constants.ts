'use strict';

export const HEIGHT = 800;
export const WIDTH = 800;
// the four values correspond to int values of points on a line (x1,y1,x2,y2)
export const ECURB: number[] = [WIDTH / 3, HEIGHT * 0.067, WIDTH / 3, HEIGHT * 0.933];
export const WCURB = [
  (WIDTH * 2) / 3,
  HEIGHT * 0.067,
  (WIDTH * 2) / 3,
  HEIGHT * 0.933,
];
export const NCURB = [
  WIDTH * (1 / WIDTH),
  (HEIGHT * 2) / 3,
  (WIDTH * 69) / WIDTH,
  (HEIGHT * 2) / 3,
];
export const SCURB = [WIDTH * (1 / WIDTH), HEIGHT / 3, WIDTH - 2, HEIGHT / 3];

export const HNCURB = [
  NCURB[0],
  SCURB[1] + HEIGHT / 15,
  NCURB[2],
  SCURB[1] + HEIGHT / 15,
];
export const HSCURB = [
  SCURB[0],
  NCURB[1] - HEIGHT / 15,
  NCURB[2],
  NCURB[1] - HEIGHT / 15,
];

// these are x,y (int) coordinates for street text labels
export const NSTREET = [WIDTH / 2, (NCURB[1] + HEIGHT) / 2];
export const SSTREET = [WIDTH / 2, SCURB[1] / 2];
export const WSTREET = [(WCURB[0] + WIDTH) / 2, HEIGHT / 2];
export const ESTREET = [ECURB[0] / 2, HEIGHT / 2];
export const HSTREET = [WIDTH / 2, HEIGHT / 2];

//curb labels
export const HNCURBLABEL = [(65 / 70) * WIDTH, (42 / 60) * HEIGHT, 12]; // x, y , fontsize
export const HSCURBLABEL = [(65 / 70) * WIDTH, (18 / 60) * HEIGHT, 12];
export const WCURBLABEL = [(40 / 70) * WIDTH, (6 / 60) * HEIGHT, 12];
export const ECURBLABEL = [(22 / 70) * WIDTH, (6 / 60) * HEIGHT, 12];

export const NBLHOUSE1 = [WIDTH * 0.1, HEIGHT * 0.2, "m"]; // upper left x, upper left y, house size
export const NBLHOUSE2 = [WIDTH * 0.8, HEIGHT * 0.2, "m"];
export const NWBLHOUSE = [8, 8, "m"];
export const NEBLHOUSE = [18, 8, "m"];
export const SBLHOUSE1 = [WIDTH * 0.1, HEIGHT * 0.7, "m"];
export const SBLHOUSE2 = [WIDTH * 0.8, HEIGHT * 0.7, "m"];
export const SWBLHOUSE = [9, 16, "m"];
export const SEBLHOUSE = [16, 16, "m"];
export const WBLHOUSE1 = [WIDTH * 0.2, HEIGHT * 0.1, "m"];
export const WBLHOUSE2 = [WIDTH * 0.2, HEIGHT * 0.8, "m"];
export const EBLHOUSE1 = [WIDTH * 0.7, HEIGHT * 0.1, "m"];
export const EBLHOUSE2 = [WIDTH * 0.7, HEIGHT * 0.8, "m"];

export const NPLTOPL_DIGBOX = [6, 16, 24, 28];
export const NWPLTOPL_DIGBOX = [8, 8, 28, 28];
export const NEPLTOPL_DIGBOX = [4, 8, 24, 28];
export const SPLTOPL_DIGBOX = [6, 2, 24, 14];
export const SWPLTOPL_DIGBOX = [9, 3, 27, 22];
export const SEPLTOPL_DIGBOX = [3, 3, 22, 22];
export const WPLTOPL_DIGBOX = [14, 6, 28, 24];
export const EPLTOPL_DIGBOX = [2, 2, 15, 28];
