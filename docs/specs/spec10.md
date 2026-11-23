implement now @src/components/reports/report-last.tsx

- you have accounts
- you have payload lastReport

go through accounts, see if you have entry in lastReport (maybe transform lastReport in a Map for faster access)
if you got entry, then keep the account id, account name and the last date from payload for later

then once you are ready, create table with account name / last date as columns and show it
