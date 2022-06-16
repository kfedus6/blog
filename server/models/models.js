const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    admin: { type: DataTypes.STRING, defaultValue: false },
    image: { type: DataTypes.STRING }
});

const Subscription = sequelize.define('subscription', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    subscriptionid: { type: DataTypes.INTEGER }
});

const Post = sequelize.define('post', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: true },
    content: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    like: { type: DataTypes.STRING },
    dislike: { type: DataTypes.STRING }
});

const Comment = sequelize.define('comment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.STRING },
    like: { type: DataTypes.STRING },
    dislike: { type: DataTypes.STRING }
});

User.hasOne(Subscription);
Subscription.belongsTo(User);

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

module.exports = { User, Subscription, Post, Comment };