
import React, { useEffect, useState } from "react";
import "./letterpad.css";
import { useLocation, useNavigate } from "react-router-dom";

const LetterPad = () => {
  const [data, setData] = useState({});
  const navigate=useNavigate()

  const useParams = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const segments = pathname.split("/").filter(Boolean);
  
    return {
      id: segments[1], // Adjust this based on your URL structure
    };
  };
  const { id } = useParams();
  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fileName = "LetterPad.json";
        const response = await fetch('http://localhost/api/letterpad.php');
        const result = await response.json();
        result.map((val, idx) => {
          console.log(val.id, id);
          if (val.id === id) {
            setData(val);
          }
        });
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

  // print functionalities
  const handlePrint = () => {
    window.print();
  };

  const handleHome = () => {
    navigate("/");
  };
  console.log(data);
  return (
    <page size="A4" class="parent">
      <div>
        <button
          onClick={handlePrint}
          className="px-4 py-2 m-3 bg-pink-500 text-white rounded hover:bg-pink-700 transition-colors duration-200"
        >
          Print
        </button>
        <button
          onClick={handleHome}
          className="px-4 py-2 m-3 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-200"
        >
          Home
        </button>
      </div>
      <div class="wid" id="printable-form">
        <div class="head">
          <h1 style={{ fontWeight: "bold", fontSize: "30px" }}>
            St.ANTONY'S CHURCH
          </h1>
          <br></br>
          <h3 style={{ fontWeight: "bold" }}>
            Konnaikudi, Anbil (Via),Trichy-621 702.
          </h3>
          <br />
        </div>
        <div class="let">
          <br />
          <h3 style={{ color: "#5D3FD3", fontWeight: "bold" }}>
            Rev. Fr. A. Williams
          </h3>
          <br />
          <p class="float-right">Parish Priest</p><br/> <br/>
          <p class="float-right">9626639044</p>
          <br />
        </div>
        <div
          style={{
            whiteSpace: 'pre-wrap',
            marginTop: "8%",
            padding: "17px",
            fontStyle: data.fontStyle,
            fontWeight: data.fontWeight,
            fontSize: data.fontSize,
            textAlign: data.textAlign,
          }}
        >
          {data.textarea}
        </div>
      </div>
    </page>
  );
};

export default LetterPad;
