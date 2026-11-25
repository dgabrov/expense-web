the callback for groupValueClick
- get values
- call the endpoint getMonthGroup
- if error - show error and stay here
- if no error but the array returned is nil or length of zero, dispatch error that there are no transactions and stay put
- if no error and there are transactions returned
    a. set transactions in store
    b. set the selected array in store to empty array
    c. dispatch to the transactions page

pretty similar for groupCategoryClick, but of course call getMonthCategory etc. 
