import axios from "axios";

// func validate with gg recaptcha
const validateHuman = async (token) => {
    const secret = process.env.RECAPTCHA_SECRET_KEY || "6LcxqugZAAAAAGVIXI5Zx_";
    const response = token;

    // pass parameter
    const urlRecapGG = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${response}`;
    try {
        const res = await axios.post(urlRecapGG);
        if (res.data.success) {
            // console.log("res.data.success", res.data.success);
            return res.data.success;
        }
    } catch (error) {
        console.log("error validateHuman", error);
        return false;
    }
};

export { validateHuman };
