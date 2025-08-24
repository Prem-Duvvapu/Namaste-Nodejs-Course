const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid!");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email ID is not valid!");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password!");
    }
}

const validateProfileEditData = (req) => {
    const editAllowedFields = [
        "firstName",
        "lastName",
        "age",
        "gender",
        "photoUrl",
        "about",
        "skills",
    ];

    const isEditAllowed = Object.keys(req.body).every(field => editAllowedFields.includes(field));

    return isEditAllowed;
}

module.exports = {
    validateSignUpData,
    validateProfileEditData,
}