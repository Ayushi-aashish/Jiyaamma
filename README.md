# Jiyaamma
car finder web app
Car Finder 🚗
Car Finder is a sleek and user-friendly web application that helps users search, filter, sort, and wishlist cars based on their preferences. It features a fully customizable interface with dark mode, pagination, and persistent wishlist functionality using local storage.
Features
- 🔍 Search & Filter: Filter cars by brand, price range, fuel type, and seating capacity.
- 🔄 Sort: Sort cars by price in ascending or descending order.
- ⭐ Wishlist: Add or remove cars from your wishlist with persistent storage using localStorage.
- 🌗 Dark Mode: Toggle between light and dark themes for better accessibility and user experience.
- 📑 Pagination: Efficiently browse large data sets with paginated results.

Technologies Used
- Frontend: React, Tailwind CSS
- UI Components: Custom-designed or imported from reusable components
- Data Handling: Mock API with filtering, sorting, and pagination
- Persistence: Wishlist saved in localStorage
- Error Handling: Graceful API error handling with user feedback
  
Installation
- Clone the repository:git clone https://github.com/your-username/car-finder.git
cd car-finder

- Install dependencies:npm install

- Start the development server:npm run dev

- Open the app in your browser:http://localhost:3000

Project Structure

src/
│
├── components/
│   ├── ui/
│   │   ├── card/
│   │   ├── button/
│   │   ├── input/
│   │   └── select/
│
├── pages/
│   └── main.js (Main application logic)
    └── carf.js 
│
└── styles/
    └── index.css

Usage
- Use the input field to search by car brand or model.
- Apply filters such as brand, price, fuel type, or seating capacity.
- Add cars to your wishlist or remove them with a single click.
- Toggle dark mode for a personalized experience.
- Navigate through pages of cars using the pagination controls.

Customization
- API URL: Update the mockAPI constant to use a real API endpoint.
- Filters & Data: Modify the brands, fuelTypes, and seatOptions arrays for customization.

Future Enhancements
- Replace the mock API with a real backend service.
- Implement advanced state management using Redux or Zustand.
- Add unit and integration tests for better reliability.
- Enhance accessibility with ARIA roles and keyboard navigation support.

Contributions
Feel free to fork this repository and submit pull requests. Your contributions are welcome!

License
This project is licensed under the MIT License. See the LICENSE file for details.

