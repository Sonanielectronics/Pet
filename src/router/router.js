var express = require("express");
const router = express.Router();

var { class1 } = require('../controller/controller');

var jwt = require("jsonwebtoken");
var path = require("path");

var { upload } = require("../middleware/schema");

const HTTP = require("../../constant/response.constant");

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(HTTP.FORBIDDEN).json({ message: 'Token not provided', "status": `${HTTP.FORBIDDEN}` });
  }

  var SECRET_KEY = process.env.SECRET_KEY || "YOURSECRETKEYGOESHERE";
                                              
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(HTTP.UNAUTHORIZED).json({ message: 'Invalid token', "status": `${HTTP.UNAUTHORIZED}` });
    }

    req.EmailORPhone = decoded.EmailORPhone;
    next();
  });
}

router.post("/Register", upload.array('Image'), class1.a);
router.post("/Login",class1.b);
router.post("/LoginVerifyOtp", class1.c);
router.post("/ForgetPassword", class1.d);
router.post("/ForgetPassworVerifyOtp", class1.e);
router.post("/NewPassword", class1.f);
router.post("/PetUpload", verifyToken, upload.array('Image'), class1.g);
router.post("/PetSortByTypes", verifyToken, class1.h);
router.post("/FilterisePet", verifyToken, class1.i);
router.post("/FilterisePet2", verifyToken, class1.i2);
router.post("/PlanPurchaseByCustomer", verifyToken, class1.j);
router.post("/PetEdit", verifyToken, upload.array('Image'), class1.k);
router.get("/ViewMultiplePet", verifyToken, class1.l);
router.get("/ViewSinglePet", verifyToken, class1.m);
router.post("/EditLoginAccountdetails", verifyToken, upload.array('Image'), class1.n);
router.get("/ViewLoginAccountdetails", verifyToken, class1.o);

module.exports = router;