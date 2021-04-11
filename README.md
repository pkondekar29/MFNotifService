# MFNotifService

A micro-service to send notifications for incoming message in queue

# Requirements
- MongoDB to store user subscriptions. 
  - DB name: *mf* and Collection name: *users*
  - Give the connection URL in config/sb-config.json
- Apacha Kafka cluster with topic *mf-orders*

# How to run

- Start MongoDB instance
- Start Kafka Cluster
- Navigate to Project Directory
- Run command 
> **npm run start**<br>
- Sample Order Events Producer used: https://github.com/pkondekar29/kafka-clients/blob/master/producer/src/main/java/com/prometheus/kafka/MFOrderProducer.java

# Model

## User Model 

```javascript
{
    "userName": String,
    "subscription": [
        {
            "type": "email",
            "enabled": Boolean
        },
        {
            "type": "sms",
            "enabled": Boolean
        },
        {
            "type": "whatsapp",
            "enabled": Boolean
        }
    ],
    "emailId": String,
    "mobileNumber": String,
    "name": String
}
```

# Project Structure

**app**:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**routes**: Routing configuration exposed from application<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**controllers**: controllers handling the exposed APIs<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*UserController*: controller to handle user APIs<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**services**:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**broker**: Queue Clients<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Order Consumer*: Kafka consumer to consume each order message<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**notifier**: <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*index.js*: Notification Handler<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Mail Notifier*: Handle notifications through Email<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*SMS Notifier*: Handle notifications through SMS<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*UserService*: Service connected to DB to operate User entity<br>
*index.js*: Entry Point to start application