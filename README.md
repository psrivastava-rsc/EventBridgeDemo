# Event-based Architecture 
Purpose: To decouple multiple services

## EventBridge
> EventBridge can be considered as **Rule-Driven Event Router** 

What: Works like pub-sub model. EventBridge can stream real-time data from various sources (90+)
Difference with SNS/SQS: 

* SNS/SQS requires polling which means not realtime. EventBridge works like stream.
* [PutEvents](https://docs.aws.amazon.com/AmazonCloudWatchEvents/latest/APIReference/API_PutEvents.html) is limited to 2400 requests per second, 5 targets per rule, and 100 rule per account.
* EventBridge makes connection seamless for an AWS service from an AWS account to another AWS service in a different account. It has a target option as **event bus from another account**
* EventBridge needs SQS to bring resiliency

## Use Cases

1. Events between services (System Based Events) - Say I want to build a system where if an EC2  instance is down, it should reboot and then trigger a Lambda function to store the incident to the DynamoDB table.
2. An employee resigns from an organization and his record is updated in the CRM tool. It needs to trigger different workflows for all approvals as part of an exit checklist. If we use EventBridge, the design will be much simpler. It doesn't need polling or CloudWatch Scheduler.



## Example Application

```js
                                                                                      source: custom.myATMapp
                                                                                      detail-type: transaction
                                                  +----------------------------------+detail:
                                                  |                                  |  location:
                                         +------->+      atmConsumerCase1Fn          |    - "prefix": "MA-"
                                         |        |                                  |
               +-------------------+     |        +----------------------------------+
               |                   |     |
    +--------->+    EventBridge    +-----+        +----------------------------------+
putEvents      |                   |     |        |                                  |
               +-------------------+     +------->+      atmConsumerCase2Fn          |
                                         |        |                                  |
                                         |        +----------------------------------+
                                         |
                                         |        +----------------------------------+
                                         |        |                                  |
                                         +------->+      atmConsumerCase3Fn          |
                                                  |                                  |
                                                  +----------------------------------+

```



## References

* https://aws.amazon.com/eventbridge/faqs/
* 
