import type {Group} from "../../data.ts";
import type {ReportGroupResponse} from "./report-data.ts";

type ReportGroupProps = {
    groupReport: ReportGroupResponse
    groups: Group[]
}

const ReportGroup = ({groupReport, groups}: ReportGroupProps) => {
    return <div>report group</div>
}

export default ReportGroup
