import boto3
import json

def handler(event, context):
    # Get the bucket name and object key from the event
    bucket_name = event['bucket_name']
    object_key = event['object_key']
    
    
    print(object_key)

    # Initialize the Amazon Rekognition client
    rekognition = boto3.client('rekognition', 'us-east-1')

    # Parameters for face comparison
    source_image = {
        'S3Object': {
            'Bucket': bucket_name,
            'Name': object_key
        }
    }

    # Get a list of all objects in the bucket
    s3 = boto3.resource('s3')
    bucket = s3.Bucket(bucket_name)
    print(bucket.objects)
    for obj in bucket.objects.all():
        # Skip if the object is the same as the source image
        
        
        if(obj.key.split("/")[0]!= "Criminal-Photos") or obj.key[-1] == "/":
            continue
        # if obj.key.split("\")[0] == "Crime-Reports":
        #     continue
        
        print(object_key, obj.key)
        if obj.key == object_key:
            continue

        # Destination image for comparison
        target_image = {
            'S3Object': {
                'Bucket': bucket_name,
                'Name': obj.key
            }
        }
        
        # print(obj)
        
        try:
            response = rekognition.compare_faces(
                SourceImage=source_image,
                TargetImage=target_image,
                SimilarityThreshold=70  # Adjust the similarity threshold as needed
            )
            

            if len(response['FaceMatches']) > 0:
                print(f"Face in {object_key} matches with face in {obj.key} with similarity {response['FaceMatches'][0]['Similarity']}%")
                response = {
                    'message' : "Face in "+ object_key + " matches with face in " + obj.key,
                    'objectKey' : obj.key,
                }
                return {
                    'statusCode' : 200,
                    'body' : response,
                    'success': True,
                    'headers': { 'Access-Control-Allow-Origin' : '*' },
                    'data': event
                }
            else:
                print(f"No match found for face in {object_key} in {obj.key}")
        
        except:
            # print("In exception", e)
            continue

    return {
        'statusCode': 200,
        'body': 'Face comparison completed',
        'failure' : True,
        'headers': { 'Access-Control-Allow-Origin' : '*' },
        'data': event,
        'bucket': event['bucket_name'],
         'object_key' : event['object_key']
    }
