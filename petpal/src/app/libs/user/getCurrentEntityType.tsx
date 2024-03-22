export function getCurrentEntityType(json: object): string {
    let entityType: string = "undefined"
    if ("SVCPID" in json) {
        entityType = "svcp"
    } else if ("id" in json) {
        entityType = "user"
    }
    return entityType
}

export function isCurrentEntityTypeUser(json: object): boolean {
    return getCurrentEntityType(json) === "user"
}

export function isCurrentEntityTypeSvcp(json: object): boolean {
    return getCurrentEntityType(json) === "svcp"
}

export function isCurrentEntityTypeUndefined(json: object): boolean {
    return getCurrentEntityType(json) === "undefined"
}