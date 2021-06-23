let users = [
  { id: "1", name: "kelvin Onkundi", email: "ndemo@gmail.com" },
  { id: "2", name: "Anita Waither", email: "novakss@gmail.com", age: 30 },
  { id: "3", name: "Anita Waither", email: "novakss@gmail.com", age: 30 },
];

let comments = [
  { id: "1", author: "2", body: "Hello i dont think you meant it", post_id: "1" },
  { id: "2", author: "1", body: "Hello i dont think you meant it", post_id: "2" },
  { id: "4", author: "2", body: "Hello i dont think you meant it", post_id: "2" },
];

let posts = [
  {
    id: "1",
    title: "Graphql 101",
    body: "This is now used for graphql",
    published: true,
    author: "1",
  },
  {
    id: "2",
    title: "Graphql 102",
    body: "This is now used for graphql",
    published: true,
    author: "2",
  },
  {
    id: "3",
    title: "Graphql 102",
    body: "This is now used for graphql",
    published: true,
    author: "3",
  },
];

const db = {
  comments,
  posts,
  users,
};

export { db as default };
