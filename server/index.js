require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());
dotenv.config();

app.post("/auth", async (req, res) => {
  const token = req.body["token"];
  console.log("in auth123");
  // if(token == undefined )
  // return;
  if (token == undefined) {
    res.json({ status: "NO1" });
    return;
  }
  try {
    jwt.verify(token, `process.env.ACCESS_TOKEN_SECRET`, (err, user) => {
      if (err) {
        console.log("autherror" + token);
        res.sendStatus(403);
        return;
      }
    });
    res.json({ status: "ok" });
    return;
  } catch (error) {
    console.log(error + "123");
  }
});
app.post("/register", async (req, res) => {
  try {
    console.log(req.body);

    const usernmame = req.body.username;
    const password = req.body.password;
    const q2 = await pool.query("SELECT * FROM users WHERE username = $1", [
      usernmame,
    ]);
    if (q2.rowCount > 0) {
      {
        res.json("username already taken Select new Username");
        return;
      }
    } else {
      const q1 = await pool.query(
        "INSERT INTO users(username,password,balance) VALUES($1,$2,$3)",
        [usernmame, password, 100000]
      );
      res.json("Successfully logged in");
      return;
    }
  } catch (err) {
    console.error(err.message);
    return;
  }
});

app.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    const user = { name: username };
    const atoken = jwt.sign(user, `process.env.ACCESS_TOKEN_SECRET`);
    const q1 = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    // console.log(q1);
    if (q1.rowCount == 0) {
      res.json("Invalid username");
      return;
    } else {
      if (q1.rows[0].password == password) {
        res.json({ accesstoken: atoken, id: q1.rows[0].id });
        return;
      } else {
        res.json("Invalid password");
        return;
      }
    }

    console.log("OK!!");
  } catch (err) {
    console.error(err.message);
    return;
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
  if (st == "BUY") {
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
          return res.json("bought ");
        } else {
          return res.json("NOT enough funds");
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
          return res.json("inserted");
        } else {
          return res.json("Not enough funds");
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
        return res.json("Buyed Successfully");
      } else {
        return res.json("NOT enough funds");
      }
    }
  } else if (st == "SELL") {
    const q1 = await pool.query("SELECT * FROM holdings WHERE id=$1", [id]);
    console.log(q1.rows);
    if (q1.rowCount == 0) {
      return res.json("Never purchased");
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
        return res.json("Never bought this stock");
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
          return res.json("selled ");
        }
      }
    }
  }
});
app.post("/funds", async (req, res) => {
  try {
    const username = req.body.username;

    console.log(username);
    const qid = await pool.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);

    res.json({ funds: qid.rows[0].balance });
    return;
  } catch (error) {
    console.log(error);
    return;
  }
});
app.post("/portfolio", async (req, res) => {
  try {
    const username = req.body.username;
    if (username == undefined) return;
    const qid = await pool.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);
    if (qid == undefined) return;
    console.log(username + qid.rows[0]);

    const id = qid.rows[0].id;
    // const balance = qid.rows[0].balance;
    const q1 = await pool.query("SELECT * FROM holdings WHERE id=$1", [id]);
    res.json({ portfolio: q1.rows });
    return;
  } catch (error) {
    console.log(error);
    return;
  }
});

app.post("/history", async (req, res) => {
  try {
    const username = req.body.username;
    if (username == "") res.json({});
    const qid = await pool.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);

    const id = qid.rows[0].id;
    const balance = qid.rows[0].balance;
    const q1 = await pool.query("SELECT * FROM history WHERE id=$1", [id]);
    res.json({ hist: q1.rows });
    return;
  } catch (error) {
    return;
  }
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
  return;
});
app.listen(5000, () => {
  console.log("listening on port 5000");
});
