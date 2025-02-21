import UserModel from "../models/user.model.js";
class UserController{
    static async getUser(req, res) {
        try {
          const { id } = req.params;
          const user=await UserModel.findById(id)
          return res.status(200).json({
            success: true,
            user,
          });
        } catch (err) {
          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }
      }
}
export default UserController;