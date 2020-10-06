const joi = require('@hapi/joi');

const userName = joi.string();
const userEmail = joi.string().email({ tlds: { allow: true } });
const userPassword = joi.string();
const ok = joi.bool();

const registerUserSchema = {
    ok: ok,
    user : {
        name: userName.required(),
        email: userEmail.required().error((errors) => {
            return errors.map(error => {
              switch (error.type) {
                case "string.email":
                  return { message: "Use a valid email" };
                case "any.empty":
                  return { message: "Should not be empty" };
              }
            }
            )
          }),
        password: userPassword.required(),
    }

};

module.exports = {
    registerUserSchema
}
