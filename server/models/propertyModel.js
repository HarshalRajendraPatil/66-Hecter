import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the property schema
const propertySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    type: {
      type: String,
      enum: ["Residential", "Commercial", "Industrial", "Land"],
      required: [true, "Type is required"],
    },
    status: {
      type: String,
      enum: ["Available", "Sold", "Pending"],
      default: "Available",
    },
    location: {
      address: {
        type: String,
        required: [true, "Address is required"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
      },
      state: {
        type: String,
        required: [true, "State is required"],
      },
      zipCode: {
        type: String,
        required: [true, "Zip Code is required"],
      },
      country: {
        type: String,
        required: [true, "Country is required"],
      },
      neighborhood: String,
      latitude: Number,
      longitude: Number,
    },
    pricing: {
      price: {
        type: Number,
        required: [true, "Price is required"],
      },
      currency: {
        type: String,
        default: "USD",
      },
      pricePerUnit: Number,
      taxes: Number,
    },
    features: {
      bedrooms: Number,
      bathrooms: Number,
      livingArea: Number,
      lotSize: Number,
      yearBuilt: Number,
      floors: Number,
      parkingSpaces: Number,
      garage: Boolean,
      basement: Boolean,
    },
    interior: {
      kitchen: String,
      heating: String,
      cooling: String,
      furnishing: {
        type: String,
        enum: ["Furnished", "Unfurnished", "Partially Furnished"],
      },
      appliances: [String],
      fireplace: Boolean,
    },
    exterior: {
      garden: Boolean,
      patio: Boolean,
      balcony: Boolean,
      swimmingPool: Boolean,
      fence: Boolean,
    },
    additionalDetails: {
      amenities: [String],
      hoaFees: Number,
      utilities: [String],
      schoolDistrict: String,
      publicTransport: String,
    },
    media: {
      images: [
        {
          url: String,
          public_id: String,
        },
      ],
      videos: [
        {
          url: String,
          public_id: String,
        },
      ],
      floorPlans: [
        {
          url: String,
          public_id: String,
        },
      ],
    },
    listingDetails: {
      listedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      dateListed: {
        type: Date,
        default: Date.now,
      },
      lastUpdated: {
        type: Date,
        default: Date.now,
      },
    },
    contactDetails: {
      contactName: {
        type: String,
        required: [true, "Contact Name is required"],
      },
      contactPhone: {
        type: String,
        required: [true, "Contact Phone is required"],
      },
      contactEmail: {
        type: String,
        required: [true, "Contact Email is required"],
      },
    },
    legal: {
      zoning: String,
      legalDescription: String,
      deedRestrictions: String,
      propertyId: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Property", propertySchema);
