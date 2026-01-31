// core/helper.js
const { rules } = require('./validation');

function validate(data, validations) {
    const errors = {};

    for (const field in validations) {
        const fieldRules = validations[field].split('|');
        const value = data[field];

        for (const rule of fieldRules) {
            let [ruleName, param] = rule.split(':');

            if (!rules[ruleName]) continue;

            const valid = param ? rules[ruleName](value, parseInt(param)) : rules[ruleName](value);

            if (!valid) {
                errors[field] = errors[field] || `${field} failed validation for ${ruleName}`;
            }
        }
    }

    return Object.keys(errors).length ? errors : null;
}

module.exports = { validate };
