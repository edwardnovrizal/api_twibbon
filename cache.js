const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 30 * 24 * 60 * 60, checkperiod: 24 * 60 * 60 });

myCache.mset([
  {
    key: "trending",
    val: ["dsafdsf"],
  },
  {
    key: "popular",
    val: ["pop"],
  },
]);

const nilai = myCache.get("trending");
console.log(nilai);
