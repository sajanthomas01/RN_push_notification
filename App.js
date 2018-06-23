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
            console.log('what i got from server in listener direct', notif);
            console.log('what i got from server in listener ', notif.custom_notification);

            console.log('this needs to be shown', data);

            try {
                console.log(notif.fcm.body)
                FCM.presentLocalNotification({
                    vibrate: 100,
                    title: notif.fcm.body,
                    body: notif.fcm.body,
                    big_text: "Show when notification is expanded",     // Android only
                    sub_text: notif.fcm.body,                   // Android only priority: "high",
                    sound: "bell.mp3",
                    large_icon: "https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg",
                    show_in_foreground: true,
                    group: 'test',
                    targetScreen: 'detail',
                    number: 10
                });

            }
            catch (e) {
                console.log(e)
            }

            try {
                console.log('tray', notif.opened_from_tray);
                if(notif.opened_from_tray === 1){
                    this.props.navigation.navigate('AllNews')
                }
            } catch (e) {
                console.log('tray error ', e)
            }

            try {
                
                var data = JSON.parse(notif.custom_notification);
                FCM.presentLocalNotification({
                    vibrate: 100,
                    title: data.title,
                    body: data.body,
                    big_text: "Show when notification is expanded",     // Android only
                    sub_text: data.sub_text,                      // Android only priority: "high",
                    sound: "bell.mp3",
                    large_icon: "https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg",
                    show_in_foreground: true,
                    group: 'test',
                    targetScreen: 'detail',
                    number: 10
                });

            }
            catch (e) {
                console.log(e)
            }
              
       
        });

    }

  


    render(){
      return(<View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
                  <Text style={{fontWeight:'bold',fontSize:17}}> PUSH NOTIFICATION WITH EXTRA DATA</Text>
            </View>);
    }
    
}




   
 
