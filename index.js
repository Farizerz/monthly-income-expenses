const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db.js");

//middleware
app.use(cors());
app.use(express.json()); //req.body


//QUERY CRUD

//SELECT sumPemasukanPengeluaran
app.get("/incomeexpenses/all", async (req, res) => {
    try {
        const selectAllView = await pool.query("SELECT date, pemasukan, pengeluaran, (COALESCE(pemasukan, 0) - COALESCE(pengeluaran, 0)) AS Total FROM sumPemasukanPengeluaran WHERE deskripsi != 'ADD' GROUP BY date, pemasukan, pengeluaran");
        res.json(selectAllView.rows);
    } catch (err) {
        console.error(err);
    }
});

//SELECT incomeexpenses

app.get("/incomeexpenses/:date", async (req, res) => {
    try {
        const { date } = req.params;
        const selectAll = await pool.query(`SELECT * FROM incomeexpenses WHERE (date = '${[date]}' AND deskripsi != 'ADD')`);
        res.json(selectAll.rows);
        console.log(date);
    } catch (err) {
        console.error(err);
    }
}); 

//insert Inisialisasi
app.post("/incomeexpenses/incomeinit", async (req, res) => {
    try {
        const { date } = req.body;
        const incomeInit = await pool.query(`INSERT INTO incomeexpenses (date, deskripsi, tipe, jumlah) 
                                             SELECT '${[date]}', 'ADD','Pemasukan', 0 
                                             WHERE NOT EXISTS (SELECT date, deskripsi, tipe, jumlah FROM incomeexpenses 
                                                               WHERE (date='${date}' AND deskripsi='ADD' AND tipe='Pemasukan')
                                                              )
                                            RETURNING *`);
        res.json(incomeInit.rows);
    } catch (err) {
        console.error(err);
    }
});

app.post("/incomeexpenses/expensesinit", async (req, res) => {
    try {
        const { date } = req.body;
        const expensesInit = await pool.query(`INSERT INTO incomeexpenses (date, deskripsi, tipe, jumlah) 
                                               SELECT '${[date]}', 'ADD','Pengeluaran', 0 
                                               WHERE NOT EXISTS (SELECT date, deskripsi, tipe, jumlah FROM incomeexpenses 
                                                                 WHERE (date='${date}' AND deskripsi='ADD' AND tipe='Pengeluaran')
                                                                )
                                              RETURNING *`);
        res.json(expensesInit.rows);
    } catch (err) {
        console.error(err);
    }
});

//insert 
app.post("/incomeexpenses/insertdata", async (req, res) => {
    try {
        const { date, description, type, amount } = req.body;
        const insertData = await pool.query(`INSERT INTO incomeexpenses (date, deskripsi, tipe, jumlah) VALUES('${[date]}', '${[description]}','${[type]}', ${[amount]}) RETURNING *`);
        res.json(insertData.rows[0]);
    } catch (err) {
        console.error(err);
    }
});

//edit / update
app.put("/incomeexpenses/editdata/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description, type, amount } = req.body;
        const insertData = await pool.query(`UPDATE incomeexpenses SET deskripsi ='${[description]}', tipe='${[type]}', jumlah='${[amount]}' WHERE id = '${[id]}'`);
        res.json(id + " Updated!");
    } catch (err) {
        console.error(err);
    }
});

//delete
app.delete("/incomeexpenses/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteData = await pool.query(`DELETE FROM incomeexpenses WHERE id = ${[id]}`);
        res.json(id + " Deleted!");
    } catch (err) {
        console.error(err);
    }
});

//delete all
app.get("/incomeexpenses/delete/:date", async (req, res) => {
    try {
        const { date } = req.params;
        const deleteAll = await pool.query(`DELETE FROM incomeexpenses WHERE date = '${[date]}'`);
        res.json(date + " Deleted!");
        //console.log(date + " From Delete Query");
    } catch (err) {
        console.error(err);
    }
});

app.get('/incomeexpense/coba', function (req, res) {
    res.send('Hello dickhead!')
  })

//listen
app.listen(5000, () => {
    console.log("PORT 5000 Started!");
});