// Response types for the POST /report/* endpoints of expense-go
// (internal/data/data.go, internal/data/date.go, internal/data/transaction.go).

// Calendar date sent by the backend as "YYYY-MM-DD" (no time, no zone).
export type ReportDate = string;

// POST /report/last — returns a bare JSON array, not wrapped in an object.
export interface ReportLastResponse {
  accountId: string;
  lastDate: ReportDate;
}

export type ReportLastResponseList = ReportLastResponse[];

// One month's total for one group. groupId is an empty string for
// transactions that have no category or group.
export interface ReportGroupResponseItem {
  month: number;
  year: number;
  groupId: string;
  amount: number;
}

// POST /report/group
export interface ReportGroupResponse {
  items: ReportGroupResponseItem[];
}

// One month's total for one category.
export interface ReportCategoryResponseItem {
  month: number;
  year: number;
  categoryId: string;
  amount: number;
}

// POST /report/category
export interface ReportCategoryResponse {
  items: ReportCategoryResponseItem[];
}

// A transaction as returned by the list report (same shape as the backend Transaction).
export interface ReportTransaction {
  id: string;
  name: string;
  date: ReportDate;
  amount: number;
  accountId: string;
  categoryId: string | null;
}

// POST /report/list
export interface ReportListResponse {
  items: ReportTransaction[];
}

// Month and year of a report bound. The Go struct has no JSON tags, so the
// keys are capitalized exactly as written here.
export interface ReportFilter {
  Month: number; // 1–12
  Year: number; // > 0
}

// Request body for all POST /report/* endpoints.
// Start is required. End is optional (null/omitted means no upper bound) and
// is ignored by /report/last. ExcludeNone is optional and defaults to false.
export interface ReportRequest {
  Start: ReportFilter;
  End?: ReportFilter | null;
  ExcludeNone?: boolean;
}
