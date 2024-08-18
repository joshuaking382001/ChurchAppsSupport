import React, { useEffect, useState } from "react";
import './BaptismCertificate.css';
import { useLocation, useNavigate } from "react-router-dom";
const BaptismCertificate = () => {
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
      id: segments[1], // Adjust this based on your URL structure
    };
  };
  const { id } = useParams();
  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fileName = "Baptism.json";
        const response = await fetch('http://localhost/api/baptism.php');
        const result = await response.json();
        console.log(result, "res36")
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
    <>
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
      <div class="display-flex justify-center">
        <div class="p-10 w-[21cm] h-[29.7cm] text-left bg-white text-black" id="printable-form">
          <div class="border-b-[6px] border-double border-b-[#333] p-[3px]" align="center">
            <h1 style={{color:"black", fontWeight: "bold", fontSize: "30px" }}>
              St.ANTONY'S CHURCH
            </h1>
            <h3 style={{color:"black", fontWeight: "bold" }}>
              Konnaikudi, Anbil (Via),Trichy-621 702.
            </h3>
          </div>
          <h2 className="bap" align="center" style={{ fontWeight: "bold", fontSize: "20px" }}>
            BAPTISM CERTIFICATE
          </h2>
          <br />


          <div class="relative overflow-x-auto">
            <table class="w-full text-sm border-none  text-left rtl:text-right text-gray-500 dark:text-gray-400">
              
                <tr class="bg-white border-none dark:bg-white dark:border-blue-700">
                  <td class="px-5 py-4 border-none font-medium text-gray-900 whitespace-nowrap dark:text-black">
                    <label>1. Name</label>
                  </td>
                  <td class="dark:text-black border-none">
                    :<input class="dark:text-black w-11/12 border-none border-black" disabled type="text" value={data.name} />
                  </td>
                </tr>
                <tr class="bg-white border-none dark:bg-white dark:border-blue-700">
                  <td class="px-5 py-4 border-none font-medium text-gray-900 whitespace-nowrap dark:text-black">
                    <label>2. Sex</label>
                  </td>
                  <td class="border-none dark:text-black">
                    :<input class="dark:text-black w-11/12 border-none border-black" disabled type="text" value={data.sex} />
                  </td>
                </tr>
                <tr class="bg-white border-none dark:bg-white dark:border-blue-700">
                  <td class="px-5 border-none py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                    <label>3. Date of Birth</label>
                  </td>
                  <td class=" border-none dark:text-black">
                    :<input class="dark:text-black w-11/12 border-none border-black" disabled type="text" value={formatDateForDisplay(data.dateOfBirth)} />
                  </td>
                </tr>
                <tr class="bg-white border-none dark:bg-white dark:border-blue-700">
                  <td class="px-5 border-none py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                    <label>4. Place of Birth</label>
                  </td>
                  <td class=" border-none dark:text-black">
                    :<input class="dark:text-black w-11/12 border-none border-black" disabled type="text" value={data.placeOfBirth} />
                  </td>
                </tr>
                <tr class="bg-white border-none dark:bg-white dark:border-blue-700">
                  <td class="px-5 border-none py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                    <label>5. Date of Baptism</label>
                  </td>
                  <td class=" border-none dark:text-black">
                    :<input class="dark:text-black w-11/12 border-none border-black" disabled type="text" value={formatDateForDisplay(data.dateOfBaptism)} />
                  </td>
                </tr>
                <tr class="bg-white border-none dark:bg-white dark:border-blue-700">
                  <td class="px-5 border-none py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                    <label>6. Place of Baptism</label>
                  </td>
                  <td class=" border-none dark:text-black">
                    :<input class="dark:text-black w-11/12 border-none border-black" disabled type="text" value={data.placeOfBaptism} />
                  </td>
                </tr>
                <tr class="bg-white border-none dark:bg-white dark:border-blue-700">
                  <td class="px-5 border-none py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                    <label>7. Father's Name</label>
                  </td>
                  <td class=" border-none dark:text-black">
                    :<input class="dark:text-black w-11/12 border-none border-black" disabled type="text" value={data.fatherName} />
                  </td>
                </tr>
                <tr class="bg-white border-none dark:bg-white dark:border-blue-700">
                  <td class="px-5 border-none py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                    <label>8. Mother's Name</label>
                  </td>
                  <td class=" border-none dark:text-black">
                    :<input class="dark:text-black w-11/12 border-none border-black" disabled type="text" value={data.motherName} />
                  </td>
                </tr>
                <tr class="bg-white border-none dark:bg-white dark:border-blue-700">
                  <td class="px-5 border-none py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                    <label>9. Residence of Parents</label>
                  </td>
                  <td class=" border-none dark:text-black">
                    :<textarea cols="40" rows="2" class="dark:text-black w-11/12 border-b text-center border-black" disabled type="text" value={data.residence}
                    />
                  </td>
                </tr>
                <tr class="bg-white border-none dark:bg-white dark:border-blue-700">
                  <td class="px-5 border-none py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                    <label>10. Caste</label>
                  </td>
                  <td class=" border-none dark:text-black">
                    :<input class="dark:text-black w-11/12 border-none border-black" disabled type="text" value={data.caste} />
                  </td>
                </tr>
                <tr class="bg-white border-none dark:bg-white dark:border-blue-700">
                  <td class="px-5 border-none py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                    <label>11. Godfather's Name</label>
                  </td>
                  <td class=" border-none dark:text-black">
                    :<input class="dark:text-black w-11/12 border-none border-black" disabled type="text" value={data.godFather} />
                  </td>
                </tr>
                <tr class="bg-white border-none dark:bg-white dark:border-blue-700">
                  <td class="px-5 border-none py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                    <label>12. Godmother's Name</label>
                  </td>
                  <td class=" border-none dark:text-black">
                    :<input class="dark:text-black w-11/12 border-none border-black" disabled type="text" value={data.godMother} />
                  </td>
                </tr>
                <tr class="bg-white border-none dark:bg-white dark:border-blue-700">
                  <td class="px-5 border-none py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                    <label>13. Minister of Baptism</label>
                  </td>
                  <td class=" border-none dark:text-black">
                    :<input class="dark:text-black w-11/12 border-none border-black" disabled type="text" value={data.Minister} />
                  </td>
                </tr>
             
            </table>
          </div>
          <br/>
          <p class="italic text-center">
            Certified that this is a true copy of an entry in the register of
            baptism{" "}
          </p>
          <p class="italic pl-28">kept at <span><input
            disabled
            class="dark:text-black w-9/12 border-none border-black"
            type="text"
            value={data.textArea}
            style={{ fontSize: "16px", fontWeight: "normal" }}
          /></span> </p>

          <br />
          <br />
          <div className="divi">
            <label class="fot">Date: </label>
            <input
              disabled
              class="dark:text-black w-1/5 border-none border-black"
              type="text"
              value={formatDateForDisplay(data.date)} />
            <label class="float-right">Parish Priest</label>
            <br /><br />
            <label class="pl-80">Parish Seal</label>
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default BaptismCertificate;
