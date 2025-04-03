# Online Crime Reporting Tool - AWS Cloud Solution

A modern, cloud-based platform for reporting crimes securely and efficiently, leveraging AWS serverless services to ensure scalability, security, and performance.

---

## 🔍 Key Features  
- **Online Crime Reporting**: Streamlined form for users to submit crime details.  
- **Facial Recognition**: AWS Rekognition integration to match suspect photos with criminal databases.  
- **Document Processing**: Automated extraction of text from FIR documents using AWS Textract.  
- **Secure Storage**: Encrypted storage with AWS S3 and KMS.  
- **Scalable Backend**: Serverless architecture with AWS Lambda and API Gateway.  

---

## 🛠 Technologies Used  
- **Frontend**: React (hosted on EC2).  
- **Backend**: AWS Lambda, API Gateway, Secrets Manager.  
- **AI/ML**: AWS Rekognition, Textract.  
- **Infrastructure**: CloudFormation (IaC), S3, VPC, KMS.  
- **Security**: IAM(Zero trust environment)

---

## ☁️ Cloud Architectural Pillars  

### **1. Operational Excellence**  
- **Infrastructure as Code (IaC)**: Deploy and manage resources using CloudFormation templates for consistency and repeatability.  
- **Automated Workflows**: Serverless Lambda functions handle backend logic without manual intervention.  
- **Monitoring**: Integrated with AWS CloudWatch for logging and performance tracking.  

### **2. Security**  
- **Private Network Isolation**: Lambda functions run in private subnets with no direct internet access.  
- **Encryption**: Data encrypted at rest (S3 + KMS) and in transit (HTTPS/TLS).  
- **Secure Credentials**: AWS Secrets Manager for dynamic secret storage and retrieval.  
- **VPC Endpoints**: Secure connectivity to AWS services without exposing data to the public internet.  

### **3. Reliability**  
- **Load Balancing**: Distributes traffic across instances to prevent downtime.  
- **Auto Scaling**: Automatically adjusts EC2 capacity based on demand.  
- **High Availability**: Multi-AZ deployment for critical services.  

### **4. Cost Optimization**  
- **Serverless Architecture**: Pay-per-use pricing with AWS Lambda (charges only when functions run).  
- **Auto Scaling**: Reduces costs by scaling down during low traffic.  
- **Managed Services**: Eliminates operational overhead (e.g., S3, Lambda, Rekognition).  

---

## 📈 Goals  
- Provide a fast, secure, and user-friendly platform for crime reporting.  
- Leverage AWS cloud services to ensure scalability, reliability, and cost-efficiency.  
- Enhance public safety through automation and AI-powered tools.  

---

## 🔧 Architecture Overview  
- **Frontend**: React app hosted on an EC2 instance (public subnet).  
- **Backend**: API Gateway routes requests to Lambda functions (private subnet).  
- **Data Layer**: S3 for documents, Rekognition for facial recognition, Textract for text extraction.  