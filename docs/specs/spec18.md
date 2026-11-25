I need a change in @src/components/Assign.tsx unfortunately. 


**step 1**
Currently on the right side you show multiple tables for each group and in theory were ok but they occupy a lot. 
Delete those tables and instead put two tables side by side

Left one has the groups and a title "Groups". It shows all the groups in alphabetical order and each group has a hyperlink
Right one has the categories associated with a group and the hyperlinks it currently has, the ones that actually operate on the selected item and change its category ID
When click on a link in the left table, the entry becomes with a different background and the right table populates with the categories associated with this group

**step 2**
Put a button somewhere maybe above the table with "Clean Qualified". Click on it and it will remove the entries in assignTable in the app store who already have categoryId set so that only the ones without will stay there to have category assigned. Now: when this operation removes all the items on the page, then go to transactions.tsx, maybe submit as well some error like 'ok you removed everything'. You know who has categoryId filled out; 


