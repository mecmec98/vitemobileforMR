import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';


const tester = async () => {

    const platform = Capacitor.getPlatform();
    const sqlite = new SQLiteConnection(CapacitorSQLite);

    try {
        console.log(`platform: ${platform}`);

        //for web testing
        if (platform === "web") {
            // Create Jeep-sqlite stencil
            const jeepSqliteEl = document.createElement('jeep-sqlite');
            document.body.appendChild(jeepSqliteEl);
            await customElements.whenDefined('jeep-sqlite');
            console.log('after customeElemnts.whenDefined');

            //Initialize the Web Store
            await sqlite.initWebStore();
            console.log('after initWebstore');

        }

        //database check
        const ret = await sqlite.checkConnectionsConsistency();
        const isConn = (await (sqlite.isConnection("db_vite", false))).result;
        let db = null;
        if (ret.result && isConn) {
            db = await sqlite.retrieveConnection("db_vite", false);
        } else {
            db = await sqlite.createConnection("db_vite", false, "no-encryption", 1, false);
        }

        await db.open();
        console.log(`db: db_vite opened`);
        const query = `
           CREATE TABLE IF NOT EXISTS test (
           id INTEGER PRIMARY KEY NOT NULL,
           name TEXT NOT NULL
           );
           `

        const res = await db.execute(query);
        console.log(`res: ${JSON.stringify(res)}`);
        if (res.changes && res.changes.changes && res.changes.changes < 0) {
            throw new Error(`Error: execute failed`);
        }
        await sqlite.closeConnection("db_vite", false);
        console.log("test finished")

    } catch (error) {
        console.log((error as any).message);
    }

}

export default (tester)