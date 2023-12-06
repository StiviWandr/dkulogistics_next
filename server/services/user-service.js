import User from "../models/User.js";
import bcrypt from 'bcrypt'
import { v4 as uuidv4, v4 } from 'uuid';
import mailService from "./mail-service.js";
import tokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";
import ApiError from "../extensions/app-errors.js"

class UserService{
    async registration(data){
        let email = data.email;
        const candidate = await User.findOne({email});
        if (candidate){
            throw ApiError.BadRequest(`Пользователь c почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(data.password, 3)
        const activationLink = v4()
        const user = await User.create({...data, password: hashPassword})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async activate (activationLink){
        const user = await User.findOne({activationLink})
        if(!user){
            throw new Error ("Некорретная ссылка активации")
        }
        user.isActivated =true;
        await user.save();
    }
    async login (email, password){
        const user = await User.findOne({email});
        if(!user){
            throw ApiError.BadRequest("Пользователь с таким email не найден")
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals){
            throw ApiError.BadRequest("Неверный пароль")
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }
    async edit (id, reqBody){
        const { email, password, birthDay, name, lastName, fathersName } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { email, password, birthDay, name, lastName, fathersName },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        
        return updatedUser
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken)
        return token;
    }
    async refresh(refreshToken){ 
        if(!refreshToken){
            throw new ApiError(403, "Не имеет токена");
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFormDb = await tokenService.findToken(refreshToken)
       
        if (!tokenFormDb || !userData){
            throw ApiError.UnauthorizedError();
        }
        const user = await User.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }
    async getUserById(id){
        const userData = await User.findById(id)
        return userData;
    }
    async getAllUsers(){
        const users = await User.find();
        return users;
    }
}
const userService = new UserService();

export default userService;