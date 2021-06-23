const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailExists = db.users.some((user) => user.email === args.data.email);
    if (emailExists) {
      throw new Error("Email token");
    } else {
      const u = {
        ...args.data,
        id: Date.now(),
      };

      users.push(u);
      return u;
    }
  },
  deleteUser(parent, args, { db }, info) {
    const userId = args.userId;
    const userIndex = db.users.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      const deletedUsers = db.users.splice(userIndex, 1);
      const nonUserPosts = db.posts.filter((p) => p.author !== userIndex);
      const nonUserComments = db.commments.filter((c) => c.author !== userId);
      db.commments = nonUserComments;
      db.posts = nonUserPosts;
      return deletedUsers[0];
    }
  },
  updateUser(parent, args, { db }, info){
    const {id, data} = args;
    const userToUpdate = db.users.find((user) => user.id === id)
    if(!userToUpdate){
      throw new Error("User not found")
    }
    if(typeof data.email === 'string'){
      const emailTaken = db.users.some((user) =>  user.email === data.email)
      if(emailTaken){
        throw new Error("Email in use")
      }
      userToUpdate.email = data.email
    }
    if(typeof data.name === "string"){
      userToUpdate.name = data.name
    }
    if(typeof data.age !== 'undefined'){
      userToUpdate.age = data.age
    }

    return userToUpdate;
  },
  createPost(parent, args, { db,pubsub  }, info) {
    const userExists = db.users.some((user) => user.id === args.data.author);

    if (userExists) {
      const post = {
        ...args.data,
        id: Date.now(),
      };
      pubsub.publish('post', {
        post:{
          mutation:'CREATED',
          data:post
        }
      })
      db.posts.push(post);
      return post;
    } else {
      throw new Error("User not found...");
    }
  },
  updatePost(parent, args, {db}, info){
    const {id, data} = args
    let postToUpdate = db.posts.find((post) => post.id === id)
    if(!postToUpdate){
      throw new Error("Post not found")
    }
    postToUpdate = {
      ...postToUpdate,
      ...data
    }

    return postToUpdate
  },
  createComment(parent, args, { db, pubsub }, info) {
    const { user, post, text } = args.data;
    const u = db.users.some((u) => u.id === user);
  
    const pst = db.posts.some((p) => p.id === post);

    if (u && pst) {
      const comment = {
        id: new Date(),
        author: user,
        body: text,
      };

      db.comments.push({ ...comment, post_id: post });
      pubsub.publish(`comment ${args.data.post}`, {
        comment:{
          mutation:'CREATED',
          data:comment
        }
      })
      return comment;
    }
  },


  updateComment(parent, args, {db}, info){
    const {data, id} = args;
    
    let commentToUpdate = db.comments.find((cmt) => cmt.id === id)
    console.log(commentToUpdate)
    if(!commentToUpdate){
      throw new Error("Comment not found")
    }
    commentToUpdate = {
      ...commentToUpdate,
      ...data
    }

    return commentToUpdate
  },

};

export { Mutation as default };
