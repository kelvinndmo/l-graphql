const Post = {
  author(parent, args, { db }, info) {
    return db.users.find((user) => user.id === parent.author);
  },
  comments(parent, args, ctx, info) {
    return db.commments.filter((comment) => comment.post_id === parent.id);
  },
};

export { Post as default };
