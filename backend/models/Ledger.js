import mongoose from "mongoose";

const LedgerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Ledger || mongoose.model("Ledger", LedgerSchema);
