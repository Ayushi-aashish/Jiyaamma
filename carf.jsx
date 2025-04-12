import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const mockAPI = "/api/cars";

const brands = ["Toyota", "Honda", "Ford", "BMW"];
const fuelTypes = ["Petrol", "Diesel", "Electric"];
const seatOptions = [2, 4, 5, 7];
const itemsPerPage = 10;

export default function CarFinder() {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({ brand: "all", price: "any", fuel: "any", seats: "any", search: "", sort: "none" });
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(filters);
      const res = await fetch(`${mockAPI}?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch cars");
      const data = await res.json();
      if (filters.sort === "asc") data.sort((a, b) => a.price - b.price);
      if (filters.sort === "desc") data.sort((a, b) => b.price - a.price);
      setCars(data);
      setCurrentPage(1);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
  }, []);

  useEffect(() => {
    fetchData();
  }, [filters]);

  const updateFilter = (key, value) => setFilters({ ...filters, [key]: value });

  const toggleWishlist = (car) => {
    const exists = wishlist.find(w => w.id === car.id);
    const updatedWishlist = exists ? wishlist.filter(w => w.id !== car.id) : [...wishlist, car];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const paginatedCars = cars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(cars.length / itemsPerPage);

  return (
    <div className={`p-6 max-w-screen-xl mx-auto transition duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Car Finder</h1>
        <div className="flex items-center gap-2">
          <span>Dark Mode</span>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search by model or brand"
          onChange={(e) => updateFilter("search", e.target.value)}
          className="w-full max-w-md mx-auto mb-6"
        />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Select onValueChange={(v) => updateFilter("brand", v)}>
            <SelectTrigger><SelectValue placeholder="All Brands" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {brands.map(brand => <SelectItem key={brand} value={brand}>{brand}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select onValueChange={(v) => updateFilter("price", v)}>
            <SelectTrigger><SelectValue placeholder="Any Price" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Price</SelectItem>
              <SelectItem value="0-20000">Below $20,000</SelectItem>
              <SelectItem value="20000-50000">$20,000 - $50,000</SelectItem>
              <SelectItem value="50000-100000">$50,000 - $100,000</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(v) => updateFilter("fuel", v)}>
            <SelectTrigger><SelectValue placeholder="Any Fuel" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Fuel</SelectItem>
              {fuelTypes.map(fuel => <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select onValueChange={(v) => updateFilter("seats", v)}>
            <SelectTrigger><SelectValue placeholder="Any Seats" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Seats</SelectItem>
              {seatOptions.map(seats => <SelectItem key={seats} value={String(seats)}>{seats} Seats</SelectItem>)}
            </SelectContent>
          </Select>
          <Select onValueChange={(v) => updateFilter("sort", v)}>
            <SelectTrigger><SelectValue placeholder="Sort by" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Sort by</SelectItem>
              <SelectItem value="asc">Price: Low to High</SelectItem>
              <SelectItem value="desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading && <p className="text-center">Loading cars...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {paginatedCars.map(car => (
          <Card key={car.id} className="cursor-pointer shadow-md hover:shadow-lg transition-all duration-200">
            <CardContent className="p-4">
              <img src={car.image} alt={car.model} className="w-full h-40 object-cover mb-2 rounded-md transition-transform duration-300 hover:scale-105" />
              <h2 className="text-xl font-semibold">{car.brand} {car.model}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">${car.price.toLocaleString()}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{car.fuel} • {car.seats} seats</p>
              <Button
                onClick={() => toggleWishlist(car)}
                className="mt-3 w-full"
                variant={wishlist.find(w => w.id === car.id) ? "secondary" : "default"}
              >
                {wishlist.find(w => w.id === car.id) ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            variant={currentPage === index + 1 ? "default" : "outline"}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}
