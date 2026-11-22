import type {Category, Group} from "../../data.ts";
import type {ReportCategoryResponse} from "./report-data.ts";

type ReportCategoryProps = {
    categoryReport: ReportCategoryResponse
    groups: Group[]
    categories: Category[]
}

const ReportCategory = ({categoryReport, groups, categories}: ReportCategoryProps) => {
    return <div>report category</div>
}

export default ReportCategory
