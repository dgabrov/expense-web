create new page same folder as Transactions.tsx. Create location for it for switching to it. Page is called Assign.tsx
In useEffect you get the groups and categories and store them in some useState

Title is "Assign Categories"
On the left side you got a table with transactions. Looks like the one in the Transactions.tsx, however no select checkboxes. The values you take from assignTransactions that you already added to the store

On the right side, a set of tables with Group in the title and then row by row the categories, you show the group and category names. A href is on each category and trigger a function that has parameter the categoryId. The tables with Group / categories are one after the other horizontally, could wrap on the second row if they don't fit, use something called flex. 

In transactions.tsx create button assign.
- if there aren't items selected, show error that you gotta select something
- if there are items selected, get those items and then put them in the assignCategories in the store
- afterwards forward to the Assign.tsx
- maintain a useState in Assign.tsx called currentIndex. This has value zero

- add column to transactions table from Assign.tsx
  - if currentIndex correspond to the row, that column will have a green arrow oriented to the left 
  - if you click one of the cells in this new column in any row, currentIndex becomes the one associated with the row

- so now you got the currentIndex to some row. You click on one of the categories in the tables on the right
  - the transaction at currentIndex has the categoryId assigned to the one clicked, by calling the endpoint newly added to the Servr
  - the currentIndex is moved to the next row corresponding to a transaction that has categoryId not filled out or null
  - you change the categoryId of the transaction in assignTransactions collection (add action if needed)
  - you go in transactions array of the store and do the same thing for this transaction, so that when you go back in transactions you see the right values (add action of needed or use one action for both updates)
