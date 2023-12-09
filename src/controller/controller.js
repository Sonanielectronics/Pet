var { Todo, Todo2, Todo3 } = require("../model/schema");
const HTTP = require("../../constant/response.constant");

var jwt = require("jsonwebtoken");
var path = require("path");
var bcrypt = require("bcryptjs");
var nodemailer = require("nodemailer");

function sendEmail(to, subject, text) {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "shzksklf315@gmail.com",
            pass: "hbsehwvznlahcxno",
        },
    });
    const mailOptions = {
        from: "your@email.com",
        to: to,
        subject: subject,
        html: text,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

const moment = require('moment-timezone');

require('dotenv').config();

var SECRET_KEY = process.env.SECRET_KEY || "YOURSECRETKEYGOESHERE";
var PUSHDATALOCATION = process.env.PUSHDATALOCATION || "https://wevalet.s3.amazonaws.com";

const os = require('os');

const axios = require('axios');

const multer = require('multer');

const AWS = require("aws-sdk");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

class class1 {
    static a = async (req, res) => {
        try {

            if (req.body.EmailORPhone || req.body.EmailORPhone2) {

                if (req.files && req.body.Name && req.body.PassWord && req.body.Category) {

                    if (req.body.EmailORPhone && req.body.EmailORPhone2) {

                        var User2 = await Todo.findOne({ EmailORPhone2: req.body.EmailORPhone2 })
                        var User3 = await Todo.findOne({ EmailORPhone: req.body.EmailORPhone2 })
                        var User4 = await Todo.findOne({ EmailORPhone2: req.body.EmailORPhone })
                        var User5 = await Todo.findOne({ EmailORPhone: req.body.EmailORPhone })

                        if (!User2 && !User3 && !User4 && !User5) {

                            // var User2 = await Todo.findOne({ EmailORPhone2: req.body.EmailORPhone2 })
                            // var User3 = await Todo.findOne({ EmailORPhone: req.body.EmailORPhone2 })
                            var User = await Todo.findOne({ EmailORPhone2: req.body.EmailORPhone })
                            // var User5 = await Todo.findOne({ EmailORPhone: req.body.EmailORPhone })

                        } else {

                            if (User2) {
                                var User = await User2
                            }

                            if (User3) {
                                var User = await User3
                            }

                            if (User4) {
                                var User = await User4
                            }

                            if (User5) {
                                var User = await User5
                            }

                        }

                    } else if (req.body.EmailORPhone) {

                        var User2 = await Todo.findOne({ EmailORPhone2: req.body.EmailORPhone })
                        var User3 = await Todo.findOne({ EmailORPhone: req.body.EmailORPhone })

                        if (!User2 && !User3) {

                            // var User = await Todo.findOne({ EmailORPhone2: req.body.EmailORPhone })
                            var User = await Todo.findOne({ EmailORPhone: req.body.EmailORPhone })

                        } else {

                            if (User2) {
                                var User = await User2
                            }

                            if (User3) {
                                var User = await User3
                            }

                        }

                    } else {

                        var User2 = await Todo.findOne({ EmailORPhone2: req.body.EmailORPhone2 })
                        var User3 = await Todo.findOne({ EmailORPhone: req.body.EmailORPhone2 })

                        if (!User2 && !User3) {

                            var User = await Todo.findOne({ EmailORPhone2: req.body.EmailORPhone2 })
                            // var User = await Todo.findOne({ EmailORPhone: req.body.EmailORPhone2 })

                        } else {

                            if (User2) {
                                var User = await User2
                            }

                            if (User3) {
                                var User = await User3
                            }

                        }

                    }

                    // var User = await Todo.findOne({ EmailORPhone: req.body.EmailORPhone })

                    if (!User) {

                        const hashedPassword = await bcrypt.hash(req.body.PassWord, 12);

                        const currentDate2 = await new Date();

                        currentDate2.setDate(currentDate2.getDate() - 1);

                        const year = await currentDate2.getFullYear();
                        const month = await currentDate2.getMonth() + 1;
                        const day = await currentDate2.getDate();

                        let PlanExpiredDate = await `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

                        const suratTimezone = 'Asia/Kolkata';
                        const currentTimeInSurat = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm:ss');

                        const currentDate = new Date(currentTimeInSurat);

                        var currentYear = await currentDate.getFullYear();
                        var currentMonth;
                        var currentDay;
                        var currentHours;
                        var currentMinutes;
                        var currentSeconds;

                        if (currentDate.getMonth() < 10) {
                            var currentMonth = await `0${currentDate.getMonth() + 1}`;
                        } else {
                            var currentMonth = await currentDate.getMonth() + 1;
                        }

                        if (currentDate.getDate() < 10) {
                            var currentDay = await `0${currentDate.getDate()}`;
                        } else {
                            var currentDay = await currentDate.getDate();
                        }

                        if (currentDate.getHours() < 10) {
                            var currentHours = await `0${currentDate.getHours()}`;
                        } else {
                            var currentHours = await currentDate.getHours();
                        }

                        if (currentDate.getMinutes() < 10) {
                            var currentMinutes = await `0${currentDate.getMinutes()}`;
                        } else {
                            var currentMinutes = await currentDate.getMinutes();
                        }

                        if (currentDate.getSeconds() < 10) {
                            var currentSeconds = await `0${currentDate.getSeconds()}`;
                        } else {
                            var currentSeconds = await currentDate.getSeconds();
                        }

                        const formattedDateTime = `${currentYear} ${currentMonth} ${currentDay} ${currentHours} ${currentMinutes} ${currentSeconds}`;

                        const files = req.files;

                        const Images = [];

                        for (let i = 0; i < files.length; i++) {

                            const file = files[i];

                            const fileExt = path.extname(file.originalname);
                            const fileName = formattedDateTime + (i + 1) + fileExt;

                            const s3 = new AWS.S3({
                                accessKeyId: process.env.AWS_ACCESS_KEY,
                                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                            });

                            const params = {
                                Bucket: process.env.AWS_S3_BUCKET,
                                Key: `${fileName}`,
                                Body: file.buffer,
                                ACL: 'public-read',
                                ContentType: file.mimetype,
                            };

                            const data = await s3.upload(params).promise();
                            var dataKey = data.Key
                            var pushDataLocation = `${PUSHDATALOCATION}/${dataKey}`
                            await Images.push(pushDataLocation);

                        }

                        let data = new Todo({
                            Image: Images,
                            Name: req.body.Name,
                            EmailORPhone: req.body.EmailORPhone,
                            EmailORPhone2: req.body.EmailORPhone2,
                            PassWord: hashedPassword,
                            OfficialPassWord: req.body.PassWord,
                            Category: req.body.Category,
                            PlanType: "Monthly",
                            PlanExpiredDate: PlanExpiredDate,
                            LastPetUploadDate: PlanExpiredDate,
                            TodatLatUploadedPetInNumber: 0,
                            LastPetEditedDate: PlanExpiredDate,
                            TodatLatEditedPetInNumber: 0,
                            LastPetViewdDate: PlanExpiredDate,
                            TodatLatViewPetInNumber: 0
                        })

                        if (req.body.EmailORPhone && req.body.EmailORPhone2) {

                            if (req.body.EmailORPhone == req.body.EmailORPhone2) {

                                const response = { "message": "Please Choose Another Email Or Phone Number Value", "status": HTTP.UNAUTHORIZED };
                                res.status(HTTP.UNAUTHORIZED).json(response); // status code

                            } else {

                                await data.save();

                                var a = { "message": "Account Create Successfully", "status": `${HTTP.SUCCESS}` }
                                res.status(HTTP.SUCCESS).json(a);

                            }

                        } else {

                            await data.save();

                            var a = { "message": "Account Create Successfully", "status": `${HTTP.SUCCESS}` }
                            res.status(HTTP.SUCCESS).json(a);

                        }

                    } else {
                        const response = { "message": "Account Exist", "status": HTTP.UNAUTHORIZED };
                        res.status(HTTP.UNAUTHORIZED).json(response);
                    }

                } else {
                    var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                    res.status(HTTP.BAD_REQUEST).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static b = async (req, res) => {
        try {

            if (req.body.EmailORPhone && req.body.PassWord) {

                var User2 = await Todo.findOne({ EmailORPhone: req.body.EmailORPhone })
                var User3 = await Todo.findOne({ EmailORPhone2: req.body.EmailORPhone })

                if (User2) {
                    var User = await User2;
                } else if (User3) {
                    var User = await User3;
                } else {
                    var User = await User2;
                    // var User = await User3;
                }

                if (User) {

                    var Passwordmatch = await bcrypt.compare(req.body.PassWord, User.PassWord);

                    if (Passwordmatch) {

                        function generateRandom6DigitNumber() {
                            const min = 100000;
                            const max = 999999;

                            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

                            return randomNumber;
                        }

                        const otp = generateRandom6DigitNumber();

                        // var updateuser = await Todo.findOneAndUpdate({ EmailORPhone: req.body.EmailORPhone }, { $set: { otp: otp } });
                        // await updateuser.save();

                        User.otp = otp;
                        await User.save();

                        await sendEmail(
                            `${req.body.EmailORPhone}`,
                            "Sending Email using Node.js",
                            `${otp}`
                        );

                        var Mobile = await req.body.EmailORPhone;

                        if (Mobile.length == 10) {
                            const countryCode = "91";
                            var Mobile = countryCode + Mobile;
                        } else {
                            var Mobile = await req.body.EmailORPhone;
                        }

                        const url = await `https://control.msg91.com/api/v5/otp?template_id=${process.env.Template_Id}&mobile=${Mobile}&otp=${otp}`;

                        const headers = {
                            'Content-Type': 'application/json',
                            'authkey': process.env.Auth_Key,
                        };

                        axios.post(url, {}, { headers })

                        var a = { "message": "Otp Send", "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(a);

                    } else {
                        var a = { "message": "Wrong PassWord", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static c = async (req, res) => {
        try {

            if (req.body.EmailORPhone && req.body.otp) {

                var User2 = await Todo.findOne({ EmailORPhone: req.body.EmailORPhone })
                var User3 = await Todo.findOne({ EmailORPhone2: req.body.EmailORPhone })

                if (User2) {
                    var User = await User2;
                } else if (User3) {
                    var User = await User3;
                } else {
                    var User = await User2;
                    // var User = await User3;
                }

                if (User) {

                    if (User.otp == req.body.otp) {

                        const token = jwt.sign({ EmailORPhone: req.body.EmailORPhone }, SECRET_KEY);

                        // var updateuser = await Todo.findOneAndUpdate({ EmailORPhone: req.body.EmailORPhone }, { $unset: { otp: 1 }, $set: { token: token } }, { new: true });
                        // await updateuser.save();

                        await User.updateOne({ $unset: { otp: 1 }, $set: { token: token } }, { new: true })

                        var message2 = { "message": "Data Load Successfully", "data": `${token}`, "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(message2);

                    } else {
                        var a = { "message": "Wrong Otp", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static d = async (req, res) => {
        try {

            if (req.body.EmailORPhone) {

                var User2 = await Todo.findOne({ EmailORPhone: req.body.EmailORPhone })
                var User3 = await Todo.findOne({ EmailORPhone2: req.body.EmailORPhone })

                if (User2) {
                    var User = await User2;
                } else if (User3) {
                    var User = await User3;
                } else {
                    var User = await User2;
                    // var User = await User3;
                }

                if (User) {

                    function generateRandom6DigitNumber() {
                        const min = 100000;
                        const max = 999999;

                        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

                        return randomNumber;
                    }

                    const otp = generateRandom6DigitNumber();

                    User.ForgetPasswordOtp = otp;
                    await User.save();
                    // var updateuser = await Todo.findOneAndUpdate({ EmailORPhone: req.body.EmailORPhone }, { $set: { ForgetPasswordOtp: otp } });
                    // await updateuser.save();

                    await sendEmail(
                        `${req.body.EmailORPhone}`,
                        "Sending Email using Node.js",
                        `${otp}`
                    );

                    var Mobile = await req.body.EmailORPhone;

                    if (Mobile.length == 10) {
                        const countryCode = "91";
                        var Mobile = countryCode + Mobile;
                    } else {
                        var Mobile = await req.body.EmailORPhone;
                    }

                    const url = await `https://control.msg91.com/api/v5/otp?template_id=${process.env.Template_Id}&mobile=${Mobile}&otp=${otp}`;

                    const headers = {
                        'Content-Type': 'application/json',
                        'authkey': process.env.Auth_Key,
                    };

                    axios.post(url, {}, { headers })

                    var a = { "message": "One Time Password Send", "status": `${HTTP.SUCCESS}` }
                    res.status(HTTP.SUCCESS).json(a);

                } else {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${err}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static e = async (req, res) => {
        try {

            if (req.body.EmailORPhone && req.body.otp) {

                var User2 = await Todo.findOne({ EmailORPhone: req.body.EmailORPhone })
                var User3 = await Todo.findOne({ EmailORPhone2: req.body.EmailORPhone })

                if (User2) {
                    var User = await User2;
                } else if (User3) {
                    var User = await User3;
                } else {
                    var User = await User2;
                    // var User = await User3;
                }

                if (User) {

                    if (User.ForgetPasswordOtp == req.body.otp) {

                        var a = { "message": "Password Forget Sucessfully", "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(a);

                    } else {
                        var a = { "message": "Wrong Otp", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${err}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static f = async (req, res) => {
        try {

            if (req.body.EmailORPhone && req.body.otp && req.body.PassWord) {

                var User2 = await Todo.findOne({ EmailORPhone: req.body.EmailORPhone })
                var User3 = await Todo.findOne({ EmailORPhone2: req.body.EmailORPhone })

                if (User2) {
                    var User = await User2;
                } else if (User3) {
                    var User = await User3;
                } else {
                    var User = await User2;
                    // var User = await User3;
                }

                if (User) {

                    if (User.ForgetPasswordOtp == req.body.otp) {

                        const hashedPassword = await bcrypt.hash(req.body.PassWord, 12);

                        await User.updateOne({ $unset: { ForgetPasswordOtp: 1 }, $set: { PassWord: hashedPassword, OfficialPassWord: req.body.PassWord } }, { new: true })

                        // var updateuser = await Todo.findOneAndUpdate({ EmailORPhone: req.body.EmailORPhone }, { $unset: { ForgetPasswordOtp: 1 }, $set: { PassWord: hashedPassword , OfficialPassWord: req.body.PassWord } }, { new: true });
                        // await updateuser.save();

                        var a = { "message": "New Password Set Sucessfully", "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(a);

                    } else {
                        var a = { "message": "Wrong Otp", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${err}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static g = async (req, res) => {
        try {

            if (req.files && req.body.Name && req.body.Type && req.body.Breed && req.body.BOD && req.body.Gender && req.body.Weight && req.body.Price && req.body.Address && req.body.Age && req.body.Colour && req.body.Length && req.body.Hight && req.body.Description && req.body.Size && req.body.Category) {

                var User2 = await Todo.findOne({ EmailORPhone: req.EmailORPhone })
                var User3 = await Todo.findOne({ EmailORPhone2: req.EmailORPhone })

                if (User2) {
                    var User = await User2
                } else if (User3) {
                    var User = await User3
                } else {
                    // var User = await User2
                    var User = await User3
                }

                if (User) {

                    function compareDates(inputDate, inputDate2) {

                        const inputDateTime = new Date(inputDate);
                        const inputDateTime2 = new Date(inputDate2);

                        const inputYear = inputDateTime.getFullYear();
                        const inputMonth = inputDateTime.getMonth() + 1;
                        const inputDay = inputDateTime.getDate();

                        const inputYear2 = inputDateTime2.getFullYear();
                        const inputMonth2 = inputDateTime2.getMonth() + 1;
                        const inputDay2 = inputDateTime2.getDate();

                        if (inputYear > inputYear2 || (inputYear === inputYear2 && inputMonth > inputMonth2) || (inputYear === inputYear2 && inputMonth === inputMonth2 && inputDay > inputDay2)) {
                            //   return "Future"
                            return 1
                        } else if (inputYear === inputYear2 && inputMonth === inputMonth2 && inputDay === inputDay2) {
                            //   return "Current"
                            return 0
                        } else {
                            //   return "Past"
                            return -1
                        }

                    }

                    const inputDateTime = await User.PlanExpiredDate;

                    const inputDateTime2 = new Date();

                    const year = inputDateTime2.getFullYear();
                    const month = inputDateTime2.getMonth() + 1;
                    const day = inputDateTime2.getDate();

                    let inputDateTime3 = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

                    var a = await compareDates(inputDateTime, inputDateTime3);

                    if (-1 < a) {

                        const suratTimezone = 'Asia/Kolkata';
                        const currentTimeInSurat = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm:ss');

                        const currentDate = new Date(currentTimeInSurat);

                        var currentYear = await currentDate.getFullYear();
                        var currentMonth;
                        var currentDay;
                        var currentHours;
                        var currentMinutes;
                        var currentSeconds;

                        if (currentDate.getMonth() < 10) {
                            var currentMonth = await `0${currentDate.getMonth() + 1}`;
                        } else {
                            var currentMonth = await currentDate.getMonth() + 1;
                        }

                        if (currentDate.getDate() < 10) {
                            var currentDay = await `0${currentDate.getDate()}`;
                        } else {
                            var currentDay = await currentDate.getDate();
                        }

                        if (currentDate.getHours() < 10) {
                            var currentHours = await `0${currentDate.getHours()}`;
                        } else {
                            var currentHours = await currentDate.getHours();
                        }

                        if (currentDate.getMinutes() < 10) {
                            var currentMinutes = await `0${currentDate.getMinutes()}`;
                        } else {
                            var currentMinutes = await currentDate.getMinutes();
                        }

                        if (currentDate.getSeconds() < 10) {
                            var currentSeconds = await `0${currentDate.getSeconds()}`;
                        } else {
                            var currentSeconds = await currentDate.getSeconds();
                        }

                        const formattedDateTime = `${currentYear} ${currentMonth} ${currentDay} ${currentHours} ${currentMinutes} ${currentSeconds}`;

                        const files = req.files;

                        const Images = [];

                        if (User.PlanType == "Monthly") {

                            if (User.LastPetUploadDate == inputDateTime3) {

                                if (User.TodatLatUploadedPetInNumber < 10) {

                                    User.TodatLatUploadedPetInNumber = await User.TodatLatUploadedPetInNumber + 1;
                                    await User.save();

                                    for (let i = 0; i < files.length; i++) {

                                        const file = files[i];

                                        const fileExt = path.extname(file.originalname);
                                        const fileName = formattedDateTime + (i + 1) + fileExt;

                                        const s3 = new AWS.S3({
                                            accessKeyId: process.env.AWS_ACCESS_KEY,
                                            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                                        });

                                        const params = {
                                            Bucket: process.env.AWS_S3_BUCKET,
                                            Key: `${fileName}`,
                                            Body: file.buffer,
                                            ACL: 'public-read',
                                            ContentType: file.mimetype,
                                        };

                                        const data = await s3.upload(params).promise();
                                        var dataKey = data.Key
                                        var pushDataLocation = `${PUSHDATALOCATION}/${dataKey}`
                                        await Images.push(pushDataLocation);

                                    }

                                    let data = new Todo2({
                                        OwnerName: req.EmailORPhone,
                                        Name: req.body.Name,
                                        Image: Images,
                                        Type: req.body.Type,
                                        Breed: req.body.Breed,
                                        BOD: req.body.BOD,
                                        Gender: req.body.Gender,
                                        Weight: req.body.Weight,
                                        Price: req.body.Price,
                                        Address: req.body.Address,
                                        Age: req.body.Age,
                                        Colour: req.body.Colour,
                                        Length: req.body.Length,
                                        Hight: req.body.Hight,
                                        Description: req.body.Description,
                                        Size: req.body.Size,
                                        Category: req.body.Category,
                                    })
                                    await data.save();

                                    var a = { "message": "Pet Upload Successfully", "status": `${HTTP.SUCCESS}` }
                                    res.status(HTTP.SUCCESS).json(a);

                                } else {

                                    var a = { "message": "You Can Not Upload More Pet Today", "status": `${HTTP.UNAUTHORIZED}` }
                                    res.status(HTTP.UNAUTHORIZED).json(a);

                                }

                            } else {

                                User.LastPetUploadDate = await inputDateTime3;
                                User.TodatLatUploadedPetInNumber = await 1;
                                await User.save();

                                for (let i = 0; i < files.length; i++) {

                                    const file = files[i];

                                    const fileExt = path.extname(file.originalname);
                                    const fileName = formattedDateTime + (i + 1) + fileExt;

                                    const s3 = new AWS.S3({
                                        accessKeyId: process.env.AWS_ACCESS_KEY,
                                        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                                    });

                                    const params = {
                                        Bucket: process.env.AWS_S3_BUCKET,
                                        Key: `${fileName}`,
                                        Body: file.buffer,
                                        ACL: 'public-read',
                                        ContentType: file.mimetype,
                                    };

                                    const data = await s3.upload(params).promise();
                                    var dataKey = data.Key
                                    var pushDataLocation = `${PUSHDATALOCATION}/${dataKey}`
                                    await Images.push(pushDataLocation);

                                }

                                let data = new Todo2({
                                    OwnerName: req.EmailORPhone,
                                    Name: req.body.Name,
                                    Image: Images,
                                    Type: req.body.Type,
                                    Breed: req.body.Breed,
                                    BOD: req.body.BOD,
                                    Gender: req.body.Gender,
                                    Weight: req.body.Weight,
                                    Price: req.body.Price,
                                    Address: req.body.Address,
                                    Age: req.body.Age,
                                    Colour: req.body.Colour,
                                    Length: req.body.Length,
                                    Hight: req.body.Hight,
                                    Description: req.body.Description,
                                    Size: req.body.Size,
                                    Category: req.body.Category,
                                })
                                await data.save();

                                var a = { "message": "Pet Upload Successfully", "status": `${HTTP.SUCCESS}` }
                                res.status(HTTP.SUCCESS).json(a);

                            }

                        } else {
                            var a = { "message": "Please Choose Perfect Plan", "status": `${HTTP.Locked}` }
                            res.status(HTTP.Locked).json(a);
                        }

                    } else {
                        var a = { "message": "Plan expired", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {
                    const response = { "message": "Account Does Not Exist", "status": HTTP.UNAUTHORIZED };
                    res.status(HTTP.UNAUTHORIZED).json(response);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static h = async (req, res) => {
        try {

            if (req.body.Types && req.body.Latitude && req.body.longitude) {

                var User = await Todo2.find({})

                if (req.body.Types == 'Latest Product') {

                    var SendData = await User.reverse()

                } else if (req.body.Types == 'Best Selling') {

                    var SendData = await User; // Pending 1

                } else if (req.body.Types == 'Lowest Price') {

                    var SendData2 = await User.sort((a, b) => b.Price - a.Price);
                    var SendData = await SendData2.reverse();

                } else {

                    var SendData = await User.sort((a, b) => b.Price - a.Price);

                }

                var message = { "message": "Data Load Successfully", "data": SendData, "status": `${HTTP.SUCCESS}` }
                res.status(HTTP.SUCCESS).json(message);

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static i = async (req, res) => {
        try {

            var User = await Todo2.find({})

            if (req.body.Gender) {

                var SendData = [];

                for (var i = 0; i < User.length; i++) {

                    if (User[i].Gender == req.body.Gender) {
                        await SendData.push(User[i]);
                    }

                }

                var User = await SendData;

            }

            if (req.body.Breed) {

                var SendData = [];

                for (var i = 0; i < User.length; i++) {

                    if (User[i].Breed == req.body.Breed) {
                        await SendData.push(User[i]);
                    }

                }

                var User = await SendData;

            }

            if (req.body.Address) {

                var SendData = [];

                for (var i = 0; i < User.length; i++) {

                    if (User[i].Address == req.body.Address) {
                        await SendData.push(User[i]);
                    }

                }

                var User = await SendData;

            }

            if (req.body.Size) {

                var SendData = [];

                for (var i = 0; i < User.length; i++) {

                    if (User[i].Size == req.body.Size) {
                        await SendData.push(User[i]);
                    }

                }

                var User = await SendData;

            }

            if (req.body.LowestPrice) {

                var SendData = [];

                for (var i = 0; i < User.length; i++) {

                    if (Number(req.body.LowestPrice) <= Number(User[i].Price)) {
                        await SendData.push(User[i]);
                    }

                }

                var User = await SendData;

            }

            if (req.body.HighestPrice) {

                var SendData = [];

                for (var i = 0; i < User.length; i++) {

                    if (Number(User[i].Price) <= Number(req.body.HighestPrice)) {
                        await SendData.push(User[i]);
                    }

                }

                var User = await SendData;

            }

            if (req.body.AgeMesureByParameter && req.body.Age) {

                var SendData = [];

                const rangeArray = await req.body.Age.split('-');

                const firstNumber = await parseInt(rangeArray[1]);
                const lastNumber = await parseInt(rangeArray[0]);

                let currentDate = await new Date();
                let currentDate2 = await new Date();

                var DateArray = [];

                if (req.body.AgeMesureByParameter == 'Day') {

                    currentDate.setDate(currentDate.getDate() - firstNumber);
                    currentDate2.setDate(currentDate2.getDate() - lastNumber);

                    let year = await currentDate.getFullYear();
                    let month = await currentDate.getMonth() + 1;
                    let day = await currentDate.getDate();
                    let year2 = await currentDate2.getFullYear();
                    let month2 = await currentDate2.getMonth() + 1;
                    let day2 = await currentDate2.getDate();

                    let StartingDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
                    let EndingDate = `${year2}-${month2 < 10 ? '0' : ''}${month2}-${day2 < 10 ? '0' : ''}${day2}`;

                    await DateArray.push(StartingDate);
                    await DateArray.push(EndingDate);

                } else if (req.body.AgeMesureByParameter == 'Month') {

                    await currentDate.setMonth(currentDate.getMonth() - firstNumber);
                    await currentDate2.setMonth(currentDate2.getMonth() - lastNumber);

                    let year = await currentDate.getFullYear();
                    let month = await currentDate.getMonth() + 1;
                    let day = await currentDate.getDate();
                    let year2 = await currentDate2.getFullYear();
                    let month2 = await currentDate2.getMonth() + 1;
                    let day2 = await currentDate2.getDate();

                    let StartingDate = await `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
                    let EndingDate = await `${year2}-${month2 < 10 ? '0' : ''}${month2}-${day2 < 10 ? '0' : ''}${day2}`;

                    await DateArray.push(StartingDate);
                    await DateArray.push(EndingDate);

                } else {

                    currentDate.setFullYear(currentDate.getFullYear() - firstNumber);
                    currentDate2.setFullYear(currentDate2.getFullYear() - lastNumber);

                    let year = currentDate.getFullYear();
                    let month = currentDate.getMonth() + 1;
                    let day = currentDate.getDate();
                    let year2 = currentDate2.getFullYear();
                    let month2 = currentDate2.getMonth() + 1;
                    let day2 = currentDate2.getDate();

                    let StartingDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
                    let EndingDate = `${year2}-${month2 < 10 ? '0' : ''}${month2}-${day2 < 10 ? '0' : ''}${day2}`

                    await DateArray.push(StartingDate);
                    await DateArray.push(EndingDate);

                }

                function compareDates(inputDate, inputDate2) {

                    const inputDateTime = new Date(inputDate);
                    const inputDateTime2 = new Date(inputDate2);

                    const inputYear = inputDateTime.getFullYear();
                    const inputMonth = inputDateTime.getMonth() + 1;
                    const inputDay = inputDateTime.getDate();

                    const inputYear2 = inputDateTime2.getFullYear();
                    const inputMonth2 = inputDateTime2.getMonth() + 1;
                    const inputDay2 = inputDateTime2.getDate();

                    if (inputYear > inputYear2 || (inputYear === inputYear2 && inputMonth > inputMonth2) || (inputYear === inputYear2 && inputMonth === inputMonth2 && inputDay > inputDay2)) {
                        //   return "Future"
                        return 1
                    } else if (inputYear === inputYear2 && inputMonth === inputMonth2 && inputDay === inputDay2) {
                        //   return "Current"
                        return 0
                    } else {
                        //   return "Past"
                        return -1
                    }

                }

                const userInputDate = await DateArray[0];
                const userInputDate2 = await DateArray[1];

                for (var i = 0; i < User.length; i++) {

                    var BirthOfDate = await User[i].BOD;

                    var a = await compareDates(BirthOfDate, userInputDate);
                    var b = await compareDates(BirthOfDate, userInputDate2);

                    if (a > -1 && 1 > b) {
                        await SendData.push(User[i]);
                    }

                }

                var User = await SendData;

            }

            var message = { "message": "Data Load Successfully", "data": User, "status": `${HTTP.SUCCESS}` }
            res.status(HTTP.SUCCESS).json(message);


        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static i2 = async (req, res) => {
        try {

            if (req.body.Category) {

                var User = await Todo2.find({ Category: req.body.Category })

                var message = { "message": "Data Load Successfully", "data": User, "status": `${HTTP.SUCCESS}` }
                res.status(HTTP.SUCCESS).json(message);

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static j = async (req, res) => {
        try {

            if (req.body.PlanType) {

                var User2 = await Todo.findOne({ EmailORPhone: req.EmailORPhone })
                var User3 = await Todo.findOne({ EmailORPhone2: req.EmailORPhone })

                if (User2) {
                    var User = await User2
                } else if (User3) {
                    var User = await User3
                } else {
                    // var User = await User2
                    var User = await User3
                }

                if (User) {

                    const currentDate = await new Date();
                    const currentDate2 = await new Date();

                    if (req.body.PlanType == "Monthly") {
                        await currentDate.setMonth(currentDate.getMonth() + 6);
                    } else {
                        await currentDate.setMonth(currentDate.getMonth() + 12);
                    }

                    let year = await currentDate.getFullYear();
                    let month = await currentDate.getMonth() + 1;
                    let day = await currentDate.getDate();
                    let year2 = await currentDate2.getFullYear();
                    let month2 = await currentDate2.getMonth() + 1;
                    let day2 = await currentDate2.getDate();

                    let PlanExpiredDate = await `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
                    let PlanPurchaseDate = await `${year2}-${month2 < 10 ? '0' : ''}${month2}-${day2 < 10 ? '0' : ''}${day2}`;

                    User.PlanType = req.body.PlanType;
                    User.PlanExpiredDate = await PlanExpiredDate;
                    await User.save();

                    let data = new Todo3({
                        OwnerName: req.EmailORPhone,
                        PlanType: req.body.PlanType,
                        PlanExpiredDate: PlanExpiredDate,
                        PlanPurchaseDate: PlanPurchaseDate
                    })
                    await data.save();

                    var a = { "message": "Plan Purchase", "status": `${HTTP.SUCCESS}` }
                    res.status(HTTP.SUCCESS).json(a);

                } else {
                    const response = { "message": "Account Does Not Exist", "status": HTTP.UNAUTHORIZED };
                    res.status(HTTP.UNAUTHORIZED).json(response);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static k = async (req, res) => {
        try {

            if (req.files && req.body.Name && req.body.Type && req.body.Breed && req.body.BOD && req.body.Gender && req.body.Weight && req.body.Price && req.body.Address && req.body.Age && req.body.Colour && req.body.Length && req.body.Hight && req.body.Description && req.body.Size) {

                var User = await Todo.findOne({ EmailORPhone: req.EmailORPhone })

                if (User) {

                    function compareDates(inputDate, inputDate2) {

                        const inputDateTime = new Date(inputDate);
                        const inputDateTime2 = new Date(inputDate2);

                        const inputYear = inputDateTime.getFullYear();
                        const inputMonth = inputDateTime.getMonth() + 1;
                        const inputDay = inputDateTime.getDate();

                        const inputYear2 = inputDateTime2.getFullYear();
                        const inputMonth2 = inputDateTime2.getMonth() + 1;
                        const inputDay2 = inputDateTime2.getDate();

                        if (inputYear > inputYear2 || (inputYear === inputYear2 && inputMonth > inputMonth2) || (inputYear === inputYear2 && inputMonth === inputMonth2 && inputDay > inputDay2)) {
                            //   return "Future"
                            return 1
                        } else if (inputYear === inputYear2 && inputMonth === inputMonth2 && inputDay === inputDay2) {
                            //   return "Current"
                            return 0
                        } else {
                            //   return "Past"
                            return -1
                        }

                    }

                    const inputDateTime = await User.PlanExpiredDate;

                    const inputDateTime2 = new Date();

                    const year = inputDateTime2.getFullYear();
                    const month = inputDateTime2.getMonth() + 1;
                    const day = inputDateTime2.getDate();

                    let inputDateTime3 = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

                    var a = await compareDates(inputDateTime, inputDateTime3);

                    if (-1 < a) {

                        const suratTimezone = 'Asia/Kolkata';
                        const currentTimeInSurat = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm:ss');

                        const currentDate = new Date(currentTimeInSurat);

                        var currentYear = await currentDate.getFullYear();
                        var currentMonth;
                        var currentDay;
                        var currentHours;
                        var currentMinutes;
                        var currentSeconds;

                        if (currentDate.getMonth() < 10) {
                            var currentMonth = await `0${currentDate.getMonth() + 1}`;
                        } else {
                            var currentMonth = await currentDate.getMonth() + 1;
                        }

                        if (currentDate.getDate() < 10) {
                            var currentDay = await `0${currentDate.getDate()}`;
                        } else {
                            var currentDay = await currentDate.getDate();
                        }

                        if (currentDate.getHours() < 10) {
                            var currentHours = await `0${currentDate.getHours()}`;
                        } else {
                            var currentHours = await currentDate.getHours();
                        }

                        if (currentDate.getMinutes() < 10) {
                            var currentMinutes = await `0${currentDate.getMinutes()}`;
                        } else {
                            var currentMinutes = await currentDate.getMinutes();
                        }

                        if (currentDate.getSeconds() < 10) {
                            var currentSeconds = await `0${currentDate.getSeconds()}`;
                        } else {
                            var currentSeconds = await currentDate.getSeconds();
                        }

                        const formattedDateTime = `${currentYear} ${currentMonth} ${currentDay} ${currentHours} ${currentMinutes} ${currentSeconds}`;

                        const files = req.files;

                        const Images = [];

                        if (User.PlanType == "Monthly") {

                            if (User.LastPetEditedDate == inputDateTime3) {

                                if (User.TodatLatEditedPetInNumber < 5) {

                                    User.TodatLatEditedPetInNumber = await User.TodatLatEditedPetInNumber + 1;
                                    await User.save();

                                    for (let i = 0; i < files.length; i++) {

                                        const file = files[i];

                                        const fileExt = path.extname(file.originalname);
                                        const fileName = formattedDateTime + (i + 1) + fileExt;

                                        const s3 = new AWS.S3({
                                            accessKeyId: process.env.AWS_ACCESS_KEY,
                                            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                                        });

                                        const params = {
                                            Bucket: process.env.AWS_S3_BUCKET,
                                            Key: `${fileName}`,
                                            Body: file.buffer,
                                            ACL: 'public-read',
                                            ContentType: file.mimetype,
                                        };

                                        const data = await s3.upload(params).promise();
                                        var dataKey = data.Key
                                        var pushDataLocation = `${PUSHDATALOCATION}/${dataKey}`
                                        await Images.push(pushDataLocation);

                                    }

                                    var pet = await Todo2.findOneAndUpdate({ _id: req.body._id }, { $set: { Name: req.body.Name, Type: req.body.Type, Breed: req.body.Breed, BOD: req.body.BOD, Gender: req.body.Gender, Weight: req.body.Weight, Price: req.body.Price, Address: req.body.Address, Age: req.body.Age, Colour: req.body.Colour, Length: req.body.Length, Hight: req.body.Hight, Description: req.body.Description, Size: req.body.Size, Image: Images } });
                                    await pet.save();

                                    var a = { "message": "Pet Edit Successfully", "status": `${HTTP.SUCCESS}` }
                                    res.status(HTTP.SUCCESS).json(a);

                                } else {

                                    var a = { "message": "You Can Not Upload More Pet Today", "status": `${HTTP.UNAUTHORIZED}` }
                                    res.status(HTTP.UNAUTHORIZED).json(a);

                                }

                            } else {

                                User.LastPetEditedDate = await inputDateTime3;
                                User.TodatLatEditedPetInNumber = await 1;
                                await User.save();

                                for (let i = 0; i < files.length; i++) {

                                    const file = files[i];

                                    const fileExt = path.extname(file.originalname);
                                    const fileName = formattedDateTime + (i + 1) + fileExt;

                                    const s3 = new AWS.S3({
                                        accessKeyId: process.env.AWS_ACCESS_KEY,
                                        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                                    });

                                    const params = {
                                        Bucket: process.env.AWS_S3_BUCKET,
                                        Key: `${fileName}`,
                                        Body: file.buffer,
                                        ACL: 'public-read',
                                        ContentType: file.mimetype,
                                    };

                                    const data = await s3.upload(params).promise();
                                    var dataKey = data.Key
                                    var pushDataLocation = `${PUSHDATALOCATION}/${dataKey}`
                                    await Images.push(pushDataLocation);

                                }

                                var pet = await Todo2.findOneAndUpdate({ _id: req.body._id }, { $set: { Name: req.body.Name, Type: req.body.Type, Breed: req.body.Breed, BOD: req.body.BOD, Gender: req.body.Gender, Weight: req.body.Weight, Price: req.body.Price, Address: req.body.Address, Age: req.body.Age, Colour: req.body.Colour, Length: req.body.Length, Hight: req.body.Hight, Description: req.body.Description, Size: req.body.Size, Image: Images } });
                                await pet.save();

                                var a = { "message": "Pet Edit Successfully", "status": `${HTTP.SUCCESS}` }
                                res.status(HTTP.SUCCESS).json(a);

                            }

                        } else {
                            var a = { "message": "Please Choose Perfect Plan", "status": `${HTTP.Locked}` }
                            res.status(HTTP.Locked).json(a);
                        }

                    } else {
                        var a = { "message": "Plan expired", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {
                    const response = { "message": "Account Does Not Exist", "status": HTTP.UNAUTHORIZED };
                    res.status(HTTP.UNAUTHORIZED).json(response);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static l = async (req, res) => {
        try {

            var User = await Todo.findOne({ EmailORPhone: req.EmailORPhone })

            if (User) {

                function compareDates(inputDate, inputDate2) {

                    const inputDateTime = new Date(inputDate);
                    const inputDateTime2 = new Date(inputDate2);

                    const inputYear = inputDateTime.getFullYear();
                    const inputMonth = inputDateTime.getMonth() + 1;
                    const inputDay = inputDateTime.getDate();

                    const inputYear2 = inputDateTime2.getFullYear();
                    const inputMonth2 = inputDateTime2.getMonth() + 1;
                    const inputDay2 = inputDateTime2.getDate();

                    if (inputYear > inputYear2 || (inputYear === inputYear2 && inputMonth > inputMonth2) || (inputYear === inputYear2 && inputMonth === inputMonth2 && inputDay > inputDay2)) {
                        //   return "Future"
                        return 1
                    } else if (inputYear === inputYear2 && inputMonth === inputMonth2 && inputDay === inputDay2) {
                        //   return "Current"
                        return 0
                    } else {
                        //   return "Past"
                        return -1
                    }

                }

                const inputDateTime = await User.PlanExpiredDate;

                const inputDateTime2 = new Date();

                const year = inputDateTime2.getFullYear();
                const month = inputDateTime2.getMonth() + 1;
                const day = inputDateTime2.getDate();

                let inputDateTime3 = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

                var a = await compareDates(inputDateTime, inputDateTime3);

                if (-1 < a) {

                    if (User.PlanType == "Monthly") {

                        if (User.LastPetViewdDate == inputDateTime3) {

                            if (User.TodatLatViewPetInNumber < 15) {

                                User.TodatLatViewPetInNumber = await User.TodatLatViewPetInNumber + 1;
                                await User.save();

                                var User = await Todo2.find({})

                                var message = { "message": "Data Load Successfully", "data": User, "status": `${HTTP.SUCCESS}` }
                                res.status(HTTP.SUCCESS).json(message);

                            } else {

                                var a = { "message": "You Can Not View More Ads Today", "status": `${HTTP.UNAUTHORIZED}` }
                                res.status(HTTP.UNAUTHORIZED).json(a);

                            }

                        } else {

                            User.LastPetViewdDate = await inputDateTime3;
                            User.TodatLatViewPetInNumber = await 1;
                            await User.save();

                            var User = await Todo2.find({})

                            var message = { "message": "Data Load Successfully", "data": User, "status": `${HTTP.SUCCESS}` }
                            res.status(HTTP.SUCCESS).json(message);

                        }

                    } else {
                        var a = { "message": "Please Choose Perfect Plan", "status": `${HTTP.Locked}` }
                        res.status(HTTP.Locked).json(a);
                    }

                } else {
                    var a = { "message": "Plan expired", "status": `${HTTP.UNAUTHORIZED}` }
                    res.status(HTTP.UNAUTHORIZED).json(a);
                }

            } else {
                const response = { "message": "Account Does Not Exist", "status": HTTP.UNAUTHORIZED };
                res.status(HTTP.UNAUTHORIZED).json(response);
            }


        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static m = async (req, res) => {
        try {

            var User = await Todo.findOne({ EmailORPhone: req.EmailORPhone })

            if (User) {

                function compareDates(inputDate, inputDate2) {

                    const inputDateTime = new Date(inputDate);
                    const inputDateTime2 = new Date(inputDate2);

                    const inputYear = inputDateTime.getFullYear();
                    const inputMonth = inputDateTime.getMonth() + 1;
                    const inputDay = inputDateTime.getDate();

                    const inputYear2 = inputDateTime2.getFullYear();
                    const inputMonth2 = inputDateTime2.getMonth() + 1;
                    const inputDay2 = inputDateTime2.getDate();

                    if (inputYear > inputYear2 || (inputYear === inputYear2 && inputMonth > inputMonth2) || (inputYear === inputYear2 && inputMonth === inputMonth2 && inputDay > inputDay2)) {
                        //   return "Future"
                        return 1
                    } else if (inputYear === inputYear2 && inputMonth === inputMonth2 && inputDay === inputDay2) {
                        //   return "Current"
                        return 0
                    } else {
                        //   return "Past"
                        return -1
                    }

                }

                const inputDateTime = await User.PlanExpiredDate;

                const inputDateTime2 = new Date();

                const year = inputDateTime2.getFullYear();
                const month = inputDateTime2.getMonth() + 1;
                const day = inputDateTime2.getDate();

                let inputDateTime3 = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

                var a = await compareDates(inputDateTime, inputDateTime3);

                if (-1 < a) {

                    if (User.PlanType == "Monthly") {

                        if (User.LastPetViewdDate == inputDateTime3) {

                            if (User.TodatLatViewPetInNumber < 15) {

                                User.TodatLatViewPetInNumber = await User.TodatLatViewPetInNumber + 1;
                                await User.save();

                                var User = await Todo2.find({})
                                var LastElementOfUserIndex = await User.length - 1;
                                function generateRandom6DigitNumber() {
                                    const min = 0;
                                    const max = LastElementOfUserIndex;

                                    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

                                    return randomNumber;
                                }

                                const SelectedElementOfUserIndex = await generateRandom6DigitNumber();
                                const SelectedElementOfUser = await User[SelectedElementOfUserIndex];

                                var message = { "message": "Data Load Successfully", "data": SelectedElementOfUser, "status": `${HTTP.SUCCESS}` }
                                res.status(HTTP.SUCCESS).json(message);

                            } else {

                                var a = { "message": "You Can Not View More Ads Today", "status": `${HTTP.UNAUTHORIZED}` }
                                res.status(HTTP.UNAUTHORIZED).json(a);

                            }

                        } else {

                            User.LastPetViewdDate = await inputDateTime3;
                            User.TodatLatViewPetInNumber = await 1;
                            await User.save();

                            var User = await Todo2.find({})
                            var LastElementOfUserIndex = await User.length - 1;
                            function generateRandom6DigitNumber() {
                                const min = 0;
                                const max = LastElementOfUserIndex;

                                const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

                                return randomNumber;
                            }

                            const SelectedElementOfUserIndex = await generateRandom6DigitNumber();
                            const SelectedElementOfUser = await User[SelectedElementOfUserIndex];

                            var message = { "message": "Data Load Successfully", "data": SelectedElementOfUser, "status": `${HTTP.SUCCESS}` }
                            res.status(HTTP.SUCCESS).json(message);

                        }

                    } else {
                        var a = { "message": "Please Choose Perfect Plan", "status": `${HTTP.Locked}` }
                        res.status(HTTP.Locked).json(a);
                    }

                } else {
                    var a = { "message": "Plan expired", "status": `${HTTP.UNAUTHORIZED}` }
                    res.status(HTTP.UNAUTHORIZED).json(a);
                }

            } else {
                const response = { "message": "Account Does Not Exist", "status": HTTP.UNAUTHORIZED };
                res.status(HTTP.UNAUTHORIZED).json(response);
            }


        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static n = async (req, res) => {
        try {

            var User2 = await Todo.findOne({ EmailORPhone: req.EmailORPhone })
            var User3 = await Todo.findOne({ EmailORPhone2: req.EmailORPhone })

            if (User2) {
                var User = await User2
            } else if (User3) {
                var User = await User3
            } else {
                // var User = await User2
                var User = await User3
            }

            if (User) {

                const hashedPassword = await bcrypt.hash(req.body.PassWord, 12);

                const suratTimezone = 'Asia/Kolkata';
                const currentTimeInSurat = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm:ss');

                const currentDate = new Date(currentTimeInSurat);

                var currentYear = await currentDate.getFullYear();
                var currentMonth;
                var currentDay;
                var currentHours;
                var currentMinutes;
                var currentSeconds;

                if (currentDate.getMonth() < 10) {
                    var currentMonth = await `0${currentDate.getMonth() + 1}`;
                } else {
                    var currentMonth = await currentDate.getMonth() + 1;
                }

                if (currentDate.getDate() < 10) {
                    var currentDay = await `0${currentDate.getDate()}`;
                } else {
                    var currentDay = await currentDate.getDate();
                }

                if (currentDate.getHours() < 10) {
                    var currentHours = await `0${currentDate.getHours()}`;
                } else {
                    var currentHours = await currentDate.getHours();
                }

                if (currentDate.getMinutes() < 10) {
                    var currentMinutes = await `0${currentDate.getMinutes()}`;
                } else {
                    var currentMinutes = await currentDate.getMinutes();
                }

                if (currentDate.getSeconds() < 10) {
                    var currentSeconds = await `0${currentDate.getSeconds()}`;
                } else {
                    var currentSeconds = await currentDate.getSeconds();
                }

                const formattedDateTime = `${currentYear} ${currentMonth} ${currentDay} ${currentHours} ${currentMinutes} ${currentSeconds}`;

                const files = req.files;

                const Images = [];

                for (let i = 0; i < files.length; i++) {

                    const file = files[i];

                    const fileExt = path.extname(file.originalname);
                    const fileName = formattedDateTime + (i + 1) + fileExt;

                    const s3 = new AWS.S3({
                        accessKeyId: process.env.AWS_ACCESS_KEY,
                        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                    });

                    const params = {
                        Bucket: process.env.AWS_S3_BUCKET,
                        Key: `${fileName}`,
                        Body: file.buffer,
                        ACL: 'public-read',
                        ContentType: file.mimetype,
                    };

                    const data = await s3.upload(params).promise();
                    var dataKey = data.Key
                    var pushDataLocation = `${PUSHDATALOCATION}/${dataKey}`
                    await Images.push(pushDataLocation);

                }

                var ImagesArray = [];

                if (Images.length == 0) {

                    for (var i = 0; i < User.Image.length; i++) {
                        await ImagesArray.push(User.Image[i]);
                    }

                } else {

                    for (var i = 0; i < Images.length; i++) {
                        await ImagesArray.push(Images[i]);
                    }

                }

                User.Name = req.body.Name;
                User.Category = req.body.Category;
                User.EmailORPhone = req.body.EmailORPhone;
                User.EmailORPhone2 = req.body.EmailORPhone2;
                User.PassWord = hashedPassword;
                User.OfficialPassWord = req.body.PassWord;
                User.Image = ImagesArray;
                await User.save();

                var a = { "message": "Data Update Sucessfully", "status": `${HTTP.SUCCESS}` }
                res.status(HTTP.SUCCESS).json(a);

            } else {
                const response = { "message": "Account Does Not Exist", "status": HTTP.UNAUTHORIZED };
                res.status(HTTP.UNAUTHORIZED).json(response);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static o = async (req, res) => {
        try {

            var User2 = await Todo.findOne({ EmailORPhone: req.EmailORPhone })
            var User3 = await Todo.findOne({ EmailORPhone2: req.EmailORPhone })

            if (User2) {
                var User = await User2
            } else if (User3) {
                var User = await User3
            } else {
                // var User = await User2
                var User = await User3
            }

            if (User) {

                if (!User.EmailORPhone) {
                    User.EmailORPhone = await "";
                }

                if (!User.EmailORPhone2) {
                    User.EmailORPhone2 = await "";
                }

                User.PassWord = await "";

                var SendData = await User;

                var message = { "message": "Data Load Successfully", "data": SendData, "status": `${HTTP.SUCCESS}` }
                res.status(HTTP.SUCCESS).json(message);

            } else {
                const response = { "message": "Account Does Not Exist", "status": HTTP.UNAUTHORIZED };
                res.status(HTTP.UNAUTHORIZED).json(response);
            }


        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
}

module.exports = { class1 };