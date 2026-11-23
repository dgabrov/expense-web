Now implement @src/components/reports/report-group.tsx

I see the following:
- a table
- on vertical first column the groups
- one column for each month / year with respective values for each group
- at the end one column with total and one column with median average. If median requires division by zero, result is zero
- last row: sum of each column, and of course an empty cell under the groups, under the first column

consider the following:
- all the cells with values should have sum of values that you received or if there are no values, then zero
- the values come already summarized by month, year and group
- you got the groups to establish the correspondence between group id and group name. 

first step is that based on the data you received, you calculate the minimum and maximum month/year and then determine all the months in between and all of those will be present in the table, only afterwards you go through data and assign values to the table cells that contain values. 

Example: you got two entries, one for group 1 and one for group 2. First entry is Jan 2021 and second entry is dec 2021

- you show months between Jan 2021 and dec 2021
- you show all groups
- only two values - those
- you have sum and average in the last two columns
