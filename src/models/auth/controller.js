const service = require("./service");

module.exports = {
  login: async (req, res) => {
    const data = req.body;
    const result = await service.login(data);
    res.status(200).send(result);
  },

  signup: async (req, res, next) => {
    const data = req.body;
    const result = service.signup(data);
    res.status(200).send(result);
  },

  refreshToken: async (req, res, next) => {
    const data = req.body;
    const result = service.refreshToken(data);
    res.status(200).send(result);
  },
};

// //MM-3
// const login = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const body = req.body;
//     const results = await AuthService.login(body);
//     ResponseSender({ res: res, status: 200, response: results });
//   } catch (err) {
//     next(err);
//   }
// };

// //MM-3
// const signup = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const body = req.body;
//     const results = await AuthService.signup(body);
//     ResponseSender({ res: res, status: 200, response: results });
//   } catch (err) {
//     next(err);
//   }
// };

// //MM-3
// const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const body = req.body;
//     const results = await AuthService.refreshToken(body);
//     ResponseSender({ res: res, status: 200, response: results });
//   } catch (err) {
//     next(err);
//   }
// };

// export default { login, signup, refreshToken };
