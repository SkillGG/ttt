export type dbUser_sql = {
  username: string;
  id: string;
  password: string;
};
export type dbGameData_sql = {
  id: string;
  moves: string;
  points: string;
};

export type dbRoomData_sql = {
  id: string;
  dataid: string;
  creatorid: string;
};

export type dbUser = {
  username: string;
  id: number;
  password: string;
};

export type dbPoint = string;
export type dbMove = string;

export type dbGameData = {
  id: number;
  moves: dbMove[];
  points: dbPoint[];
};

export type dbRoomData = {
  id: number;
  dataid: number;
  creatorid: number;
};
