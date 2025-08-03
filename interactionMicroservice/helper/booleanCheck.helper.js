export function booleanCheck(value) {
    if((value === true || value === false) && typeof value === "boolean") {
        return value;
    } else {
        return null;
    }
}