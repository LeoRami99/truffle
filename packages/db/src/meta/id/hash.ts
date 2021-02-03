import { logger } from "@truffle/db/logger";
const debug = logger("db:meta:id:hash");

import { soliditySha3 } from "web3-utils";
const jsonStableStringify = require("json-stable-stringify");

export function hash(obj) {
  const id = soliditySha3(jsonStableStringify(removeNullyValues(obj)));
  return id;
}

function removeNullyValues(obj) {
  return Object.entries(obj)
    .filter(([_, v]) => v !== null && v !== undefined)
    .map(([k, v]) => ({ [k]: v }))
    .reduce((a, b) => ({ ...a, ...b }), {});
}