import NavBar from "./NavBar";
import { useState, useEffect, useContext } from "react";
import fetchLocation from "../api";
import { LocationContext } from "../contexts/LocationContext";
import { ServicesContext } from "../contexts/ServicesContext";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

export default function WelcomePage() {
  const [postcode, setPostcode] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("");
  // const [location, setLocation] = useState('')
  // const [services, setServices] = useState()
  const { user, setUser } = useContext(UserContext);
  const { location, setLocation } = useContext(LocationContext);
  const { services, setServices } = useContext(ServicesContext);

  return (
    <div className="text-center mt-5">
      {/* //header below */}
      <header>
        <h1>[WELCOME PAGE]</h1>
        <h2>PetsApp</h2>
      </header>

      {/* //new section below */}
      <section>
        {/* Location input box */}
        <br></br>
        <br></br>
        <p>Location: {neighbourhood}</p>
        <form action="">
          <input
            aria-label="aria" // << ??
            type="text"
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="Enter Postcode..."
          />

          <div>
            <h1>Pet Services</h1>
            {/* <p>{services}</p> */}
            <select
              className="btn btn-primary"
              value={services}
              onChange={(e) => {
                setServices(e.target.value);
              }}
            >
              <option></option>
              <option>Dog Sitting</option>
              <option>Cat Sitting</option>
              <option>Both</option>
            </select>
          </div>

          {/* Submit button*/}

          <button
            onClick={(e) => {
              e.preventDefault();
              fetchLocation(postcode).then((data) => {
                const neighbourhood = data.result.admin_ward;
                const latitude = data.result.latitude;
                const longitude = data.result.longitude;
                const newLocation = [latitude, longitude];
                setNeighbourhood(neighbourhood);
                setLocation(newLocation);
              });
            }}
          >
            <Link to="/home">Find your sitter</Link>
          </button>
        </form>
      </section>
    </div>
  );
}
