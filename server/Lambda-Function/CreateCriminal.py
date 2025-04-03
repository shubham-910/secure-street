import boto3
import uuid
from datetime import datetime
from botocore.exceptions import ClientError

def lambda_handler(event, context):
    # Initialize a DynamoDB client
    dynamodb = boto3.client('dynamodb')

    try:
        # Extract data from the incoming request body
        name = event.get('name')
        age = event.get('age')
        nationality = event.get('nationality')
        gender = event.get('gender')
        objectKey = event.get('objectKey')

        # Prepare parameters for DynamoDB put operation
        params = {
            'TableName': 'Criminals',
            'Item': {
                'criminalId': {'S': str(uuid.uuid4())},  # Unique identifier for the criminal
                'name': {'S': name},
                'age': {'N': str(age)},
                'nationality': {'S': nationality},
                'gender': {'S': gender},
                'objectKey': {'S': objectKey},
                'createdAt': {'S': datetime.utcnow().isoformat()}
            }
        }

        # Log the parameters for DynamoDB put operation
        print("Parameters for DynamoDB put:", params)

        # Put the item into the DynamoDB table
        dynamodb.put_item(**params)

        # Extract only the values from the Item dictionary
        item_data = {k: list(v.values())[0] for k, v in params['Item'].items()}

        # Prepare the success response
        success_response = {
            'statusCode': 200,
            'message': 'Successfully inserted the criminal',
            'data': item_data
        }

        return success_response

    except ClientError as error:
        # Log and handle the error
        print('Error creating criminal:', error.response['Error']['Message'])
        error_response = {
            'statusCode': 500,
            'error': error.response['Error']['Message']
        }
        return error_response

    except Exception as error:
        # Log and handle general errors
        print('Error creating criminal:', str(error))
        error_response = {
            'statusCode': 500,
            'error': str(error)
        }
        return error_response