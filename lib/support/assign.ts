/**
 * Validation check to ensure two values are of the same type.
 */
function validateParameters(a, b) {
    if (!a || !b) return;

    const typeA = typeof a, typeB = typeof b;
    if (typeA !== typeB) throw new Error(
        `Attempt to assign a value of type ${typeB} to a value of type ${typeA}.`
    );
}

/**
 * Retrieves all keys between two objects as an array of unique values.
 * @returns An array containing all keys declared between object a and object b
 */
function getUniqueKeys(a = {}, b = {}) {
    return Array.from(new Set(
        Object.keys(a).concat(Object.keys(b))
    ));
}

/**
 * Handles assignment flow for value types.
 * - Defaults to target value for primitives.
 * @returns The assigned value based on the parameters
 */
function getAssignedValue(source, target) {
    switch (true) {
        case Array.isArray(source) && Array.isArray(target):
            return getAssignedValueArray(source, target);
        case typeof source === 'object':
            return getAssignedValueObject(source, target);
        default:
            return target;
    }
}

/**
 * Concatenates two arrays into one array containing only unique values.
 */
function getAssignedValueArray(a, b) {
    return Array.from(new Set(a.concat(b)));
}

/**
 * Resolves all values in an object into assigned values.
 */
function getAssignedValueObject(a, b) {
    const result = {};
    getUniqueKeys(a, b).map(key => {
        result[key] = assign(a[key], b[key]);
    });
    return result;
}

/**
 * Assign values from source to target. Defaults to target for primitives.
 * @returns The assigned value based on the provided parameters
 */
function assign(source, target) {
    validateParameters(source, target);
    if (!source || !target) return source || target;
    return getAssignedValue(source, target);
}

module.exports = assign;