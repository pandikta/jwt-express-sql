const bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
};
module.exports = {
    hashPassword,
};
