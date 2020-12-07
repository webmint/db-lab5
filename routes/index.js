var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')(/* options */);
var db = pgp('postgres://administrator:admin@localhost:5432/lab4');

var complexRequest = [];
var totalSalary = null;
var amountEmployees = null;
var averageSalary = null;
var lowestSalary = [];
var highestSalary = [];
var salaryAsc = [];
var salaryDesc = [];


db.many('SELECT "full_name" as "employee_name", "sallary" As "monthly_income" FROM "employees" WHERE "sallary" > 5000 And "children_amount" > 2',)
  .then(function (data) {
    complexRequest = data;
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })

db.one('SELECT SUM("sallary") as "total" FROM "employees"',)
  .then(function (data) {
    totalSalary = data.total;
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })

db.one('SELECT COUNT(*) as "amount_employees" FROM "employees"',)
  .then(function (data) {
    amountEmployees = data.amount_employees;
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })

db.one('SELECT AVG("sallary") as "average" FROM "employees"',)
  .then(function (data) {
    averageSalary = data.average;
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })

db.manyOrNone('SELECT "full_name", "sallary" FROM "employees" WHERE "sallary" = (SELECT MIN("sallary") FROM "employees")',)
  .then(function (data) {
    lowestSalary = data
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })

db.manyOrNone('SELECT "full_name", "sallary" FROM "employees" WHERE "sallary" = (SELECT MAX("sallary") FROM "employees")',)
  .then(function (data) {
    highestSalary = data
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })

db.many('SELECT "full_name", "sallary" FROM "employees" ORDER BY "sallary" ASC',)
  .then(function (data) {
    salaryAsc = data;
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })

db.many('SELECT "full_name", "sallary" FROM "employees" ORDER BY "sallary" DESC',)
  .then(function (data) {
    salaryDesc = data;
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })

console.log('hi');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    complexRequest,
    totalSalary,
    amountEmployees,
    averageSalary,
    lowestSalary,
    highestSalary,
    salaryAsc,
    salaryDesc,
  });
});

module.exports = router;
