// core/validation.js

// توابع کمکی برای هر rule
const rules = {
    required: (value) => value !== undefined && value !== null && value !== '',
    min: (value, param) => typeof value === 'string' && value.length >= param,
    max: (value, param) => typeof value === 'string' && value.length <= param,
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    numeric: (value) => !isNaN(value),
};

// تابع اصلی validate
function validate(data, validations) {
    const errors = {};

    for (const field in validations) {
        const fieldRules = validations[field].split('|'); // rules جداشده با '|'
        const value = data[field];

        for (const rule of fieldRules) {
            let [ruleName, param] = rule.split(':');

            if (!rules[ruleName]) continue; // اگر rule وجود نداشت رد کن

            const valid = param ? rules[ruleName](value, parseInt(param)) : rules[ruleName](value);

            if (!valid) {
                // پیام خطا می‌تونه ساده باشه یا بعدا custom بشه
                errors[field] = errors[field] || `${field} failed validation for ${ruleName}`;
            }
        }
    }

    return Object.keys(errors).length ? errors : null;
}

module.exports = { validate, rules };
