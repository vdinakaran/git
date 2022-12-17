import Navbar from "../components/Navbar";
//import oes from "../images/oes";
const oesPicture = require("./oes.jpg");

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1 className="text-center">Welcome to Online Education System</h1>
      <img
        src={oesPicture}
        style={{
          display: "block",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
        }}
      />
    </div>
  );
}
