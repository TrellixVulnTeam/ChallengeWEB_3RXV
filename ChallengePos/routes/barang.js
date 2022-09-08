var express = require('express');
var router = express.Router();
var pool = require('pg')
var moment = require('moment')

module.exports = function (pool) {



  /* GET home page. */
  router.get('/barang', async function (req, res) {
    try {
      let sql = 'SELECT * FROM barang'
      const get = await pool.query(sql)
      res.status(200).json(get)
    } catch (error) {
      res.status(500).json({message: "error tampilkan data"})
    }
  })

  router.post('/barang', async function (req, res) {
    try {
      let sql = `INSERT INTO ch21 (id_barang, nama_barang) VALUES ($1,$2)`
      const post = await pool.query(sql, [req.body.id_barang, req.body.nama_barang]) [req.body.id_barang, req.body.nama_barang]
      res.status(200).json(post)
    } catch (error) {
      res.status(500).json({ message: "error add barang" })
    }
  });

  router.get('/barang/:id_barang', async function (req, res) {
    try {
      let id = req.params.id_barang
      let sql = 'SELECT * FROM barang WHERE id_barang= $1'
      const editGet = await pool.query(sql, [id])
      res.status(200).json(editGet)
    } catch (error) {
      res.status(500)
    }
  })

  router.put('/barang/:id_barang', async function (req, res) {
    try {
      let sql = `UPDATE ch21 SET 
      nama_barang = $1,
      WHERE id_barang = $2`

      const edit = await pool.query(sql,
        [req.body.nama_barang,
        req.params.id_barang]);

      res.status(200).json(edit)
    } catch (error) {
      res.status(500).json({ message: "error edit barang" })
    }
  })

  router.delete('/barang/:id_barang', async function (req, res) {
    try {
      let id = req.params.id_barang
      let sql = `DELETE FROM barang WHERE id_barang= $1`;

      const hapus = await pool.query(sql, [id])
      res.status(200).json(hapus)
    } catch (error) {
      res.status(500)
    }

  })

  return router;
}
