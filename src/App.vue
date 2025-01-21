<script setup lang="ts">
import { IonApp, IonRouterOutlet, onIonViewWillEnter, alertController, onIonViewDidEnter } from '@ionic/vue';
import { InitializeSQLiteDB } from './assets/database/databaseService';
import { useDbConnectStore } from './stores/dbconnectedStore'
const conStateStore = useDbConnectStore(); 

// onIonViewWillEnter( async () => {
//   const checkifentered = await alertController.create({
//     header: 'Entered lifecycle hook',
//     message: 'view will enter, this is for mobile',
//     buttons: ['Close']
//   });
//     await checkifentered.present();

//     console.log('Home page will enter');
//   });

//   onIonViewDidEnter( async () => {
//   const checkifentered = await alertController.create({
//     header: 'Entered lifecycle hook',
//     message: 'view did enter, this is for mobile',
//     buttons: ['Close']
//   });
//     await checkifentered.present();

//     console.log('Home page did enter');
//   });



const initDB = async () => {
  await InitializeSQLiteDB();
  conStateStore.dbConnected();


  // const outcheckifentered = await alertController.create({
  //   header: 'Database',
  //   message: 'database initialized',
  //   buttons: ['Okay']
  // });

  // outcheckifentered.present()


}

initDB();


</script>

<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

