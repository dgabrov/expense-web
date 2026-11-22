import type {Account} from "../../data.ts";
import type {ReportLastResponse} from "./report-data.ts";

type ReportLastProps = {
    lastReport: ReportLastResponse[]
    accounts: Account[]
}

const ReportLast = ({lastReport, accounts}: ReportLastProps) => {
    return <div>report last</div>
}

export default ReportLast
