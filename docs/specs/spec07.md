@src/components/csv/Csv.tsx

- implement checkSettings as follows:
  - minimum one row in the processData variable
  - the drop downs in the header, one and only one for each of the following value 

const UPLOAD_DATE = "upload_date";
let UPLOAD_NAME = "upload_name";
let UPLOAD_PLUS = "upload_plus";
let UPLOAD_MINUS = "upload_minus";

either one of UPLOAD_PLUS and UPLOAD_MINUS is allowed to be missing, however at least one of them must be selected. 

- the date format must be selected
- the account must be selected

you can create additional helper functions; 