import json
import base64
import boto3
from botocore.exceptions import ClientError

s3 = boto3.client('s3')

def lambda_handler(event, context):
    try:
        bucket_name = event['bucket_name']
        object_key = event['object_key']
        file_content = event['file_content']
    except KeyError as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': f'Missing parameter: {str(e)}'})
        }

    file_content = base64.b64decode(file_content)

    try:
        s3.put_object(Bucket=bucket_name, Key=object_key, Body=file_content)
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'File uploaded successfully'})
        }
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
