CREATE DATABASE monthlyincomeexpenses;

CREATE TABLE incomeexpenses (
    id SERIAL PRIMARY KEY,
    date VARCHAR(255),
    deskripsi VARCHAR(255),
    tipe VARCHAR(255),
    jumlah REAL
);.

CREATE VIEW sumPemasukan AS SELECT date, SUM(jumlah) AS spemasukan FROM incomeexpenses WHERE tipe = 'Pemasukan' GROUP BY date;

CREATE VIEW sumPengeluaran AS SELECT date, SUM(jumlah) AS spengeluaran FROM incomeexpenses WHERE tipe = 'Pengeluaran' GROUP BY date;

CREATE VIEW sumPemasukanPengeluaran AS SELECT incomeexpenses.date, sumPemasukan.spemasukan AS pemasukan, sumPengeluaran.spengeluaran AS pengeluaran, incomeexpenses.deskripsi AS deskripsi FROM incomeexpenses JOIN sumPemasukan USING(date) JOIN sumPengeluaran USING(date);

INSERT INTO incomeexpenses (date, deskripsi, tipe, jumlah) VALUES('July 2020', 'ADD', 'Pemasukan', 0.0);