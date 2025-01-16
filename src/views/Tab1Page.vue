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


      <ion-label>
        {{ hello }}
      </ion-label>

      <ion-buttons>
        <ion-button @click="testclick">Test Me</ion-button>
      </ion-buttons>



    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButton, IonButtons } from '@ionic/vue';
import { ref } from 'vue';
import tester from '../assets/database/databaseService';



const testclick = async () => {
  await tester();
}

const hello = ref<string>("Hello World");

</script>
