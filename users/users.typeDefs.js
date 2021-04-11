import { gql } from "apollo-server";

export default gql`
  type User{
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    bio: String
    avatar: String
    photos: [Photo]
    following: [User]
    followers: [User]
    totalFollowing: Int! 
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
  }
`
// computed fields: db에 저장되지는 않지만, 스키마에 정의하고 쿼리할 수 있는 필드!

/*
    isFollowing: Boolean!
    isMe: Boolean!
*/