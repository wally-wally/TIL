SELECT Employee.Name AS Employee
FROM Employee
  INNER JOIN Employee AS Manager ON Employee.managerid = Manager.id
WHERE Employee.Salary > Manager.Salary