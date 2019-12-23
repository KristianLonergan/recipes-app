exports.typeDefs = `

  type Recipe {
    _id: ID,
    name: String! 
    imageUrl: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String
    likes: Int
    username: String
  },
  
  type User {
    username: String!
    password: String!
    email: String!
    joinDate: String
    favourites: [Recipe]
  }

  type Token {
    token: String!
  }

  type Query {
    getAllRecipes: [Recipe]

    getRecipe(_id: ID): Recipe

    searchRecipes(searchTerm: String): [Recipe]

    getCurrentUser: User

    getUserRecipes(username: String!): [Recipe]
  }

  type Mutation {
    addRecipe(name: String!, imageUrl: String!, category: String!, description: String!, instructions: String!, username: String): Recipe

    deleteUserRecipe(_id: ID!): Recipe

    signinUser(username: String!, password: String!): Token
    
    signupUser(username: String!, email: String!, password: String!): Token

    likeRecipe(_id: ID!, username: String!): Recipe

    unlikeRecipe(_id: ID!, username: String!): Recipe

    updateUserRecipe(_id: ID!, name: String!, imageUrl: String!, description: String!, category: String!): Recipe
  }

`;