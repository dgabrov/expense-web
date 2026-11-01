@src/components/EditTransaction.tsx

- fill out select for groups with the groups that were loaded
- for the selected group, fill out the select for categories that correspond for the given group
- adding is true, group will have first item selected and category will have the right categories for that group, first one selected
- adding is false, group and category will have the right values so that category will select the right id, and group will ensure that the category list will contain the category with the desired id

- add callbacks for save and cancel, and console.log the id in them so that it does not complain that id is not used, also please put TODO in those callbacks
- if adding is false, write useEffect to load the value from getServr - getTransactionById - and populate the values in fields with the ones in the current transaction. For date use formatDate in util.ts
- if adding, of course it starts with empty fields

