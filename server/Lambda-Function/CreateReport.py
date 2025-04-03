import boto3
from botocore.exceptions import ClientError
from datetime import datetime
import uuid

dynamodb = boto3.client('dynamodb')

def lambda_handler(event, context):
    try:
        # print(event['body'])
        
        # # Extracting the fields directly from the body
        # body = event['body']
        description = event['description']
        report_type = event['type']
        date = event['date']
        criminalId = event['criminalId']
        firKey = event['firKey']
        
        # Prepare parameters for DynamoDB put operation
        params = {
            'TableName': 'Report',
            'Item': {
                'criminalId': {'S': criminalId},
                'reportId': {'S': str(uuid.uuid4())},
                'description': {'S': description},
                'type': {'S': report_type},
                'date': {'S': date},
                'firKey': {'S': firKey},
                'createdAt': {'S': datetime.utcnow().isoformat()}
            }
        }

        # Put the item into DynamoDB
        dynamodb.put_item(**params)
        
        # Prepare success response
        success_response = {
            'message': "Successfully inserted the criminal report",
            'data': params['Item']
        }
        
        return {
            'statusCode': 200,
            'body': success_response
        }
        
    except ClientError as error:
        print(error)
        error_response = {
            'error': error.response['Error']['Message']
        }
        return {
            'statusCode': 500,
            'body': error_response
        }
    
    except Exception as error:
        print(error)
        error_response = {
            'error': str(error)
        }
        return {
            'statusCode': 500,
            'body': error_response
        }