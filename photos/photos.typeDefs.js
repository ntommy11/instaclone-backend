import { gql } from "apollo-server-express";

export default gql`
  type Photo {
    id: Int!
    user: User!
    file: String!
    caption: String
    hashtags: [Hashtag]
    likes: Int!
    comments: [Comment]
    createdAt: String!
    updatedAt: String!
    isMine: Boolean!
    isLiked: Boolean!
    numComment: Int!
  }
  type Hashtag {
    id: Int!
    createdAt: String!
    updatedAt: String!
    hashtag: String!
    photos(page: Int!): [Photo]
    totalPhotos: Int
  }
  type Like {
    id: Int!
    createdAt: String!
    updatedAt: String!
    photo: Photo!
  }
`
