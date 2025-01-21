<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem,
  IonLabel, IonButton, IonButtons, IonInput, IonList, IonSelect, IonSelectOption, alertController
} from '@ionic/vue';
import { ref, computed } from 'vue';
import { db, sqlite, InitializeSQLiteDB } from '../assets/database/databaseService';
import { useDbConnectStore } from '../stores/dbconnectedStore'
const conStateStore = useDbConnectStore();
const isConnected = computed(() => conStateStore.dbConnectState);


//for alert button


interface User {
  id: number;
  username: string;
  active: number;
}
interface Master {
  ADDRESS: string;
}

const username = ref<string>('');
const active = ref<number>(1);
const userlist = ref<User[]>([]);
const masterlist =ref<Master[]>([]);







const inputData = async () => {
  if (isConnected && db.value) {

    console.log(username.value, active.value)
    if (username.value && active.value) {
      const query = `INSERT INTO users (username, active) VALUES (?,?);`;
      const values = [username.value, active.value]

      const result = await db.value?.run(query, values);

      if (result.changes && result.changes.changes && result.changes.changes > 0) {
        const success = await alertController.create({
          header: 'User Creation',
          message: `User ${username.value} Created Successfuly.`,
          buttons: ['Close'],
        });

        await success.present();

        username.value = ''
        active.value = 0

      } else {
        console.log("Failed to insert user!")
        const fail = await alertController.create({
          header: 'User Creation',
          message: `User creation failed.`,
          buttons: ['Close'],
        });

        await fail.present();

      }

    } else {
      console.log("Please Input some Data!")
    }
  } else {
    const noconnection = await alertController.create({
      header: 'Database',
      message: `No Database Connection. ${isConnected}`,
      buttons: ['Close'],
    });

    await noconnection.present();

  }

}

const loadData = async (): Promise<void> => {
  if (!isConnected) {
    console.log("Database is not connected.");
    return;
  }
  try {
    // Query the database
    const accountNumber = '001'
    const result = await db.value?.query('SELECT ADDRESS FROM master WHERE ACC1 = ?', [accountNumber]);

    // Check if result and result.values are available
    if (result?.values) {
      // Map the result values to the User[] type
      masterlist.value = result.values.map((row: any) => ({
        ADDRESS: row.ADDRESS,
        // id: row.id,
        // username: row.username,
        // active: row.active,
      }));

    } else {
      masterlist.value = []; // Fallback if no data is found
    }
  } catch (error) {
    console.error("Failed to load data:", (error as Error).message);
  }
};



//for testing
const closeDatabase = async () => {

  await sqlite.value?.closeConnection("db_meter_reader", false);
  const closeconnecion = await alertController.create({
    header: 'Database',
    message: `Database Closed.`,
    buttons: ['Close'],
  });

  await closeconnecion.present();

}

const openDatabase = async () => {

  await InitializeSQLiteDB();
  const openconnection = await alertController.create({
    header: 'Database',
    message: `Database Opened.`,
    buttons: ['Close'],
  });

  await openconnection.present();

}

const testclick = async () => {

}


const hello = ref<string>("Hello World");

</script>


<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <!-- <ion-item>
          <ion-input label="Username" v-model="username"></ion-input>
        </ion-item>
        <ion-item>
          <ion-select label="Status" placeholder="Activate" v-model="active">
            <ion-select-option value="1">Activate</ion-select-option>
            <ion-select-option value="0">De-Activate</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item>
          <ion-button class="m-3" @click="inputData"><text class="p-2">Save</text></ion-button>

        </ion-item> -->

        <ion-item>
          <ion-button class="m-3" @click="openDatabase"><text class="p-2">Connect DB</text></ion-button>
          <ion-button class="m-3" @click="closeDatabase"><text class="p-2">Close DB</text></ion-button>
        </ion-item>
      </ion-list>


      <ion-list class="mt-5">
        <ion-item>
          <ion-button class="m-3" @click="loadData"><text class="p-2">Show Data</text></ion-button>
        </ion-item>
   
        <ion-item v-for="(item, index) in masterlist" :key="index">
          <ion-label>
            <h2>{{ item.ADDRESS }}</h2>
          </ion-label>
        </ion-item>
      </ion-list>




    </ion-content>
  </ion-page>
</template>