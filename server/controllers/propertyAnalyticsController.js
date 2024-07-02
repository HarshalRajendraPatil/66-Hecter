import Property from "../models/propertyModel.js";
import catchAsync from "../utils/catchAsync.js";

// Controller to get top 10 properties with high averageRating values
const getTopRatedProperties = catchAsync(async (req, res) => {
  const properties = await Property.find()
    .sort({ averageRating: -1 })
    .limit(10);

  res.status(200).json({
    status: "success",
    results: properties.length,
    data: properties,
  });
});

// Controller to get top 10 most expensive properties
const getMostExpensiveProperties = catchAsync(async (req, res) => {
  const properties = await Property.find()
    .sort({ "pricing.price": -1 })
    .limit(10);

  res.status(200).json({
    status: "success",
    results: properties.length,
    data: properties,
  });
});

// Controller to get top 10 properties for sale
const getTopPropertiesToSale = catchAsync(async (req, res) => {
  const properties = await Property.find({ transactionType: "Buy" })
    .sort({ views: -1 })
    .limit(10);

  res.status(200).json({
    status: "success",
    results: properties.length,
    data: properties,
  });
});

// Controller to get top 10 properties for rent
const getTopPropertiesToRent = catchAsync(async (req, res) => {
  const properties = await Property.find({ transactionType: "Rent" })
    .sort({ views: -1 })
    .limit(10);

  res.status(200).json({
    status: "success",
    results: properties.length,
    data: properties,
  });
});

// Controller to get top 10 properties for rent
const getMostViewedProperty = catchAsync(async (req, res) => {
  const properties = await Property.find().sort({ views: -1 }).limit(10);

  res.status(200).json({
    status: "success",
    results: properties.length,
    data: properties,
  });
});

export {
  getTopRatedProperties,
  getMostExpensiveProperties,
  getTopPropertiesToSale,
  getTopPropertiesToRent,
  getMostViewedProperty,
};
