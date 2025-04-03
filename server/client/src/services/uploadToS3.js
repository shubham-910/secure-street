import { v4 as uuid } from 'uuid';
import { AWS_URL } from "../constants";


const uploadFile = async (objectKey, bucketName, file) => {
    // Create a FileReader to read the file
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onloadend = async () => {
            try {
                // Read the file as a data URL and extract the base64 encoded content
                const base64FileContent = reader.result.split(',')[1];

                const response = await fetch(AWS_URL + "/upload", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        bucket_name: bucketName,
                        object_key: objectKey,
                        file_content: base64FileContent,
                    }),
                });

                const result = await response.json();
                if (response.ok) {
                    resolve(result);
                } else {
                    reject(new Error(result.error || 'Failed to upload file'));
                }
            } catch (error) {
                reject(error);
            }
        };

        // Read the file as a data URL (this triggers the onloadend event)
        reader.readAsDataURL(file);
    });
};

export default uploadFile;
// import S3 from './s3';

// const uploadFile = async (fileName, bucketName, fileContent) => {
//   return new Promise((resolve, reject) => {
//     const params = {
//       Bucket: "crimeb00961220cloud",
//       Key: fileName,
//       Body: fileContent,
//     };

//     S3.upload(params, (err, data) => {
//       if (err) {
//         console.error("Error uploading file:", err);
//         reject(err);
//       } else {
//         console.log(`File uploaded successfully. ${data.Location}`);
//         resolve(params.Key);
//       }
//     });
//   });
// };

// export default uploadFile;

// import axios from 'axios';

// const uploadFile = async (fileName, bucketName, fileContent) => {
//   const payload = {
//     fileName,
//     bucketName,
//     fileContent: fileContent.toString('base64'), // Convert file content to base64
//   };

//   try {
//     const response = await axios.post('', payload);
//     return response.data.Location;
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     throw error;
//   }
// };

// export default uploadFile;
