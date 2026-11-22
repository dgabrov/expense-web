import type {Account, Category, Group} from "../../data.ts";
import type {ReportListResponse} from "./report-data.ts";

type ReportListProps = {
    listReport: ReportListResponse
    accounts: Account[]
    groups: Group[]
    categories: Category[]
}

const ReportList = ({listReport, accounts, groups, categories}: ReportListProps) => {
    return <div>report list</div>
}

export default ReportList
