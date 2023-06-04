import User from '../../models/users/users.js';
import bcrypt from "bcrypt";
import { createError } from '../../error.js';
import  Jwt  from 'jsonwebtoken';
// login controller

export const loginController = async (req,res,next) => {
    const tokenSecret = process.env.TOKENSECRET;
    try {
        console.log(req.body);
        const user = await User.findOne({
            email: req.body.email,
        });
        if (!user) {
            return next(createError( 404, "user not found" ));
        }
        console.log(user.password);
        const isCorrent = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrent) {
                    return next(createError( 400, "wrong password" ));
                }

                const token = Jwt.sign({id: user._id}, tokenSecret);
                console.log(token);
                const {password, ...others} = user._doc;
                res.status(200).json({
                    message: "login successful",
                    status:'success',
                    token: token,
                    user: others
                });
    } catch (error) {
        next(error);
    }
};

// register controller

export const registerController = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        console.log(hashedPassword);
        const user = new User({
            ...req.body,
             password: hashedPassword,
        });

        await user.save();
        res.status(201).json({
                    message: "User created successfully",
                    status: 'success'
                });
    } catch (error) {
        next(error);
    }
};
