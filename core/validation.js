const rules = {
    // فیلدهای عادی
    required: (value) => value !== undefined && value !== null && value !== '',
    min: (value, param) => typeof value === 'string' && value.length >= param,
    max: (value, param) => typeof value === 'string' && value.length <= param,
    string: (value) => typeof value === 'string',
    boolean: (value) => typeof value === 'boolean',
    numeric: (value) => !isNaN(value),
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    url: (value) => /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/.test(value),
    alpha: (value) => /^[A-Za-z]+$/.test(value),
    alpha_num: (value) => /^[A-Za-z0-9]+$/.test(value),
    phone: (value) => /^(\+98|0)?9\d{9}$/.test(value),
    date: (value) => /^\d{4}-\d{2}-\d{2}$/.test(value),
    min_value: (value, param) => !isNaN(value) && Number(value) >= param,
    max_value: (value, param) => !isNaN(value) && Number(value) <= param,
    regex: (value, param) => {
        try {
            const re = new RegExp(param);
            return re.test(value);
        } catch (err) {
            console.error('Invalid regex:', param);
            return false;
        }
    },
    confirmed: (value, fieldValue) => value === fieldValue,

    // فایل‌ها
    file_required: (file) => file !== undefined && file !== null,
    
    // نوع فایل
    mimes: (file, types) => {
        if (!file || !file.originalname) return false;
        const allowed = types.split(','); // 'jpg,png,gif'
        const ext = file.originalname.split('.').pop().toLowerCase();
        return allowed.includes(ext);
    },

    // حداکثر حجم فایل به بایت
    max_size: (file, size) => {
        if (!file || !file.size) return false;
        return file.size <= parseInt(size);
    }
};

// تابع validate
function validate(data, validations) {
    const errors = {};

    for (const field in validations) {
        const fieldRules = validations[field].split('|');
        const value = data[field];

        for (const rule of fieldRules) {
            let [ruleName, param] = rule.split(':');

            if (!rules[ruleName]) continue;

            let valid;
            if (ruleName === 'confirmed') {
                valid = rules[ruleName](value, data[param]);
            } else if (ruleName === 'regex') {
                valid = rules[ruleName](value, param);
            } else if (['mimes', 'max_size'].includes(ruleName)) {
                valid = rules[ruleName](value, param);
            } else if (param) {
                valid = rules[ruleName](value, isNaN(param) ? param : parseInt(param));
            } else {
                valid = rules[ruleName](value);
            }

            if (!valid) {
                errors[field] = errors[field] || `${field} failed validation for ${ruleName}`;
            }
        }
    }

    return Object.keys(errors).length ? errors : null;
}

module.exports = { validate, rules };
