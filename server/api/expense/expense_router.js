const router = require("express").Router();
const expenseController = require("./expense_controller");

router.post("/expense/new", expenseController.addnew);
router.delete("/expense/delete", expenseController.delete);

exports = module.exports = router;
