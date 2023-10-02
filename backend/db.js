const mongoose = require('mongoose');
// const mongoURI = 'mongodb+srv://goFood:goFoodGo@cluster0.5vx6zk9.mongodb.net/goFoodMern?retryWrites=true&w=majority';
const mongoURI = 'mongodb://goFood:goFoodGo@ac-bfy7ptv-shard-00-00.5vx6zk9.mongodb.net:27017,ac-bfy7ptv-shard-00-01.5vx6zk9.mongodb.net:27017,ac-bfy7ptv-shard-00-02.5vx6zk9.mongodb.net:27017/goFoodMern?ssl=true&replicaSet=atlas-12nw8x-shard-0&authSource=admin&retryWrites=true&w=majority'



const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) {
            console.log("---", err);
        }
        else {
            console.log("connected successfully here ");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("foodCategory");

                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        global.food_items = data;
                        global.foodCategory = catData;
                    }
                })
                // if (err) {
                //     console.log(err);
                // }
                // else {
                //     // console.log(data)
                //     global.food_items = data;
                //     // console.log(global.food_items);
                // }
            })
        }
    });
}
module.exports = mongoDB;
