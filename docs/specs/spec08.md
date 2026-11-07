@src/components/csv/Csv.tsx

Create a Servr entry called addBulk that gets an array of Transaction, it will be at /addBulk with POST


Implement processUpload as follows: 

- from the values in the processData, for each entry in process data create an entry of the type Transaction as follows
  1. in the id, put the id in the csvline item
  2. name: look which column has UPLOAD_NAME selected and use the value at that index
  3. date: look which column has UPLOAD_DATE selected, get the value at that index, parse with the selected date format and add it in the format required in Transaction, see how you did in other places
  4. amount: see which columns are with UPLOAD_PLUS or UPLOAD_MINUS or both. If empty, zero, otherwise parse to number. populate amount in the transaction with the value at PLUS minus the valueat MINUS. Typically only one is populated but you do the calculation there
  5. accountId: selected account id, that is verified that it is selected already
  6. categoryId: null

you will end up with an array of transactions. Any error stops the process entirely, an error will be shown.

call addBulk above with this array.

in case of error, well, error and that's it

in case of success: 
- use the reducer to set the transactions in the store to the newly uploaded array
- dispatch to the Transactions page using the reducer as well. 
