import React, { useState, useEffect } from "react";
import uploadFile from "../services/uploadToS3";
import axios from "axios";
import uuid from "react-uuid";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {URL} from "../constants";
import { AWS_URL } from "../constants";

const ReportCase = () => {
  const [criminalName, setCriminalName] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState(null);
  const [fir, setFir] = useState(null);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [criminalId, setCriminalId] = useState("");
  const [firKey, setFirKey] = useState("");
  const [imageMatched, setImageMatched] = useState("");
  const [currObjKey, setCurrObjKey] = useState();

  useEffect(() => {
    // Update criminalId state when it's received from the server
    if (criminalId !== "") {
      console.log("Criminal ID:", criminalId);
    }
  }, [criminalId]);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    const fileName = uuid();
    const location = "Test/"+fileName;
    console.log(fileName);
    const response = await uploadFile(
      location,
      "crimeb00961220cloud",
      file
    );

    console.log("Response", response);
    console.log("Location : ", location);
    if (location) {
      const payload = {
        bucket_name: "crimeb00961220cloud",
        object_key: location,
      };
      console.log("Payload", payload);
      const response = await axios.post(
        AWS_URL+"/compare-face",
        payload
      );
      console.log("Response : ", response.data);

      if (response.data.success == true) {
        console.log("Face matched");
        const matchedObj = response.data.body.objectKey;
        console.log("Matched obj", matchedObj);
        console.log(AWS_URL);
        const objectPayload = {
          objectKey: matchedObj
        };
        const resp = await axios.post(AWS_URL+"/criminal/objkey", objectPayload);
        const criminalDetails = resp.data.data;

        setCriminalName(criminalDetails.name);
        setAge(criminalDetails.age);
        setNationality(criminalDetails.nationality);
        setGender(criminalDetails.gender);
        setCriminalId(criminalDetails.criminalId);
        console.log(criminalDetails);

        setImageMatched(true);
      } else {
        console.log("Face doesn't match in the database");
        setImageMatched(false);

        const finalLocation = "Criminal-Photos/" + fileName;
        const response = await uploadFile(
            finalLocation,
            "crimeb00961220cloud",
            file
        );
        setCurrObjKey(finalLocation);
      }
      console.log("Uploaded successfully");
    }
  };

  const handleFirChange = async (e) => {
    const file = e.target.files[0];
    const fileName = uuid();

    const location = "Crime-Reports/" + fileName;
    const uploadResponse = await uploadFile(
      location,
      "crimeb00961220cloud",
      file
    );

    const payload = {
      bucket_name: "crimeb00961220cloud",
      object_key: location,
    };

    const response = await axios.post(
      AWS_URL+"/extract-text",
      payload
    );

    console.log("Response of the fir" , response.data);
    console.log(response.data.body);

    setDescription(response.data.body);
    setFirKey(location);

    setFir(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let reportPayload = undefined;
  
    if (!imageMatched) {
      const criminalPayload = {
        name: criminalName,
        age: age,
        nationality: nationality,
        gender: gender,
        objectKey: currObjKey
      };
  
      const response = await axios.post(AWS_URL+"/criminal/create", criminalPayload);
      console.log(response.data);
      console.log("Criminal ID", response.data.data.criminalId);
  
      await setCriminalId(response.data.data.criminalId);

      reportPayload = {
        description: description,
        type: type,
        date: date,
        criminalId: response.data.data.criminalId,
        firKey: firKey
      };

    }
    else{
      reportPayload = {
        description: description,
        type: type,
        date: date,
        criminalId: criminalId,
        firKey: firKey
      };
    }
      console.log(reportPayload);  
      const reportResponse = await axios.post(AWS_URL+"/createReport", reportPayload);
      console.log("Received response from create report : ", reportResponse);
  
      toast.success("Successfully reported the case");
      window.location.reload();

  };
  

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center">Report a Case</h2>

      {imageMatched !== "" && (
        <div className={`text-${imageMatched ? "green" : "red"}-600 mb-4`}>
          {imageMatched
            ? "Image matched in the dataset"
            : "Image not matched in the dataset"}
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-6">Criminal Details</h3>
        <hr className="border-t border-gray-300 my-6" />

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-x-6 mb-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Upload Photo:
              </label>
              <input
                type="file"
                id="photo"
                onChange={handlePhotoChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Criminal Name:
              </label>
              <input
                type="text"
                id="criminalName"
                value={criminalName}
                onChange={(e) => setCriminalName(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 mb-4">
            <div>
              <label
                htmlFor="age"
                className="block text-gray-700 font-semibold mb-1"
              >
                Age:
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
                required
              />
            </div>
            <div>
              <label
                htmlFor="nationality"
                className="block text-gray-700 font-semibold mb-1"
              >
                Nationality:
              </label>
              <input
                type="text"
                id="nationality"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-gray-700 font-semibold mb-1"
            >
              Gender:
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </form>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Report or Crime Details</h3>
        <hr className="border-t border-gray-300 my-6" />

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-x-6 mb-4">
          <div>
              <label
                htmlFor="fir"
                className="block text-gray-700 font-semibold mb-1"
              >
                Upload FIR:
              </label>
              <input
                type="file"
                id="fir"
                onChange={handleFirChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
                required
              />
            </div>
            <div>
              <label
                htmlFor="type"
                className="block text-gray-700 font-semibold mb-1"
              >
                Type:
              </label>
              <input
                type="text"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
                required
              />
            </div>
          </div>

          <div>
              <label
                htmlFor="description"
                className="block text-gray-700 font-semibold mb-1"
              >
                Description:
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
                required
              />
            </div>
          <div className="grid grid-cols-2 gap-x-6 mb-4">
          
            <div>
              <label
                htmlFor="date"
                className="block text-gray-700 font-semibold mb-1"
              >
                Date:
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
                required
              />
            </div>
           
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportCase;
