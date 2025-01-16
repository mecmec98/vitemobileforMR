import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { ref } from 'vue'

const platform = Capacitor.getPlatform();

const db = ref<SQLiteDBConnection>()
const sqlite = ref<SQLiteConnection>();


const InitializeSQLiteDB = async () => {
    try {
        sqlite.value = new SQLiteConnection(CapacitorSQLite)
        const ret = await sqlite.value.checkConnectionsConsistency();
        const isConn = (await (sqlite.value.isConnection("db_meter_reader", false))).result;


        if (ret.result && isConn) {
            db.value = await sqlite.value.retrieveConnection("db_meter_reader", false);
        } else {
            db.value = await sqlite.value.createConnection("db_meter_reader", false, "no-encryption", 1, false);
        }

        await db.value.open()
        const query = `
           CREATE TABLE IF NOT EXISTS user (
           id INTEGER PRIMARY KEY NOT NULL,
           username TEXT NOT NULL
           );
           `

        const res = await db.value.execute(query);

        //console.log(`res: ${JSON.stringify(res)}`);
        if (res.changes && res.changes.changes && res.changes.changes < 0) {
            throw new Error(`Error: execute failed`);
        }

        //await sqlite.closeConnection("db_vite", false);


    } catch (error) {
        console.log((error as any).message)
    }
}

export default (InitializeSQLiteDB)