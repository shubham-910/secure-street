# SecureStreetCloud

A state-of-the-art online crime reporting tool designed to enhance public safety and streamline the crime reporting process using AWS cloud services.

🔍 **Key Features:**

- **Crime Reporting**: Users can easily report crimes online, providing detailed information to authorities.
- **Facial Recognition**: Integrates AWS Rekognition to match suspect photos with criminal records.
- **Document Processing**: Utilizes AWS Textract to convert FIR document images into editable text formats.
- **Secure Storage**: Employs AWS S3 and KMS for encrypted object storage, ensuring data security.
- **Scalable Architecture**: Implements load balancing and autoscaling features for robust performance.

🛠 **Technologies Used:**

- AWS Lambda
- API Gateway
- Rekognition
- Textract
- S3
- CloudFormation

🔧 **Architecture Overview:**

- **Frontend**: Developed with React, hosted on a public subnet EC2 instance.
- **Backend**: All backend functionalities are powered by AWS Lambda functions, ensuring a serverless and scalable architecture.
- **Security**: Managed via AWS Secrets Manager for credential security and dynamic retrieval.

🔒 **Architectural Pillars:**

**Security:**

- **Private Subnets**: AWS Lambda functions are deployed in private subnets without direct internet access, ensuring enhanced security.
- **VPC Endpoints**: Utilizes VPC Gateway and Interface Endpoints to securely connect to AWS services without exposing data to the internet.
- **Encryption**: Data stored in S3 is encrypted using AWS Key Management Service (KMS).

**Reliability:**

- **Load Balancing**: Ensures high availability and reliability of the application by distributing incoming traffic across multiple instances.
- **Auto Scaling**: Automatically adjusts the number of instances based on traffic load, maintaining performance and minimizing costs.

**Scalability:**

- **Serverless Architecture**: The application is designed using a serverless architecture with AWS Lambda, allowing independent scaling of backend functions.
- **Elasticity**: The infrastructure can quickly scale up or down based on demand, providing flexibility and cost efficiency.

📈 **Goals:**

- To provide a reliable and efficient platform for crime reporting.
- Enhance the use of cloud technologies for better scalability, security, and performance.
