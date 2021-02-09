const { v4: uuid } = require("uuid");
const { Router } = require("express");
const storage = require("../storage/mongo");
const authMiddleware = require("../middleware/auth.middleware")

const router = Router();

router.get("/", authMiddleware, async (req, res, next) => {
  const { idUser } = req.query
  console.log(idUser)
  const list = await storage.listAll(idUser);
  console.log(list)
  res.json(list);
});

router.get("/:id", authMiddleware, async (req, res, next) => {
  const item = await storage.getById(req.params["id"]);
  console.log(req.query)
  res.status(item ? 200 : 404).json(
    item ? item : {
      statusCode: 404,
    }
  );
});

router.post("/", authMiddleware, async (req, res, next) => {
  console.log(req.query)
  const id = uuid();
  const { body } = req;
  const { idUser } = req.query
  body.id = id;
  body.idUser = idUser
  console.log(body)

  const newBody = await storage.create(body);

  res.json(newBody);
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  const { body } = req;

  const { idUser } = req.query
  const newBody = await storage.update({
    ...body,
    id: req.params.id,
    idUser
  });
  console.log(newBody)

  res.json(newBody);
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  console.log(req)
  await storage.remove(req.params["id"]);

  res.status(204).json(null);
});

module.exports = router;
