import Property from "../models/propertyModel.js";
import User from "../models/UserModel.js";
import catchAsync from "../utils/catchAsync.js";
import CustomError from "../utils/customError.js";
import cloudinary from "../service/cloudinary.js";
import provideFilteredProperties from "../service/provideFilteredProperties.js";

// Create a new property
const createProperty = catchAsync(async (req, res, next) => {
  const props = {
    ...req.body,
  };

  props.listingDetails.listedBy = req.user._id;
  props.listingDetails.dataListed = new Date().toString();
  props.listingDetails.lastUpdated = new Date().toString();
  props.contactDetails.contactName = req.user.name;
  props.contactDetails.contactPhone = req.user.phone;
  props.contactDetails.contactEmail = req.user.email;

  const property = await Property.create(props);

  res.status(201).json({
    status: "success",
    data: {
      property,
    },
  });
});

// Get all properties with optional filters
const getAllProperties = catchAsync(async (req, res, next) => {
  provideFilteredProperties(req, res);
});

// Get a property by ID
const getPropertyById = catchAsync(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(new CustomError("No property found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      property,
    },
  });
});

// Update a property by ID
const updateProperty = catchAsync(async (req, res, next) => {
  const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!property) {
    return next(new CustomError("No property found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      property,
    },
  });
});

// Delete a property by ID
const deleteProperty = catchAsync(async (req, res, next) => {
  const property = await Property.findByIdAndDelete(req.params.id);

  if (!property) {
    return next(new CustomError("No property found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// Get properties by user ID
const getPropertiesByUser = catchAsync(async (req, res, next) => {
  const page = req.query.page || 1;
  const totalPropertiesInAPage = 1;
  const propertiesToSkip = (page - 1) * totalPropertiesInAPage;

  const properties = await Property.find({
    "listingDetails.listedBy": req.params.userId,
  })
    .skip(propertiesToSkip)
    .limit(totalPropertiesInAPage);

  if (!properties) {
    return next(new CustomError("No properties found for this user", 404));
  }

  res.status(200).json({
    status: "success",
    results: properties.length,
    data: {
      properties,
    },
  });
});

// Upload property media
const uploadPropertyMedia = catchAsync(async (req, res, next) => {
  const property = await Property.findById(req.params.id);
  let images;

  if (Array.isArray(req.files.images)) images = req.files.images;
  else images = [req.files.images];

  if (!property) {
    return next(new CustomError("No property found with that ID", 404));
  }

  const imagePromises = images.flatMap((file) =>
    cloudinary.uploader.upload(file.tempFilePath, { resource_type: "auto" })
  );

  const imageResults = await Promise.all(imagePromises);
  console.log(imageResults);

  imageResults.forEach((result) => {
    property.media.images.push({
      url: result.secure_url,
      public_id: result.public_id,
    });
  });

  await property.save();

  res.status(200).json({
    status: "success",
    data: {
      property,
    },
  });
});

// Delete property media
const deletePropertyMedia = catchAsync(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(new CustomError("No property found with that ID", 404));
  }

  const mediaIndex = property.media.images.findIndex(
    (img) => img.public_id === req.params.mediaId
  );

  if (mediaIndex === -1) {
    return next(new CustomError("No media found with that ID", 404));
  }

  // Remove media from Cloudinary
  await cloudinary.uploader.destroy(req.params.mediaId, {
    resource_type: "image",
  });

  // Remove media from property document
  property.media.images.splice(mediaIndex, 1);

  await property.save();

  res.status(200).json({
    status: "success",
    data: {
      property,
    },
  });
});

// Add property to favorites
const addAndRemovePropertyFromFavorites = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new CustomError("User not found", 404));
  }

  if (!user.favorites.includes(req.params.id)) {
    user.favorites.push(req.params.id);
  } else {
    user.favorites = user.favorites.filter(
      (property) => property.toString() !== req.params.id
    );
  }

  await user.save();

  res.status(200).json({
    status: "success",
    data: {
      favorites: user.favorites,
    },
  });
});

export {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getPropertiesByUser,
  uploadPropertyMedia,
  deletePropertyMedia,
  addAndRemovePropertyFromFavorites,
};
