const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getAllRecipes: async (parent, args, { Recipe }) => {
      const allRecipes = await Recipe.find().sort({ createdDate: 'desc' });
      return allRecipes;
    },
    getUserRecipes: async (parent, { username }, { Recipe }) => {
      const userRecipes = await Recipe.find({ username }).sort({ createdDate: 'desc' });
      return userRecipes;
    },
    getCurrentUser: async (parent, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }

      const user = await User.findOne({
        username: currentUser.username
      }).populate({
        path: 'favourites',
        model: 'Recipe'
      });
      return user;
    },
    getRecipe: async (parent, args, { Recipe }) => {
      const recipe = await Recipe.findOne({ _id: args._id });
      return recipe;
    },
    searchRecipes: async (parent, { searchTerm }, { Recipe }) => {
      if (searchTerm) {
        const searchResult = await Recipe.find(
          {
            $text: { $search: searchTerm }
          },
          {
            score: { $meta: 'textScore' }
          }
        ).sort({
          score: { $meta: 'textScore' }
        });
        return searchResult;
      } else {
        const recipes = await Recipe.find().sort({
          likes: 'desc',
          createdDate: 'desc'
        });
        return recipes;
      }
    }
  },
  Mutation: {
    addRecipe: async (
      parent,
      { name, description, category, instructions, username },
      { Recipe }
    ) => {
      const newRecipe = new Recipe({
        name,
        description,
        category,
        instructions,
        username
      });
      return newRecipe.save();
    },
    likeRecipe: async (parent, { _id, username }, { Recipe, User }) => {
      const recipe = await Recipe.findOneAndUpdate({ _id }, { $inc: { likes: 1 } });
      const user = await User.findOneAndUpdate({ username }, { $addToSet: { favourites: _id } });
      return recipe;
    },
    unlikeRecipe: async (parent, { _id, username }, { Recipe, User }) => {
      const recipe = await Recipe.findOneAndUpdate({ _id }, { $inc: { likes: -1 } });
      const user = await User.findOneAndUpdate({ username }, { $pull: { favourites: _id } });
      return recipe;
    },
    deleteUserRecipe: async (parent, { _id }, { Recipe }) => {
      const recipe = await Recipe.findOneAndRemove({ _id });
      return recipe;
    },
    signinUser: async (parent, { username, password }, { User }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new Error('User not found');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new Error('Invalid password');
      }

      return { token: createToken(user, process.env.SECRET, '1hr') };
    },
    signupUser: async (parent, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });

      if (user) {
        throw new Error('User already exists');
      }

      const newUser = await new User({
        username,
        email,
        password
      }).save();

      return { token: createToken(newUser, process.env.SECRET, '1hr') };
    }
  }
};
