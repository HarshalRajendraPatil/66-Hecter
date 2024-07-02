import Property from "../models/propertyModel.js";
import User from "../models/UserModel.js";
import Review from "../models/reviewModel.js";
import catchAsync from "../utils/catchAsync.js";
import CustomError from "../utils/customError.js";
import createNotificationForUpdates from "../service/createNotification.js";
import sendEmails from "../service/sendEmails.js";

// Add a review to the property
const addReview = catchAsync(async (req, res, next) => {
  const property = await Property.findById(req.params.propertyId).populate(
    "reviews"
  );

  if (!property) return new CustomError("No property found.", 404);

  const reviewData = {
    property: req.params.propertyId,
    user: req.user._id,
    ...req.body,
  };
  const review = await Review.create(reviewData);

  property.reviews.push(review);
  property.ratingsQuantity = property.reviews.length;
  property.averageRating =
    property.reviews.reduce((acc, rev) => acc + Number(rev.rating), 0) /
    property.reviews.length;
  await property.save();

  const user = await User.findById(req.user._id);
  user.reviews.push(review);
  await user.save();

  const propertyOwner = await User.findById(property.listingDetails.listedBy);
  const type = "review";
  const message =
    "A new review has be added to your listed property. Read it now.";

  await createNotificationForUpdates(propertyOwner, type, message);
  sendEmails(propertyOwner.email, "New Review Added", message);

  res.status(201).json({
    status: "success",
    data: {
      review,
    },
  });
});

const getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find()
    .populate("user property")
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

const getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.reviewId).populate(
    "user property"
  );

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

// Get all reviews for a property.
const getAllPropertyReviews = catchAsync(async (req, res, next) => {
  const property = await Property.findById(req.params.propertyId);

  if (!property) return new CustomError("No property found!", 404);

  const reviews = await Review.find({
    property: req.params.propertyId,
  })
    .populate("user", "name")
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

// Get all reviews by a user
const getAllReviewsByUser = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ user: req.user._id })
    .populate("property", "title")
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

// Update a review.
const updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.reviewId);

  if (!review) return new CustomError("No review found!", 404);

  if (
    !(
      req.user.role === "admin" ||
      req.user._id.toString() === review.user.toString()
    )
  )
    return next(new CustomError("Permission denied!", 403));

  await review.updateOne(req.body, { new: true, runValidators: true });

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

// Delete a review.
const deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.reviewId);

  if (!review) return new CustomError("No review found!", 404);

  if (
    !(
      req.user.role === "admin" ||
      req.user._id.toString() === review.user.toString()
    )
  )
    return next(new CustomError("Permission denied!", 403));

  await review.deleteOne();

  const property = await Property.findById(review.property);
  property.reviews.pull(req.params.reviewId);
  property.ratingsQuantity = property.reviews.length;
  property.averageRating =
    property.reviews.length > 0
      ? property.reviews.reduce((acc, rev) => acc + rev.rating, 0) /
        property.reviews.length
      : 0;
  await property.save();

  const user = await User.findById(req.user._id);
  user.reviews.pull(req.params.reviewId);
  await user.save();

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export {
  addReview,
  getAllReviews,
  getReview,
  getAllPropertyReviews,
  getAllReviewsByUser,
  updateReview,
  deleteReview,
};
