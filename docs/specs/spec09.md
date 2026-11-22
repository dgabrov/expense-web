@src/components/Reports.tsx

please populate this component for the time being only with controls, I need the following:

Start: 
- a dropdown with months with empty id and then ids from 1 to 12
- regular edit field for year

Same for End

Then a checkbox for "ExcludeNone"

Then select the report type, this time without empty, possible values group, category, last and list and all of them id lowercase (as mentioned) and caption proper English with capital case first character. 

Then a button "submit"

Try to do something nice looking; refer to the other components for styling.

All the values are part of internal state so no need for props.

Then a place holder for a component as follows:
- if you select group then you show an empty component ReportGroup
- if you select category then you show an empty component ReportCategory
- if you select list then you show an empty component ReportList
- if you select last then you show an empty component ReportLast