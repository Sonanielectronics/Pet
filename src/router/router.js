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
router.post("/FilterisePet2", verifyToken, class1.j);
router.post("/PlanPurchaseByCustomer", verifyToken, class1.k);

router.post("/PetEdit", verifyToken, upload.array('Image'), class1.l);
router.get("/ViewMultiplePet", verifyToken, class1.m);
router.get("/ViewSinglePet", verifyToken, class1.n);
router.post("/EditLoginAccountdetails", verifyToken, upload.array('Image'), class1.o);
router.get("/ViewLoginAccountdetails", verifyToken, class1.p);

router.post("/like", verifyToken, class1.q);
router.post("/Unlike", verifyToken, class1.r);
router.post("/Favourite", verifyToken, class1.s);
router.post("/FavouriteWithFilter", verifyToken, class1.t);
router.get("/Notification", verifyToken, class1.u);
router.get("/History", verifyToken, class1.v);
router.post("/MainPage", verifyToken, class1.w);
router.post("/Map", verifyToken, class1.x);
router.post("/Adoption", verifyToken, class1.y); // Define Only Route
router.post("/AdsPage1", verifyToken, class1.z);
router.post("/AdsPage2", verifyToken, class1.A);

router.get("/Plan", verifyToken, class1.B);
router.post("/CoinPurchaseByCustomer", verifyToken, class1.C);
router.post("/Chat", verifyToken, class1.D);

router.get('/socketChat',class1.E);
router.get("/Adopt", verifyToken, class1.F);
router.get("/partner", verifyToken, class1.G);

module.exports = router;