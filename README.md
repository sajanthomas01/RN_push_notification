# RN_push_notification
 This project shows how to send/show push notification in a react native application with extra data such as custom image,text etc. The notification is send using the firebase notification service and using react-native-fcm library

## Library
1) react-native-fcm
   https://github.com/evollu/react-native-fcm
   
## How to send notification via fcm endpoint
   https://firebase.google.com/docs/cloud-messaging/send-message
   
## Dummy json data
   
   {
    "to": "device_token_retuned_by_firebase_here",
    "data": {
      "custom_notification": {
        "body": "foldos Technologies",
        "title": "teamfoldos",
        "color": "#00ACD4",
        "picture":"http://www.foldos.com/images/im1.png",
        "priority": "high",
        "big_text": "Amat Victoria Curam",
        "icon": "http://www.foldos.com/f1.png",
        "sub_text" :"React native push notif",
        "foreground": true
      }
    }
  }
