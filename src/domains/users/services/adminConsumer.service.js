const HelperUtils = require("../../../genralUtils/helpers.util");
const User = require("../models/users.model");


class UsersService {
    static async registerUser (body) {
        const {firstName, lastName, email, role, password} = body;

        if( !firstName || !lastName || !email || !role || !password ) throw new Error('firstName, lastName, email, genre, role, pricePerEvent or password can not be empty');

        const usrExist = await User.findOne({ email });

        if(usrExist) throw new Error('email already link to a account');

        const newUser = new User({
            firstName,
            lastName,
            email,
            role,
            password
        });

        let user = await newUser.save();
        const token = await HelperUtils.generateToken(user._id);
        return {
            ...user._doc,
            token
        }

    }

    static async getUsers () {
        return await User.find();
    }

    static async getUser (id) {
        const user = await User.findById(id);

        if(!user) throw new Error('user not found')

        return user
    }

    static async updateUser (id, body) {
        console.log(body)
        const {firstName, lastName } = body;
        await HelperUtils.validateId(id, 'user');

        const findUser = await User.findById(id);

        if(!findUser) throw new Error('user not found');

        return await User.findByIdAndUpdate({_id: id}, {
            firstName: firstName || findUser.firstName,
            lastName: lastName || findUser.lastName
        }, { new: true})
    }

    static async deleteUser (id) {
        await HelperUtils.validateId(id);

        const userExist = await User.findById(id)

        if(!userExist) throw new Error('user do not exist');

        return await User.findByIdAndDelete(id);
    }
}

module.exports = UsersService;