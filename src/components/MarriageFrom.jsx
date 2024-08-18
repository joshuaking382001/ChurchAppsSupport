import React, { useEffect, useState } from "react";
import './mform.css';
import img from '../app/img/mform.jpg';
import { useLocation, useNavigate, useParams } from "react-router-dom";

const MarriageForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Date formatting functions
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return ""; // Handle empty or undefined date
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const [data, setData] = useState({});

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fileName = "MarriageForm.json";
        const response = await fetch('http://localhost/api/marriageform.php');
        const result = await response.json();
        const formData = result.find((val) => val.id === id);
        if (formData) {
          setData(formData);
        } else {
          console.error(`No data found for id: ${id}`);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, [id]);

  // Print functionality
  const handlePrint = () => {
    window.print();
  };

  // Navigate to home
  const handleHome = () => {
    navigate("/");
  };

  console.log("Data:", data);

  return (
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
      <div className="pl-10 pt-5 pr-10 w-[29.7cm] h-[21cm] text-left bg-white text-black" id="printable-form">
        <div className="head" align="center">
          <h1 style={{ color: "black", fontWeight: "bold", fontSize: "30px" }}>
            ST. ANTONY'S CHURCH
          </h1>
          <br />
          <h3 style={{ color: "black", fontWeight: "bold" }}>
            Konnaikudi, Anbil (Via), Trichy-621 702.
          </h3>
          <br />
        </div>
        <table className="border-none">
          <tbody>
            <tr className="border-none">
              <td className="border-none">
                <label>Our Ref. No.</label>
              </td>
              <td className="border-none">
                <input disabled className="foot" type="text" value={data.refno || ''} />
              </td>
              <td className="lab border-none">
                <label>Date:</label>
              </td>
              <td className="border-none">
                <input
                  disabled
                  className="foot"
                  type="text"
                  value={formatDateForDisplay(data.date) || ''}
                />
              </td>
            </tr>
            <tr className="border-none">
              <td className="border-none">
                <label>Parish</label>
              </td>
              <td className="border-none">
                <input disabled className="foot" type="text" value={data.parish || ''} />
              </td>
              <td className="border-none">
                <label className="lab">Your Ref. No.</label>
              </td>
              <td className="border-none">
                <input disabled className="foot" type="text" value={data.yourRefNo || ''} />
              </td>
            </tr>
            <tr className="border-none">
              <td className="border-none" colSpan="2">
                <label>Dear. Rev. Father</label>
                <img src={img} alt="form text" />
              </td>
              <td className="border-none">
                <label>Diocese</label>
              </td>
              <td className="border-none">
                <input disabled className="foot" type="text" value={data.dioces || ''} />
              </td>
            </tr>
          </tbody>
        </table>
        <table className="border-none">
          <tbody>
            <tr className="border-none">
              <td className="label border-none">
                <label>Mr.</label>
              </td>
              <td className="line border-none">
                <input disabled className="text" type="text" value={data.mr || ''} />
              </td>
              <td className="label border-none">
                <label>With</label>
              </td>
              <td className="border-none">
                <input
                  disabled
                  className="text"
                  type="text"
                  value={data.daughterwith || ''}
                />
              </td>
            </tr>
            <tr className="border-none">
              <td className="label border-none">
                <label>Son of</label>
              </td>
              <td className="line border-none">
                <input disabled className="text" type="text" value={data.soneOf || ''} />
              </td>
              <td className="label border-none">
                <label>Daughter of</label>
              </td>
              <td className="border-none">
                <input
                  disabled
                  className="text"
                  type="text"
                  value={data.daughterOf || ''}
                />
              </td>
            </tr>
            <tr className="border-none">
              <td className="label border-none">
                <label>From</label>
              </td>
              <td className="line border-none">
                <input disabled className="text" type="text" value={data.from || ''} />
              </td>
              <td className="label border-none">
                <label>From</label>
              </td>
              <td className="border-none">
                <input
                  disabled
                  className="text"
                  type="text"
                  value={data.daughterfrom || ''}
                />
              </td>
            </tr>
            <tr className="border-none">
              <td className="label border-none">
                <label>of the parish of</label>
              </td>
              <td className="line border-none">
                <input
                  disabled
                  className="text"
                  type="text"
                  value={data.oftheparishof || ''}
                />
              </td>
              <td className="label border-none">
                <label>of the parish of</label>
              </td>
              <td className="border-none">
                <input
                  disabled
                  className="text"
                  type="text"
                  value={data.daughteroftheparishof || ''}
                />
              </td>
            </tr>
            <tr className="border-none">
              <td className="label border-none">
                <label>in the Diocese of</label>
              </td>
              <td className="line border-none">
                <input disabled className="text" type="text" value={data.dioces || ''} />
              </td>
              <td className="label border-none">
                <label>in the Diocese of</label>
              </td>
              <td className="border-none">
                <input
                  disabled
                  className="text"
                  type="text"
                  value={data.daughterdioces || ''}
                />
              </td>
            </tr>
            <tr className="border-none">
              <td className="label border-none">
                <label>Born on</label>
              </td>
              <td className="line border-none">
                <input disabled className="text" type="text" value={data.bornOn || ''} />
              </td>
              <td className="label border-none">
                <label>Born on</label>
              </td>
              <td className="border-none">
                <input
                  disabled
                  className="text"
                  type="text"
                  value={data.daughterbornOn || ''}
                />
              </td>
            </tr>
            <tr className="border-none">
              <td className="label border-none">
                <label>Baptized at</label>
              </td>
              <td className="line border-none">
                <input disabled className="text" type="text" value={data.baptized || ''} />
              </td>
              <td className="label border-none">
                <label>Baptized at</label>
              </td>
              <td className="border-none">
                <input
                  disabled
                  className="text"
                  type="text"
                  value={data.daughterbaptized || ''}
                />
              </td>
            </tr>
            <tr className="border-none">
              <td className="label border-none">
                <label>On</label>
              </td>
              <td className="line border-none">
                <input disabled className="text" type="text" value={data.on || ''} />
              </td>
              <td className="label border-none">
                <label>On</label>
              </td>
              <td className="border-none">
                <input
                  disabled
                  className="text"
                  type="text"
                  value={data.daughteron || ''}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <div align="center">
          <label>Impediment</label>
          <input disabled className="imp" type="text" value={data.impediment || ''} />
        </div>
        <div className="before">
          <label>Banns will be published in this parish on I</label>
          <input disabled className="foo" type="text" value={data.banns || ''} />
          <label>II</label>
          <input disabled className="foo" type="text" value={data.bannsSecond || ''} />
          <label>III</label>
          <input disabled className="foo" type="text" value={data.bannsThird || ''} />
        </div>
        <div className="before">
          <label>Marriage is to be celebrated on</label>
          <input disabled className="w-3/4" type="text" value={data.celebration || ''} />
        </div>
        <div>
          <label className="pl-36">
            at
            <span>
              <input className="w-3/4" type="text" value={data.format || ''} />
            </span>
          </label>
        </div>
        <br />
        <p>
          With Kind Regards 
          <span>
            <p className="float-right">Yours in the Lord</p>
          </span>
        </p>
        <p align="center">(Seal)</p>
        <p className="float-right">Parish Priest</p>
      </div>
    </div>
  );
};

export default MarriageForm;
