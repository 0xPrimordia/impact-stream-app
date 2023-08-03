const Dexie = require("dexie");

const db = new Dexie("impact-stream-data");
db.version(1).stores({
 users: "id, name, family_name",
 proposals: "id, author_id, title",
});

async function clearTableData(tableName) {
 await db.open();
 await db.table(tableName).clear();
 db.close();
}

async function writeTableData(tableName, data) {
 await db.open();
 await db.table(tableName).bulkAdd(data);
 db.close();
}

module.exports = {
 db,
 clearTableData,
 writeTableData,
};
