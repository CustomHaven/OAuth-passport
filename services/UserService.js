const Model = require('../models');
// console.log('service \n\n\n\n')
// console.log(Model)
// console.log('service \n\n\n\n')
class UserService {
    
  constructor(sequelize) {
      // Model(sequelize);
      this.client = sequelize;
      this.models = sequelize.models;
  }

  async thirdPartyLogin(data) {
      try {
          const { username, google_id, thumbnail } = data;
// the reason we deconstructing it is findOrCreate returns an array of 2 objects user details and created which is a boolean!
          const [ user ] = await this.models.User.findOrCreate({ 
            where: { 
              username, google_id, thumbnail
            }, 
            default: { 
              username,
              google_id,
              thumbnail
            } 
          });
          return user;
      } catch (error) {
          return error
      }
  }

  async findByPK(id) {
    try {
      const user = await this.models.User.findById(id);
      return user;
    } catch (error) {
        return error
    }
  }
  
  async findOneWithWhere(id) {
    try {
      const user = await this.models.User.findOne({
        where: {
          id: id
        }
      })
      console.log(user)
      return user;
    } catch (error) {
        return error
    }
  }
}


module.exports = UserService;