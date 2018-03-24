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
  
  ## Notification Listener( data send to the endpoint is shown using this as a local notification)
  
    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
            // optional, do some component related stuff
            console.log('what i got from server in listener ',notif.custom_notification);

            try{
              console.log('inside locals')
              var data = JSON.parse(notif.custom_notification);
              FCM.presentLocalNotification({
                vibrate: 500,
                title: data.title,
                body: data.body,
                color: data.color,
                sub_text:data.sub_text,
                picture: data.picture,
                big_text: data.big_text,
                priority: data.priority,
                
                large_icon: data.icon,
                show_in_foreground: data.forground,
               
                
              });
      

            }catch(e){
              console.log(e)
            }
           // console.log(JSON.parse(notif.custom_notification));
           
        });
        
        
  ## Complete code
  
  import React, { Component , Platform} from 'react';

import {
  Text,
  View,
} from 'react-native';

import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';







// this shall be called regardless of app state: running, background or not running. Won't be called when app is killed by user in iOS
FCM.on(FCMEvent.Notification, async (notif) => {


  // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
  if(notif.local_notification){
    //this is a local notification

    console.log('what i got from   local notif ',notif)
  }


  if(notif.opened_from_tray){
    //iOS: app is open/resumed because user clicked banner
    //Android: app is open/resumed because user clicked banner or tapped app icon
  }
  
});

FCM.on(FCMEvent.RefreshToken, (token) => {
  console.log(token)
  // fcm token may not be available on first load, catch it here
});




export default class Apphome extends Component{

    constructor(props){
        super(props)

    }


    componentDidMount(){

       // iOS: show permission prompt for the first call. later just check permission in user settings
        // Android: check permission in user settings
        FCM.requestPermissions().then(()=>console.log('granted')).catch(()=>console.log('notification permission rejected'));
        
        FCM.getFCMToken().then(token => {
            console.log(token)
            // store fcm token in your server
        });
        
        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
            // optional, do some component related stuff
            console.log('what i got from server in listener ',notif.custom_notification);

            try{
              console.log('inside locals')
              var data = JSON.parse(notif.custom_notification);
              FCM.presentLocalNotification({
                vibrate: 500,
                title: data.title,
                body: data.body,
                color: data.color,
                sub_text:data.sub_text,
                picture: data.picture,
                big_text: data.big_text,
                priority: data.priority,
                
                large_icon: data.icon,
                show_in_foreground: data.forground,
               
                
              });
      

            }catch(e){
              console.log(e)
            }
           // console.log(JSON.parse(notif.custom_notification));
            Alert.alert('hi')
        });
        
        // initial notification contains the notification that launchs the app. If user launchs app by clicking banner, the banner notification info will be here rather than through FCM.on event
        // sometimes Android kills activity when app goes to background, and when resume it broadcasts notification before JS is run. You can use FCM.getInitialNotification() to capture those missed events.
        // initial notification will be triggered all the time even when open app by icon so send some action identifier when you send notification
        FCM.getInitialNotification().then(notif => {
           console.log('initial notif',notif)
        });


        //this block is optional, this just shows a dummy notification whenever you open the app
        FCM.presentLocalNotification({
          vibrate: 500,
          title: 'Hello',
          body: 'Click me to detail page,',
          big_text: "Show when notification is expanded",     // Android only
          sub_text: "This is a subText",                      // Android only priority: "high",
          sound: "bell.mp3",
          large_icon: "https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg",
          show_in_foreground: true,
          group: 'test',
          targetScreen: 'detail',
          number: 10
        });

    }

  


    render(){
      return(<View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
                  <Text style={{fontWeight:'bold',fontSize:17}}> PUSH NOTIFICATION WITH EXTRA DATA</Text>
            </View>);
    }
    
}




   
 
    
