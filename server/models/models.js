const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    admin: { type: DataTypes.BOOLEAN, defaultValue: false },
    image: { type: DataTypes.STRING }
});

const Subscription = sequelize.define('subscription', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    subscriptionId: { type: DataTypes.INTEGER }
});

const InfoUser = sequelize.define('infoUser', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    postId: { type: DataTypes.INTEGER },
    commentId: { type: DataTypes.INTEGER },
    like: { type: DataTypes.BOOLEAN, defaultValue: false },
    dislike: { type: DataTypes.BOOLEAN, defaultValue: false }
});

const Post = sequelize.define('post', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: true },
    content: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    like: { type: DataTypes.STRING, defaultValue: 0 },
    dislike: { type: DataTypes.STRING, defaultValue: 0 }
});

const TypePost = sequelize.define('typePost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING, unique: true }
});

const Comment = sequelize.define('comment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.STRING },
    like: { type: DataTypes.STRING, defaultValue: 0 },
    dislike: { type: DataTypes.STRING, defaultValue: 0 }
});

User.hasMany(Subscription);
Subscription.belongsTo(User);

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(InfoUser);
InfoUser.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

TypePost.hasMany(Post);
Post.belongsTo(TypePost);

module.exports = { User, Subscription, Post, Comment, InfoUser, TypePost };