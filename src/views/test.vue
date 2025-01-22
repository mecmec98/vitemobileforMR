<!-- <template>
    <div>
      <input type="file" @change="handleFileUpload" accept=".db" />
    </div>
  </template>
  
  <script lang="ts">
  import { Capacitor } from '@capacitor/core';
  import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
  import { Filesystem, Directory } from '@capacitor/filesystem';
  import { alertController } from '@ionic/vue';
  import { ref } from 'vue';
  
  const db = ref<SQLiteDBConnection>();
  const sqlite = ref<SQLiteConnection>();
  
  export default {
    setup() {
      const handleFileUpload = async (event: Event) => {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
          const file = input.files[0];
          const reader = new FileReader();
  
          reader.onload = async (e) => {
            const arrayBuffer = e.target?.result as ArrayBuffer;
            const data = new Uint8Array(arrayBuffer);
  
            try {
              await Filesystem.writeFile({
                path: 'uploaded_meter_reader.db',
                data: data,
                directory: Directory.Data,
              });
  
              console.log('Database file uploaded and written to app data directory');
  
              sqlite.value = new SQLiteConnection(CapacitorSQLite);
              db.value = await sqlite.value.createConnection('uploaded_meter_reader', false, 'no-encryption', 1, false);
              await db.value?.open();
              console.log('Database opened');
  
            } catch (error: any) {
              const cantconnect = await alertController.create({
                header: 'Database Error',
                message: `An error occurred: ${error?.message || 'Unknown error'}`,
                buttons: ['Close'],
              });
  
              await cantconnect.present();
            }
          };
  
          reader.readAsArrayBuffer(file);
        }
      };
  
      return { handleFileUpload };
    }
  };
  </script>
   -->