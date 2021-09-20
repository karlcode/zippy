/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

"use strict";

const babelRegister = require("@babel/register");
babelRegister({
  ignore: [/[\\\/](build|server\/server|node_modules)[\\\/]/],
  presets: ["@babel/preset-typescript", ["react-app", { runtime: "automatic" }]],
  plugins: ["@babel/transform-modules-commonjs", "css-modules-transform"],
});

const express = require("express");
const open = require("open");
const { readFileSync } = require("fs");
const path = require("path");
const { pipeToNodeWritable } = require("react-dom/server");
const App = require("../src/App.tsx").default;
const React = require("react");
import "node-window-polyfill/register";
import "fetch-everywhere"; // fresh isomorphic fetch polyfill, that supports all clients (not tested ;)

const PORT = 10101;
const app = express();

app.get(
  "/",
  handleErrors(async function (req, res) {
    await waitForWebpack();
    res.socket.on("error", (error) => {
      console.error("Fatal", error);
    });
    let didError = false;
    const { startWriting, abort } = pipeToNodeWritable(<App />, res, {
      onReadyToStream() {
        // If something errored before we started streaming, we set the error code appropriately.
        res.statusCode = didError ? 500 : 200;
        res.setHeader("Content-type", "text/html");
        res.write(
          "<!DOCTYPE html>" +
            "<head>" +
            "<title>SSR</title>" +
            '<link rel="stylesheet" type="text/css" href="./main.css" />' +
            "</head>" +
            ""
        );
        startWriting();
      },
      onError(x) {
        didError = true;
        console.error(x);
      },
    });
  })
);
app.use(express.static("build"));
app.use(express.static("dist"));
app.use(express.static("public"));

app
  .listen(PORT, () => {
    console.log(`Listening at ${PORT}...`);
    open(`http://127.0.0.1:${PORT}`);
  })
  .on("error", function (error) {
    if (error.syscall !== "listen") {
      throw error;
    }
    const isPipe = (portOrPipe) => Number.isNaN(portOrPipe);
    const bind = isPipe(PORT) ? "Pipe " + PORT : "Port " + PORT;
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

function handleErrors(fn) {
  return async function (req, res, next) {
    try {
      return await fn(req, res);
    } catch (x) {
      next(x);
    }
  };
}

async function waitForWebpack() {
  while (true) {
    try {
      readFileSync(path.resolve(__dirname, "../build/main.js"));
      return;
    } catch (err) {
      console.log("Could not find webpack build output. Will retry in a second...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}
