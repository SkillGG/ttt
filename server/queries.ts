export const Queries = {
  getPlayerByID: "select id,username from users where id=?",
  getPlayerByUsername: "select id,username from users where username=?",
};
