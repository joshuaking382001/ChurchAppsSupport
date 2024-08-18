import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./mf.css";


const MarriageCertificate = () => {
  const navigate = useNavigate()
  //Date formate
  const convertIdToDate = (id) => {
    const [datePart, timePart] = id.split("-").slice(1);
    const year = datePart.slice(0, 4);
    const month = datePart.slice(4, 6);
    const day = datePart.slice(6, 8);
    return `${day}-${month}-${year}`;
  };
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return ""; // Handle empty or undefined date
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const [data, setData] = useState({});
  const useParams = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const segments = pathname.split("/").filter(Boolean);
    return {
      id: segments[1],
    };
  };
  const { id } = useParams();
  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fileName = "MarriageCertificate.json";
        const response = await fetch('http://localhost/api/marriagec.php');
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
  }, [id]);

  console.log(data);
  // print functionalities
  const handlePrint = () => {
    window.print();
  };

  const handleHome = () => {
    navigate("/");
  };
  return (
    <>
      <div className="parent">
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
        <div className="wid" id="printable-form">
          <div className="head" align="center">
            <h1 style={{color:"black", fontWeight: "bold", fontSize: "30px" }}>
              St.ANTONY'S CHURCH
            </h1><br></br>
            <h3 style={{color:"black", fontWeight: "bold" }}>
              Konnaikudi, Anbil (Via),Trichy-621 702.
            </h3>{" "}
            <br />
          </div>
          <h2 align="center" style={{ fontWeight: "bold", fontSize: "20px" }}>
            Marriage Certificate
          </h2>
          <br />
          <form>
            <label>Kept at</label>
            <input className="kep" disabled="text" value={data.textArea} />
            <br />
            <br />
            <input className="kept" disabled="text" />
            <br />
            <br />
            <input className="kept" disabled="text" />
            <br />
            <br />
            <br />
            <label>Date of Marriage</label>
            <input  disabled type="text" value={formatDateForDisplay(data.dateofmarriage)} />
            <label class="pr-5">Place of Marriage</label>
            <input class="pr-5"  disabled type="text" value={data.placeOfMarriage} />
          </form>
          <br />
          <br />
          <div>
            <table>
              <tr>
                <th colSpan="2"></th>
                <th align="center">BRIDEGROOM</th>
                <th align="center">BRIDE</th>
              </tr>
              <tr>
                <td colSpan="2">Christian Name</td>
                <td>{data.groomChristianName}</td>
                <td>{data.brideChristianName}</td>
              </tr>
              <tr>
                <td colspan="2">Surname/Common Name</td>
                <td>{data.groomsurName}</td>
                <td>{data.brideSurName}</td>
              </tr>
              <tr>
                <td colSpan="2">Age</td>
                <td>{data.groomage}</td>
                <td>{data.brideage}</td>
              </tr>
              <tr>
                <td colSpan="2">Condition</td>
                <td>{data.groomcondition}</td>
                <td>{data.brideCondition}</td>
              </tr>
              <tr>
                <td colSpan="2">Rank of Profession</td>
                <td>{data.groomrank}</td>
                <td>{data.brideRank}</td>
              </tr>
              <tr>
                <td colSpan="2">Residence at the time of Marriage</td>
                <td>{data.groomresidence}</td>
                <td>{data.brideResidence}</td>
              </tr>
              <tr>
                <td rowSpan="2">Name of the Parents</td>
                <td>Father</td>
                <td>{data.groomfatherName}</td>
                <td>{data.brideFatherName}</td>
              </tr>
              <tr>
                <td>Mother</td>
                <td>{data.groommotherName}</td>
                <td>{data.brideMotherName}</td>
              </tr>
              <tr>
                <td rowSpan="3">Name of the Witnesses and Address</td>
                <td>1.</td>
                <td>{data.groomfirstWitness}</td>
                <td>{data.brideFirstWitness}</td>
              </tr>
              <tr>
                <td>2.</td>
                <td>{data.groomsecondWitness}</td>
                <td>{data.brideSecondWitness}</td>
              </tr>
            </table>
          </div>
          <br />
          <br />

          <label>Name of the Minister by whom the <br /> ceremony is performed:</label>
          <input disabled className="foot" type="text" value={data. ceremony} />
          <br />
          <br />
          <p class="italic text-center">
            I certify that the above extract is a true copy
          </p><br />

                <label>Date: </label>
                <input
                  disabled
                  className="date"
                  type="text"
                  value={formatDateForDisplay(data.date)}
                />
              
                <label className="fon">Parish Priest</label>
                <p class=" font-normal pl-80">Parish Seal</p>
             
        </div>
      </div>
    </>
  );
};

export default MarriageCertificate;