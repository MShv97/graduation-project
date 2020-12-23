import { compare, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { CustomError } from "../helpers";
import JWTGenerator from "../helpers/JWTGenerator";
import { RestaurantRepo } from "../repositories";

//MM-6
const login = async (body: any) => {
  try {
    const { email, password } = body;
    const restaurant = await RestaurantRepo.findOneOrFail({ where: { email: email } });
    // verify password
    if (!(await compare(password, restaurant.password))) throw new CustomError({ status: 401, message: "Password is invalid." });
    // generate JWT tokens
    const payload = { userId: restaurant.id };
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

//MM-6
const signup = async (body: any) => {
  try {
    const restaurant = RestaurantRepo.create();
    restaurant.name = body.name;
    restaurant.email = body.email;
    restaurant.password = await hash(body.password, Number(process.env.BCRYPT_ROUNDS));
    restaurant.address = body.address;
    await RestaurantRepo.save(restaurant);
    return "Success";
  } catch (err) {
    if (err.code == "ER_DUP_ENTRY") throw new CustomError({ status: 409, message: "Email already exist." });
    throw err;
  }
};

export default { login, signup };
