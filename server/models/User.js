const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    weight: {
      type: Number,
      default: null, // in kg
    },
    height: {
      type: Number,
      default: null, // in cm
    },
    age: {
      type: Number,
      default: null,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male",
    },
    activityLevel: {
      type: String,
      enum: ["sedentary", "light", "moderate", "active", "very_active"],
      default: "moderate",
    },
    goal: {
      type: String,
      enum: ["lose", "maintain", "gain"],
      default: "maintain",
    },
    proteinGoal: {
      type: Number,
      default: 160, // grams
    },
    calorieGoal: {
      type: Number,
      default: 2200,
    },
  },
  { timestamps: true }
);

// ---

// ## Why these extra fields?

// With `weight`, `height`, `age`, `gender`, and `activityLevel` you can now auto-calculate everything:

// **BMI:**
// ```
// BMI = weight(kg) / (height(m))²

// Example: 70kg, 175cm
// BMI = 70 / (1.75)² = 22.9 → Normal ✅
// ```

// **TDEE** (how many calories you actually need per day):
// ```
// Step 1 — BMR (Basal Metabolic Rate, Harris-Benedict formula):
//   Male:   BMR = 88.36 + (13.4 × weight) + (4.8 × height) - (5.7 × age)
//   Female: BMR = 447.6 + (9.25 × weight) + (3.1 × height) - (4.33 × age)

// Step 2 — Multiply by activity level:
//   Sedentary  → BMR × 1.2
//   Light      → BMR × 1.375
//   Moderate   → BMR × 1.55
//   Active     → BMR × 1.725
//   Very Active→ BMR × 1.9
// ```

// **Auto protein goal** based on goal:
// ```
// Lose weight  → 2.0g per kg of bodyweight
// Maintain     → 1.6g per kg
// Gain muscle  → 2.2g per kg
