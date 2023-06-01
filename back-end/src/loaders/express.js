import express from "express";
import routes from "@/api";
import history from "connect-history-api-fallback";

export default (app) => {
  app.get("/status", (req, res) => {
    console.log("status");
    console.log(req.ip);
    res.status(200).send("status");
  });
  console.log("hi");
  app.disable("x-powered-by");

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", routes());
  app.use(history());
  console.log("express");

  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
