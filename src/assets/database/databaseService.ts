import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { alertController } from '@ionic/vue';
import { ref } from 'vue'

const platform = Capacitor.getPlatform();

//initialize variables for connection
//for database
const db = ref<SQLiteDBConnection>()
//for sqlite connection
const sqlite = ref<SQLiteConnection>();

const InitializeSQLiteDB = async () => {
    try {

        const options = {
            overwrite: true,         // Set to false if you want to avoid overwriting an existing database
        };


        //give sqlite connection value
        sqlite.value = new SQLiteConnection(CapacitorSQLite)
        //copy database from assets folder in android
        // await CapacitorSQLite.copyFromAssets(options);
        // console.log('database copied')

        //check connection consistency



        //create the connection
        console.log('check me')
        const dbName = 'MRADB.dbi'
        db.value = await sqlite.value.createConnection(dbName, false, 'no-ecryption', 1, false);
        const ret = await sqlite.value.checkConnectionsConsistency();
        if (ret.result) {
            console.log(db.value)
            //open the database
            await db.value?.open();
            console.log('db opened')

        } else {

            throw console.error();

        }
        //create table for testing
        // console.log("Database Connection Open!")

        // const query = `
        //    CREATE TABLE IF NOT EXISTS users (
        //    id INTEGER PRIMARY KEY NOT NULL,
        //    username TEXT NOT NULL,
        //    active INTEGER NOT NULL DEFAULT 0
        //    );
        //    `

        // const res = await db.value?.execute(query);

        // //console.log(`res: ${JSON.stringify(res)}`);
        // if (res.changes && res.changes.changes && res.changes.changes < 0) {
        //     throw new Error(`Error: execute failed`);
        // }
        // console.log("Users table Created")

        //await sqlite.closeConnection("db_vite", false);

    } catch (error: any) {
        // Display the error message in an alert
        const cantconnect = await alertController.create({
            header: 'Database Error',
            message: `An error occurred: ${error?.message || 'Unknown error'}`,  // Display error message
            buttons: ['Close'],
        });

        await cantconnect.present();

    }
}


export { InitializeSQLiteDB, db, sqlite }