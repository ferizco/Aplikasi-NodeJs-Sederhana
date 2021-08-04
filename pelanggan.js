//modul yang digunakan
const fs = require("fs");
const { resolve } = require("path");
const chalk = require("chalk");
const validator = require("validator");

//membuat direktori dataPelanggan
const dirPath = "./dataPelanggan";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

//membuat file pelanggan.json
const dataPath = "./dataPelanggan/pelanggan.json";
if (!fs.existsSync(dirPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadData = () => {
  const file = fs.readFileSync("dataPelanggan/pelanggan.json", "utf-8");
  const datas = JSON.parse(file);
  return datas;
};

//menyimpan data pelanggan
const simpanData = (username, nama, email, alamat) => {
  const data = { username, nama, email, alamat };
  const datas = loadData();

  // cek duplikat username
  const duplikat = datas.find((data) => data.username === username);
  if (duplikat) {
    console.log(
      chalk.red.inverse("username sudah terdaftar, gunakan nama lain")
    );
    return false;
  }

  // cek keaslian email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse("email anda tidak valid"));
      return false;
    }
  }

  datas.push(data);

  fs.writeFileSync("dataPelanggan/pelanggan.json", JSON.stringify(datas));
  console.log(chalk.green.inverse("terima kasih sudah memasukan data"));
};

//function listData untuk menampilkan data pelanggan
const listData = () => {
  const datas = loadData();
  console.log(chalk.cyan.inverse("Daftar Pelanggan: "));
  datas.forEach((data, i) => {
    console.log(`${i + 1}. ${data.username}`);
  });
};

//function detailData untuk menampilkan detail data pelanggan
const detailData = (username) => {
  const datas = loadData();

  const data = datas.find(
    (data) => data.username.toLowerCase() === username.toLowerCase()
  );

  if (!data) {
    console.log(chalk.red.inverse(`${username} tidak ditemukan`));
    return false;
  }
  console.log(chalk.cyan.inverse(data.username));
  console.log("nama lengkap: " + data.nama);
  console.log("email : " + data.email);
  console.log("alamat: " + data.alamat);
};

//function menghapus data pelanggan berdasarkan username
const deleteData = (username) => {
  const datas = loadData();

  const newDatas = datas.filter(
    (data) => data.username.toLowerCase() !== username.toLowerCase()
  );

  if (datas.length === newDatas.length) {
    console.log(chalk.red.inverse(`${username} tidak ditemukan`));
    return false;
  }

  fs.writeFileSync("dataPelanggan/pelanggan.json", JSON.stringify(newDatas));

  console.log(
    chalk.green.inverse(
      `data pelanggan yang usernamenya ${username} berhasil dihapus`
    )
  );
};

//mengeksport function
module.exports = { simpanData, listData, detailData, deleteData };
