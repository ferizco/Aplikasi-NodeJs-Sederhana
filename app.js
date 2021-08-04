const { describe } = require("yargs");
const yargs = require("yargs");
const datas = require("./pelanggan");

yargs
  .command({
    command: "add",
    describe: "menambahkan data pelanggan",
    builder: {
      username: {
        describe: "username",
        demandOption: true,
        type: "string",
      },
      nama: {
        describe: "nama lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "username",
        demandOption: true,
        type: "string",
      },
      alamat: {
        describe: "alamat anda",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      datas.simpanData(argv.username, argv.nama, argv.email, argv.alamat);
    },
  })
  .demandCommand();

//menampilkan data pelanggan berdasarkan username
yargs.command({
  command: "list",
  describe: "menampilkan daftar pelanggan berdasarkan username",
  handler() {
    datas.listData();
  },
});

//menampilkan detail data pelanggan
yargs.command({
  command: "detail",
  describe: "menampilkan detail daftar pelanggan berdasarkan nama",
  builder: {
    username: {
      describe: "username",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    datas.detailData(argv.username);
  },
});

//menghapus data pelanggan berdasarkan username
yargs.command({
  command: "delete",
  describe: "menghapus sebuah data pelanggan berdasarkan username",
  builder: {
    username: {
      describe: "username",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    datas.deleteData(argv.username);
  },
});

yargs.parse();
