const Query = {
  me() {
    return {
      id: "Kelvin",
      name: "Kelvin",
      email: "dsddsd@gmail.com",
    };
  },
  post() {
    return {
      id: "4rt",
      title: "Graphql 101",
      body: "Gell",
      published: false,
    };
  },
  users(parent, args, { db }, info) {
    if (args.query) {
      return db.users.filter((user) =>
        user.name.toLowerCase().includes(args.query.toLowerCase())
      );
    }
    return db.users;
  },
  posts() {
    return posts;
  },
};

export { Query as default };
