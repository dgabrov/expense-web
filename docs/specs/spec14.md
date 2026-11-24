@src/components/Cash.tsx

I need you to implement it. 

First of all in useEffect get the accounts and locate the account that has "cash" marker in it. Store its id in some useState for future use. If you don't find any, no issue, store empty string in the cash account id  field 


At top put "Cash" with the same h tag that is used in other controls
Then underneath a div with a text "please paste cash transactions one per row, format date,comment,amount"
Put a rather large textarea in the middle
To the bottom after the text a button "Submit"

Then parse the entry line by line. Each entry must have three fields, csv format
first field, date: format can be "Nov 12", "Nov12", "Nov12, 2026", "Nov 12, 2026" - obviously when year is missing you take the current year. See around if you got some date parsing, as I believe you do
second field, comments or name: "amazon" or "shoes" stuff like that
third field amount

If you did not find any account with cash, then as soon as the button is pushed send error and stay in page. 

If there is nothing in the field, trigger error that one has to insert something and then stay in page

If there are entries but one is wrong, show error message and stay in page

If all good
    - create for each row transaction entry as follows
        id: a new guid
        name: the second field
        amount: the third field
        accountId: the one that you allegedly loaded, the only account that is market cash
        categoryId: empty or null, look how you usually deal with this situation
    
    - bundle all the transactions and using addBulk in getServr add all of them
    - set the transactions in the application store to the newly added bulk of transactions
    - ensure the selected transactions in the store is replaced by empty array, so that we do not have stale selected
    - transfer to the page with the transactions
end if
