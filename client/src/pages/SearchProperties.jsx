import React, { useState, useEffect } from "react";
import axios from "axios";
import CheckBoxForFilters from "../components/CheckBoxForFilters";
import InputsForFilters from "../components/InputsForFilters";
import PropertyCard from "../components/PropertyCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../components/LoadingSpinner";

const SearchProperties = () => {
  const [filters, setFilters] = useState({});
  const [properties, setProperties] = useState([]);
  const [city, setCity] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [status, setStatus] = useState("idle");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (checked) {
        newFilters[name] = checked;
      } else {
        delete newFilters[name];
      }
      return newFilters;
    });
  };

  const handleSearch = async () => {
    setStatus("loading");
    try {
      if (city) filters.city = city;
      else filters.city = "";
      const response = await axios.get("/properties", { params: filters });
      setProperties(response.data.data.properties);
      setStatus("succeeded");
    } catch (error) {
      setStatus("failed");
      console.error("Error fetching properties:", error);
      toast.error("Failed to load the properties.");
    }
  };

  useEffect(() => {
    handleSearch();
  }, [filters, city]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row bg-light-beige text-dark-gray mt-14 max-h-fit">
      <ToastContainer />
      <button
        className="md:hidden mt-4 p-2 max-w-fit mx-auto bg-gold text-dark-gray rounded"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? "Hide Filters" : "Show Filters"}
      </button>
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-1/4 p-4 md:p-8 bg-white border-r border-gray-200 overflow-scroll`}
      >
        <h2 className="text-2xl font-bold text-gold mb-4">Filters</h2>
        <InputsForFilters
          title={"State"}
          type={"text"}
          name={"state"}
          value={filters.state || ""}
          handleInputChange={handleInputChange}
        />
        <InputsForFilters
          title={"Zip Code"}
          type={"text"}
          name={"zipCode"}
          value={filters.zipCode || ""}
          handleInputChange={handleInputChange}
        />
        <InputsForFilters
          title={"Neighborhood"}
          type={"text"}
          name={"neighborhood"}
          value={filters.neighborhood || ""}
          handleInputChange={handleInputChange}
        />
        <InputsForFilters
          title={"Country"}
          type={"text"}
          name={"country"}
          value={filters.country || ""}
          handleInputChange={handleInputChange}
        />
        <div className="mb-4">
          <label className="block mb-1">Type</label>
          <select
            name="type"
            value={filters.type || ""}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-200 rounded"
          >
            <option value="">Select Type</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
            <option value="Land">Land</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Status</label>
          <select
            name="status"
            value={filters.status || ""}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-200 rounded"
          >
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Furniture Status</label>
          <select
            name="furnishing"
            value={filters.furnishing || ""}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-200 rounded"
          >
            <option value="">Select Status</option>
            <option value="Furnished">Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Property for</label>
          <select
            name="transactionType"
            value={filters.transactionType || ""}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-200 rounded"
          >
            <option value="">Select Status</option>
            <option value="Buy">Buy</option>
            <option value="Rent">Rent</option>
          </select>
        </div>
        <InputsForFilters
          title={"Max Price"}
          type={"number"}
          name={"maxPrice"}
          value={filters.maxPrice || ""}
          handleInputChange={handleInputChange}
        />
        <InputsForFilters
          title={"Bedrooms"}
          type={"number"}
          name={"bedrooms"}
          value={filters.bedrooms || ""}
          handleInputChange={handleInputChange}
        />
        <InputsForFilters
          title={"Bathrooms"}
          type={"number"}
          name={"bathrooms"}
          value={filters.bathrooms || ""}
          handleInputChange={handleInputChange}
        />
        <InputsForFilters
          title={"Floors"}
          type={"number"}
          name={"floors"}
          value={filters.floors || ""}
          handleInputChange={handleInputChange}
        />
        <InputsForFilters
          title={"Parking Spaces"}
          type={"number"}
          name={"parkingSpaces"}
          value={filters.parkingSpaces || ""}
          handleInputChange={handleInputChange}
        />
        <h3 className="text-xl font-bold text-navy mb-2">Exterior</h3>
        <CheckBoxForFilters
          title={"Garden"}
          name={"garden"}
          checked={filters.garden || ""}
          handleCheckboxChange={handleCheckboxChange}
        />
        <CheckBoxForFilters
          title={"Swimming Pool"}
          name={"swimmingPool"}
          checked={filters.swimmingPool || ""}
          handleCheckboxChange={handleCheckboxChange}
        />
        <CheckBoxForFilters
          title={"Patio"}
          name={"patio"}
          checked={filters.patio || ""}
          handleCheckboxChange={handleCheckboxChange}
        />
        <CheckBoxForFilters
          title={"Balcony"}
          name={"balcony"}
          checked={filters.balcony || ""}
          handleCheckboxChange={handleCheckboxChange}
        />
        <CheckBoxForFilters
          title={"Fence"}
          name={"fence"}
          checked={filters.fence || ""}
          handleCheckboxChange={handleCheckboxChange}
        />
        <CheckBoxForFilters
          title={"Garage"}
          name={"garage"}
          checked={filters.garage || ""}
          handleCheckboxChange={handleCheckboxChange}
        />
        <CheckBoxForFilters
          title={"Basement"}
          name={"basement"}
          checked={filters.basement || ""}
          handleCheckboxChange={handleCheckboxChange}
        />
        <CheckBoxForFilters
          title={"Fireplace"}
          name={"fireplace"}
          checked={filters.fireplace || ""}
          handleCheckboxChange={handleCheckboxChange}
        />
      </aside>

      <main className="flex-1 p-4 md:p-8">
        <div className="mb-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search for properties in your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-l"
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gold mb-4">Search Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {status === "loading" ? (
            <LoadingSpinner />
          ) : status === "failed" ? (
            <p>Could not load the data !!!</p>
          ) : properties.length > 0 ? (
            properties.map((property) => (
              <PropertyCard data={property} key={property._id} />
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchProperties;
