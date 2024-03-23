export function getCurrentEntityType(json: object): string {
    let entityType: string

    // switch (json) {
    //     case ("SVCPID" in json): {
    //         console.log("waiting")
    //     } case
    // }
    if (json.hasOwnProperty("SVCPID")) {
        entityType = "svcp"
    } else if (json.hasOwnProperty("id")) {
        entityType = "user"
    } else {
        entityType = "undefined"
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