import json
import boto3
from botocore.config import Config


def handler(event, context):
    # TODO implement
    
    bucket_name = event['bucket_name']
    object_key = event['object_key']
    
    print(bucket_name, object_key)
    
    source_image = {
        'S3Object': {
            'Bucket': bucket_name,
            'Name': object_key
        }
    }
    
    
    my_config = Config(region_name = 'us-east-1')
    textract = boto3.client('textract',config=my_config)
    
    response = textract.detect_document_text(Document= source_image)
    
    data = ""
    
    for item in response["Blocks"]:
        if item["BlockType"] == "LINE":
            data += item["Text"] + '\n'
        
        
    return {
        'statusCode': 200,
        'body': data,
        'message': "Successfully extracted the text from it"
    }
