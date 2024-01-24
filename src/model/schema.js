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
    },
    Favourite: {
        type: Array
    },
    Address: {
        type: String
    },
    Coin: {
        type: String
    },
    Connect: {
        type: Array
    }
});

var Todo = mongoose.model("AccountCollection", AccountSchema);

var PetSchema = new mongoose.Schema({
    OwnerNameId: {
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
    OwnerNameId: {
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
    },
    Status: {
        type: String
    },
    Time: {
        type: String
    }
});

var Todo3 = mongoose.model("NotificationCollection", NotificationSchema);

var PaymentSchema = new mongoose.Schema({
    OwnerNameId: {
        type: String
    },
    Time: {
        type: String
    },
    Amount: {
        type: String
    },
    Status: {
        type: String
    }
});

var Todo4 = mongoose.model("PaymentCollection", PaymentSchema);

var PlanSchema = new mongoose.Schema({
    Plan: {
      type: String,
    },
    PlanAmount: {
      type: String,
    },
    ActualPrice: {
      type: String,
    },
    Message: {
      type: String,
    },
    OffAmount: {
      type: String,
    }
  });
  
  var Todo5 = mongoose.model("Plancollection", PlanSchema);

  var SocketConnectedUserSchema = new mongoose.Schema({
    SocketConnectedUserTime: {
        type: String,
    }
  });
  
  var Todo6 = mongoose.model("SocketConnectedUserCollection", SocketConnectedUserSchema);

  var UserOfEnteringSchema = new mongoose.Schema({
    Sender: {
        type: String,
    },
    Receiver: {
        type: String,
    }
  });
  
  var Todo7 = mongoose.model("UserOfEnteringCollection", UserOfEnteringSchema);

  var MessageSchema = new mongoose.Schema({
    Sender: {
        type: String,
    },
    Receiver: {
        type: String,
    },
    Message: {
      type: String,
    }
  });
  
  var Todo8 = mongoose.model("MessageCollection", MessageSchema);

  var UserOfLeavingSchema = new mongoose.Schema({
    LeavingUserName: {
        type: String,
    },
    LeavingFrom: {
        type: String,
    },
  });
  
  var Todo9 = mongoose.model("UserOfLeavingCollection", UserOfLeavingSchema);

  
  var SocketDiConnectedUserSchema = new mongoose.Schema({
    SocketDiConnectedUserTime: {
        type: String,
    }
  });
  
  var Todo10 = mongoose.model("SocketDiConnectedUserCollection", SocketDiConnectedUserSchema);

  var UserConnectInformationUserSchema = new mongoose.Schema({
    User1: {
        type: String,
    },
    User2: {
        type: String,
    }
  });
  
  var Todo11 = mongoose.model("UserConnectInformationCollection", UserConnectInformationUserSchema);

module.exports = { Todo , Todo2 , Todo3 , Todo4 , Todo5 , Todo6 , Todo7 , Todo8 , Todo9 , Todo10 , Todo11 };
