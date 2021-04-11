# MFNotifService

A micro-service to send notifications for incoming message in queue

# Requirements
1. MongoDB
2. Apacha Kafka cluster

# How to run

  - Navigate to project directory
  - Run command 
  > **npm run start**<br>

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

**app**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**routes**: Configure exposed routes of application<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**controllers**: Controllers handling the exposed APIs<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*UserController*: Controller for user APIs<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**services**:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**broker**: Clients of Kafka Queue<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Order Consumer*: Consumer consuming each message and sending notifications<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**notifier**: <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*index.js*: Abstract notification layer<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Mail Notifier*: Send notifications by Email<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*SMS Notifier*: Send notifications by SMS<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*UserService*: Service connected to DB to operate User entity<br>
*index.js*: Entry Point to start application