const { z } = require('zod');

const wordSchema = z.object({
    word: z.string().min(1, 'Word is required'),
    meaning: z.string().min(1, 'Meaning is required')
  });

module.exports = wordSchema;