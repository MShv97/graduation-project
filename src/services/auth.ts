import { compare, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { CustomError } from "../helpers";
import JWTGenerator from "../helpers/JWTGenerator";
import { UserRepo } from "../repositories";

//MM-3
const login = async (body: any) => {
  try {
    const { email, password } = body;
    const user = await UserRepo.findOneOrFail({ where: { email: email }, relations: ["restaurant"] });
    // verify password
    if (!(await compare(password, user.password))) throw new CustomError({ status: 401, message: "Password is invalid." });
    // generate JWT tokens
    console.log(user);

    const payload = { userId: user.id, role: user.role, restaurantId: user.restaurant.id };
    const { access_token, refresh_token } = JWTGenerator(payload);

    return {
      access_token,
      refresh_token,
    };
  } catch (err) {
    if (err.name == "EntityNotFound") throw new CustomError({ status: 401, message: "Email is invalid." });
    throw err;
  }
};

//MM-3
const signup = async (body: any) => {
  try {
    const user = UserRepo.create();
    user.first_name = body.first_name;
    user.last_name = body.last_name;
    user.email = body.email;
    user.password = await hash(body.password, Number(process.env.BCRYPT_ROUNDS));
    user.role = body.role;
    user.birthdate = body.birthdate;
    user.restaurant = body.restaurant_id;
    await UserRepo.save(user);
    return "OK";
  } catch (err) {
    if (err.code == "ER_DUP_ENTRY") throw new CustomError({ status: 409, message: "Email already exist." });
    if (err.code == "ER_NO_REFERENCED_ROW_2") throw new CustomError({ status: 404, message: "Restaurant was not found." });
    throw err;
  }
};

//MM-3
const refreshToken = async (body: any) => {
  try {
    const rToken = body.refresh_token;
    const { userId, type } = <any>verify(rToken, process.env.JWT_REFRESH_SECRET);
    const payload = { userId, type };
    const { access_token, refresh_token } = JWTGenerator(payload);
    return {
      access_token,
      refresh_token,
    };
  } catch (err) {
    if (err.name == "TokenExpiredError") throw new CustomError({ status: 401, message: "RefreshToken has been expired." });
    if (err.name == "JsonWebTokenError") throw new CustomError({ status: 401, message: "RefreshToken is invalid." });

    throw err;
  }
};

export default { login, signup, refreshToken };
