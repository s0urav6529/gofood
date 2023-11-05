const displayFood = async (req, res) => {
  try {
    res.send([global.foodItems, global.foodCategorys]);

  } catch (error) {
    res.send({success:false});
  }
};

module.exports = displayFood;
