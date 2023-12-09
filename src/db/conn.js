const  mongoose = require("mongoose");

var  uri = process.env.oneDay || "mongodb+srv://nikunj:Wevalet123@cluster.v3ig5fo.mongodb.net/PetDatabase"

const  options = {
// useNewUrlParser:  true,
// useUnifiedTopology:  true
};

mongoose.connect(uri, options).then(() => {
console.log("Database connection established!");
},
err  => {
{
console.log("Error connecting Database instance due to:", err);
}
});