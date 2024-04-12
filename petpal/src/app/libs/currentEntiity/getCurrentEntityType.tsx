import { EntityType } from "@/app/_enum/currentEntity/EntityType"
export function getCurrentEntityType(json: object): string {
    let entityType: string

    // switch (json) {
    //     case ("SVCPID" in json): {
    //         console.log("waiting")
    //     } case
    // }
    if (json.hasOwnProperty("SVCPID")) {
        entityType = EntityType.SERVICE_PROVIDER
    } else if (json.hasOwnProperty("id")) {
        entityType = EntityType.USER
    } else if (json.hasOwnProperty("adminID") || json.hasOwnProperty("adminId")) {
        entityType = EntityType.ADMIN 
    } else {
        entityType = EntityType.NOT_LOGIN
    }
    return entityType
}

export function isCurrentEntityTypeUser(json: object): boolean {
    return getCurrentEntityType(json) === EntityType.USER
}

export function isCurrentEntityTypeAdmin(json: object): boolean {
    return getCurrentEntityType(json) === EntityType.ADMIN
}

export function isCurrentEntityTypeSvcp(json: object): boolean {
    return getCurrentEntityType(json) === EntityType.SERVICE_PROVIDER
}

export function isCurrentEntityTypeUndefined(json: object): boolean {
    return getCurrentEntityType(json) === EntityType.NOT_LOGIN
}