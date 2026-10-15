import type {CompleteGroup} from "../data.ts";

export const formatDate = (date: Date) => new Date(date).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})

export const getCategoryName = (categoryId: string | null, completeGroups: CompleteGroup[]) => {
    for (const group of completeGroups) {
        const category = group.categories.find((category) => category.id === categoryId)
        if (category) {
            return `${group.name}:${category.name}`
        }
    }

    return ''
}
