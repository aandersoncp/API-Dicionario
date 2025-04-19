const { z } = require('zod');

const meaningSchema = z.object({
    meaning: z.string().min(1, 'Meaning is required')
});

module.exports = meaningSchema;