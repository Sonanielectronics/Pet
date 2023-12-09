var mongoose = require("mongoose");

var AccountSchema = new mongoose.Schema({
    Image: {
        type: Array
    },
    Name: {
        type: String
    },
    EmailORPhone: {
        trim: true,
        type: String,
    },
    EmailORPhone2: {
        trim: true,
        type: String,
    },
    PassWord: {
        // trim: true,
        type: String,
        required: true,
    },
    OfficialPassWord: {
        // trim: true,
        type: String,
        required: true,
    },
    Category: {
        type: String
    },
    otp: {
        type: String
    },
    token: {
        type: String
    },
    ForgetPasswordOtp: {
        type: String
    },
    PlanType: {
        type: String
    },
    PlanExpiredDate: {
        type: String
    },
    LastPetUploadDate: {
        type: String
    },
    TodatLatUploadedPetInNumber: {
        type: Number
    },
    LastPetEditedDate: {
        type: String
    },
    TodatLatEditedPetInNumber: {
        type: Number
    },
    LastPetViewdDate: {
        type: String
    },
    TodatLatViewPetInNumber: {
        type: Number
    }
});

var Todo = mongoose.model("AccountCollection", AccountSchema);

var PetSchema = new mongoose.Schema({
    OwnerName: {
        type: String
    },
    Name: {
        type: String
    },
    Image: {
        type: Array
    },
    Type: {
        type: String
    },
    Breed: {
        type: String
    },
    BOD: {
        type: String
    },
    Gender: {
        type: String
    },
    Weight: {
        type: String
    },
    Price: {
        type: String
    },
    Address: {
        type: String
    },
    Age: {
        type: String
    },
    Colour: {
        type: String
    },
    Length: {
        type: String
    },
    Hight: {
        type: String
    },
    Description: {
        type: String
    },
    Size: {
        type: String
    },
    Category: {
        type: String
    },
    
});

var Todo2 = mongoose.model("PetCollection", PetSchema);

var NotificationSchema = new mongoose.Schema({
    OwnerName: {
        type: String
    },
    PlanType: {
        type: String
    },
    PlanExpiredDate: {
        type: String
    },
    PlanPurchaseDate: {
        type: String
    }
});

var Todo3 = mongoose.model("NotificationCollection", NotificationSchema);

module.exports = { Todo , Todo2 , Todo3 };
