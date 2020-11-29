const APP_Name = "LostAndFound";

const FACEBOOK = {
    clientID: "2503599789703821",
    clientSecret: "645088b310270cf3abbda58e01f65e96"
};

const GOOGLE = {
    clientID: "767059472934-s7s2rfm1ck3auiq620h2amls0d1rucs9.apps.googleusercontent.com",
    clientSecret: "NlNvTx6kCSq7B2_YLAog8jtG"
};

const JWT_SECRET = process.env.JWT_SECRET || "sdfsdSDFD5sf4rt4egrt4drgsdFSD4e5";

const JWT_TOKEN_EXP = "24";

const PORT = 4000;

module.exports = {
    APP_Name,
    JWT_TOKEN_EXP,
    JWT_SECRET,
    FACEBOOK,
    GOOGLE,
    PORT
};