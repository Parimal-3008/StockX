const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const usernmame = req.body.username;
    const password = req.body.password;
    const q2 = await pool.query("SELECT * FROM users WHERE username = $1", [
      usernmame,
    ]);
    if (q2.rowCount > 0) {
      res.json("username already taken Select new Username");
    } else {
      const q1 = await pool.query(
        "INSERT INTO users(username,password,balance) VALUES($1,$2,$3)",
        [usernmame, password, 100000]
      );
      res.json(q1.rows);
    }
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    const q1 = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (q1.rowCount == 0) {
      res.json("Invalid username");
    } else {
      if (q1.rows[0].password == password) res.json("Login succesfull");
      else res.json("Invalid password");
    }
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/buy_sell", async (req, res) => {
  // console.log(req.body);
  const username = req.body.username;
  const qid = await pool.query("SELECT * FROM users WHERE username=$1", [
    username,
  ]);
  const id = qid.rows[0].id;
  const balance = qid.rows[0].balance;
  // console.log(id);
  const stockname = req.body.stockname;
  const quantity = req.body.quantity;
  const st = req.body.status; //buy or sell
  const current_price = req.body.current_price;
  console;
  if (st == "buy") {
    const q1 = await pool.query("SELECT * FROM holdings WHERE id=$1", [id]);
    console.log(q1);
    if (q1.rowCount > 0) {
      let present = null;
      for (let i in q1.rows) {
        if (q1.rows[i].stockname == stockname) {
          present = i;
          break;
        }
      }
      if (present != null) {
        // update in database

        if (balance >= current_price * quantity) {
          const q3 = await pool.query(
            "UPDATE holdings SET quantity=$1, total_price=$2 WHERE id=$3 AND stockname=$4",
            [
              q1.rows[present].quantity + quantity,
              q1.rows[present].total_price + quantity * current_price,
              id,
              stockname,
            ]
          );
          const q4 = await pool.query(
            "INSERT INTO history(id,status,stockname,quantity,sp,date) VALUES($1,$2,$3,$4,$5,$6)",
            [id, st, stockname, quantity, 1000, await new Date()]
          );
          const q5 = await pool.query(
            "UPDATE users SET balance=$1 WHERE id=$2",
            [balance - current_price * quantity, id]
          );
          res.json("bought ");
        } else {
          res.json("NOT enough funds");
        }
      } else {
        // inserting in db

        if (balance >= current_price * quantity) {
          const q3 = await pool.query(
            "INSERT INTO holdings(id,stockname,quantity,total_price) VALUES($1,$2,$3,$4)",
            [id, stockname, quantity, current_price * quantity]
          );
          const q4 = await pool.query(
            "INSERT INTO history(id,status,stockname,quantity,sp,date) VALUES($1,$2,$3,$4,$5,$6)",
            [id, st, stockname, quantity, 1000, await new Date()]
          );
          const q5 = await pool.query(
            "UPDATE users SET balance=$1 WHERE id=$2",
            [balance - current_price * quantity, id]
          );
          res.json("inserted");
        } else {
          res.json("Not enough funds");
        }
      }
    } else {
      if (balance >= current_price * quantity) {
        const q2 = await pool.query(
          "INSERT INTO holdings(id,stockname,quantity,total_price) VALUES($1,$2,$3,$4)",
          [id, stockname, quantity, current_price * quantity]
        );
        const q4 = await pool.query(
          "INSERT INTO history(id,status,stockname,quantity,sp,date) VALUES($1,$2,$3,$4,$5,$6)",
          [id, st, stockname, quantity, 1000, await new Date()]
        );
        const q5 = await pool.query("UPDATE users SET balance=$1 WHERE id=$2", [
          balance + current_price * quantity,
          id,
        ]);
        res.json("Buyed Successfully");
      } else {
        res.json("NOT enough funds");
      }
    }
  } else if (st == "sell") {
    const q1 = await pool.query("SELECT * FROM holdings WHERE id=$1", [id]);
    console.log(q1.rows);
    if (q1.rowCount == 0) {
      res.json("Never purchased");
    } else {
      let present = null;

      for (let i in q1.rows) {
        if (q1.rows[i].stockname == stockname) {
          present = i;
          break;
        }
      }
      console.log(present);
      if (present == null) {
        res.json("Never bought this stock");
      } else {
        if (q1.rows[present].quantity < quantity) res.json("Not enough stocks");
        else {
          const q3 = await pool.query(
            "UPDATE holdings SET quantity=$1,total_price=$4 WHERE id=$2 AND stockname=$3",
            [
              q1.rows[present].quantity - quantity,
              id,
              stockname,
              Math.max(
                0,
                q1.rows[present].total_price - current_price * quantity
              ),
            ]
          );
          const q4 = await pool.query(
            "INSERT INTO history(id,status,stockname,quantity,sp,date) VALUES($1,$2,$3,$4,$5,$6)",
            [id, st, stockname, quantity, 1000, await new Date()]
          );
          const q5 = await pool.query(
            "UPDATE users SET balance=$1 WHERE id=$2",
            [balance + current_price * quantity, id]
          );
          res.json("selled ");
        }
      }
    }
  }
});

app.get("/portfolio", async (req, res) => {
  const username = req.body.username;
  const qid = await pool.query("SELECT * FROM users WHERE username=$1", [
    username,
  ]);
  const id = qid.rows[0].id;
  const balance = qid.rows[0].balance;
  const q1 = await pool.query("SELECT * FROM holdings WHERE id=$1", [id]);

  res.json(q1.rows);
});

app.get("/history", async (req, res) => {
  const username = req.body.username;
  const qid = await pool.query("SELECT * FROM users WHERE username=$1", [
    username,
  ]);
  const id = qid.rows[0].id;
  const balance = qid.rows[0].balance;
  const q1 = await pool.query("SELECT * FROM history WHERE id=$1", [id]);
  res.json(q1.rows);
});

app.delete("/delete", async (req, res) => {
  const username = req.body.username;
  const qid = await pool.query("SELECT * FROM users WHERE username=$1", [
    username,
  ]);
  const id = qid.rows[0].id;
  const balance = qid.rows[0].balance;
  const q1 = await pool.query("DELETE FROM holdings WHERE id=$1", [id]);
  const q2 = await pool.query("DELETE FROM history WHERE id=$1", [id]);
  const q3 = await pool.query("UPDATE users SET balance=$1 WHERE id=$2", [
    100000,
    id,
  ]);
  res.json("Succesful reset");
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
