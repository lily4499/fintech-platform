import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Users from "./components/Users";
import Transactions from "./components/Transactions";
import Accounts from "./components/Accounts";
import { Container } from "react-bootstrap";
import { getServerMessage } from "./api"; // Import API function

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const data = await getServerMessage(); // Fetch JSON message
        setMessage(data); // Store extracted message
      } catch (error) {
        setMessage("Error fetching message");
      }
    };
    fetchMessage();
  }, []);

  return (
    <Router>
      <NavigationBar />
      <Container>
        <h4 className="mt-4">{message}</h4> {/* Displays JSON message */}
        <Routes>
          <Route path="/" element={<h1 className="mt-4">Welcome to the Fintech Dashboard</h1>} />
          <Route path="/users" element={<Users />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/accounts" element={<Accounts />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;














// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import NavigationBar from "./components/Navbar";
// import Users from "./components/Users";
// import Transactions from "./components/Transactions";
// import Accounts from "./components/Accounts";
// import { Container } from "react-bootstrap";

// const App = () => {
//   return (
//     <Router>
//       <NavigationBar />
//       <Container>
//         <Routes>
//           <Route path="/" element={<h2 className="mt-4">Welcome to the Fintech Dashboard</h2>} />
//           <Route path="/users" element={<Users />} />
//           <Route path="/transactions" element={<Transactions />} />
//           <Route path="/accounts" element={<Accounts />} />
//         </Routes>
//       </Container>
//     </Router>
//   );
// };

// export default App;

