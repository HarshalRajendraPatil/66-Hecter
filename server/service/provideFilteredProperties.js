import catchAsync from "../utils/catchAsync.js";
import Property from "../models/propertyModel.js";

const provideFilteredProperties = catchAsync(async (req, res) => {
  const page = req.query.page || 1;
  const totalPropertiesInAPage = 10;
  const propertiesToSkip = (page - 1) * totalPropertiesInAPage;
  const filters = req.query;
  const query = {};

  if (filters.city) {
    query["location.city"] = filters.city;
  }
  if (filters.state) {
    query["location.state"] = filters.state;
  }
  if (filters.zipCode) {
    query["location.zipCode"] = filters.zipCode;
  }
  if (filters.neighborhood) {
    query["location.neighborhood"] = filters.neighborhood;
  }
  if (filters.country) {
    query["location.country"] = filters.country;
  }
  if (filters.type) {
    query.type = filters.type;
  }
  if (filters.maxPrice) {
    if (!query["pricing.price"]) {
      query["pricing.price"] = {};
    }
    query["pricing.price"].$lte = filters.maxPrice;
  }
  if (filters.bedrooms) {
    query["features.bedrooms"] = { $gte: filters.bedrooms };
  }
  if (filters.bathrooms) {
    query["features.bathrooms"] = { $gte: filters.bathrooms };
  }
  if (filters.maxLivingArea) {
    if (!query["features.livingArea"]) {
      query["features.livingArea"] = {};
    }
    query["features.livingArea"].$lte = filters.maxLivingArea;
  }
  if (filters.maxLotSize) {
    if (!query["features.lotSize"]) {
      query["features.lotSize"] = {};
    }
    query["features.lotSize"].$lte = filters.maxLotSize;
  }
  if (filters.yearBuilt) {
    query["features.yearBuilt"] = filters.yearBuilt;
  }
  if (filters.floors) {
    query["features.floors"] = filters.floors;
  }
  if (filters.parkingSpaces) {
    query["features.parkingSpaces"] = { $gte: filters.parkingSpaces };
  }
  if (filters.garage !== undefined) {
    query["features.garage"] = filters.garage;
  }
  if (filters.basement !== undefined) {
    query["features.basement"] = filters.basement;
  }
  if (filters.garden !== undefined) {
    query["exterior.garden"] = filters.garden;
  }
  if (filters.patio !== undefined) {
    query["exterior.patio"] = filters.patio;
  }
  if (filters.balcony !== undefined) {
    query["exterior.balcony"] = filters.balcony;
  }
  if (filters.swimmingPool !== undefined) {
    query["exterior.swimmingPool"] = filters.swimmingPool;
  }
  if (filters.fence !== undefined) {
    query["exterior.fence"] = filters.fence;
  }
  if (filters.fireplace !== undefined) {
    query["interior.fireplace"] = filters.fireplace;
  }
  if (filters.kitchen) {
    query["interior.kitchen"] = filters.kitchen;
  }
  if (filters.heating) {
    query["interior.heating"] = filters.heating;
  }
  if (filters.cooling) {
    query["interior.cooling"] = filters.cooling;
  }
  if (filters.furnishing) {
    query["interior.furnishing"] = filters.furnishing;
  }
  if (filters.amenities && filters.amenities.length > 0) {
    query["additionalDetails.amenities"] = { $in: filters.amenities };
  }
  if (filters.maxHoaFees) {
    if (!query["additionalDetails.hoaFees"]) {
      query["additionalDetails.hoaFees"] = {};
    }
    query["additionalDetails.hoaFees"].$lte = filters.maxHoaFees;
  }

  const properties = await Property.find(query)
    .skip(propertiesToSkip)
    .limit(totalPropertiesInAPage)
    .populate("listingDetails.listedBy");

  res.status(200).json({
    status: "success",
    results: properties.length,
    data: {
      properties,
    },
  });
});

export default provideFilteredProperties;

// FILTERS TO BE ADDED AT LATER POINT
// if (filters.utilities && filters.utilities.length > 0) {
//   query["additionalDetails.utilities"] = { $in: filters.utilities };
// }
// if (filters.schoolDistrict) {
//   query["additionalDetails.schoolDistrict"] = filters.schoolDistrict;
// }
// if (filters.publicTransport) {
//   query["additionalDetails.publicTransport"] = filters.publicTransport;
// }
// if (filters.hasImages !== undefined) {
//   if (filters.hasImages) {
//     query["media.images"] = { $exists: true, $ne: [] };
//   } else {
//     query["media.images"] = { $size: 0 };
//   }
// }
// if (filters.hasVideos !== undefined) {
//   if (filters.hasVideos) {
//     query["media.videos"] = { $exists: true, $ne: [] };
//   } else {
//     query["media.videos"] = { $size: 0 };
//   }
// }
// if (filters.hasFloorPlans !== undefined) {
//   if (filters.hasFloorPlans) {
//     query["media.floorPlans"] = { $exists: true, $ne: [] };
//   } else {
//     query["media.floorPlans"] = { $size: 0 };
//   }
// }
// if (filters.dateListedStart || filters.dateListedEnd) {
//   query["listingDetails.dateListed"] = {};
//   if (filters.dateListedStart) {
//     query["listingDetails.dateListed"].$gte = new Date(
//       filters.dateListedStart
//     );
//   }
//   if (filters.dateListedEnd) {
//     query["listingDetails.dateListed"].$lte = new Date(filters.dateListedEnd);
//   }
// }
// if (filters.listedBy) {
//   query["listingDetails.listedBy"] = filters.listedBy;
// }
// if (filters.appliances && filters.appliances.length > 0) {
//   query["interior.appliances"] = { $in: filters.appliances };
// }
// if (filters.status) {
//   query.status = filters.status;
// }
// if (filters.minPrice) {
//   query["pricing.price"] = { $gte: filters.minPrice };
// }
// if (filters.minLivingArea) {
//   query["features.livingArea"] = { $gte: filters.minLivingArea };
// }
// if (filters.minLotSize) {
//   query["features.lotSize"] = { $gte: filters.minLotSize };
// }
