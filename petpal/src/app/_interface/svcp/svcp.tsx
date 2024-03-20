// To parse this data:
//
//   import { Convert, Svcp } from "./file";
//
//   const svcp = Convert.toSvcp(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.
import { Service } from "@/app/_interface/service/service";

export interface Svcp {
    SVCPAdditionalImg?:     number[];
    SVCPEmail?:             string;
    SVCPID?:                string;
    SVCPImg?:               number[];
    SVCPPassword?:          string;
    SVCPResponsiblePerson?: string;
    SVCPServiceType?:       string;
    SVCPUsername?:          string;
    defaultAccountNumber?:  string;
    defaultBank?:           string;
    description?:           string;
    individualID?:          string;
    isVerified?:            boolean;
    license?:               string;
    location?:              string;
    services?:              Service[];
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toSvcp(json: string): Svcp {
        return cast(JSON.parse(json), r("Svcp"));
    }

    public static svcpToJson(value: Svcp): string {
        return JSON.stringify(uncast(value, r("Svcp")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = val[key];
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Svcp": o([
        { json: "SVCPAdditionalImg", js: "SVCPAdditionalImg", typ: u(undefined, a(0)) },
        { json: "SVCPEmail", js: "SVCPEmail", typ: u(undefined, "") },
        { json: "SVCPID", js: "SVCPID", typ: u(undefined, "") },
        { json: "SVCPImg", js: "SVCPImg", typ: u(undefined, a(0)) },
        { json: "SVCPPassword", js: "SVCPPassword", typ: u(undefined, "") },
        { json: "SVCPResponsiblePerson", js: "SVCPResponsiblePerson", typ: u(undefined, "") },
        { json: "SVCPServiceType", js: "SVCPServiceType", typ: u(undefined, "") },
        { json: "SVCPUsername", js: "SVCPUsername", typ: u(undefined, "") },
        { json: "defaultAccountNumber", js: "defaultAccountNumber", typ: u(undefined, "") },
        { json: "defaultBank", js: "defaultBank", typ: u(undefined, "") },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "individualID", js: "individualID", typ: u(undefined, "") },
        { json: "isVerified", js: "isVerified", typ: u(undefined, true) },
        { json: "license", js: "license", typ: u(undefined, "") },
        { json: "location", js: "location", typ: u(undefined, "") },
        { json: "services", js: "services", typ: u(undefined, a(r("Service"))) },
    ], false),
    "Service": o([
        { json: "averageRating", js: "averageRating", typ: u(undefined, 0) },
        { json: "price", js: "price", typ: u(undefined, 0) },
        { json: "requireCert", js: "requireCert", typ: u(undefined, true) },
        { json: "serviceDescription", js: "serviceDescription", typ: u(undefined, "") },
        { json: "serviceID", js: "serviceID", typ: u(undefined, "") },
        { json: "serviceImg", js: "serviceImg", typ: u(undefined, a(0)) },
        { json: "serviceName", js: "serviceName", typ: u(undefined, "") },
        { json: "serviceType", js: "serviceType", typ: u(undefined, "") },
        { json: "timeslots", js: "timeslots", typ: u(undefined, a(r("Timeslot"))) },
    ], false),
    "Timeslot": o([
        { json: "endTime", js: "endTime", typ: u(undefined, "") },
        { json: "startTime", js: "startTime", typ: u(undefined, "") },
        { json: "status", js: "status", typ: u(undefined, "") },
        { json: "timeslotID", js: "timeslotID", typ: u(undefined, "") },
    ], false),
};
