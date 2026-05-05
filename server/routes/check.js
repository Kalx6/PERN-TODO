import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "API is working!" });
  console.log("hello world");
});

export default router;
