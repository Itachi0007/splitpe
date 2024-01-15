const router = require("express").Router();
const expenseController = require("./expense_controller");

router.post("/expense/new", expenseController.addnew);
router.put("/expense/:id", expenseController.update);
router.get("/expense/:id", expenseController.get);
router.delete("/expense/delete", expenseController.delete);
// router.post("/expense/fetch", expenseController.fetch); // to fetch expenses based on filter body

exports = module.exports = router;
