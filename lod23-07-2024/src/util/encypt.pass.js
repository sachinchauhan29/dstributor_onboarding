const bcrypt = require('bcrypt');


const encrypt = async (password) => {
    const saltRounds = 10; 

    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (error) {
        console.error('Error occurred while hashing password:', error);
        throw error;
    }
};

module.exports={encrypt};
