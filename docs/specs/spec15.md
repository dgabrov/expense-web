@src/components/reports/report-group.tsx
the href will trigger a callback function passed by props that has this format

const callabck = (month: number, year: number, groupId: string) => void

you call the function with the right parameters (you know the month, year, groupId). For entries with no groupId, you call with empty string. 
put on the embedding component skeleton implementation of this function with a console.log for the time being. 



@src/components/reports/report-category.tsx
same as the group but with categoryId instead of groupId