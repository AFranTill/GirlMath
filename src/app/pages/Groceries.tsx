import { GlassCard } from "../components/shared/GlassCard";
import { StatusAvatar } from "../components/shared/StatusAvatar";
import { Progress } from "../components/ui/progress";
import { ShoppingCart } from "lucide-react";

const transactions = [
  { id: 1, retailer: "Countdown", amount: 45.32, buyer: "Alex Kim", date: "May 1", items: "Milk, Bread, Eggs, Cheese" },
  { id: 2, retailer: "Woolworths", amount: 67.89, buyer: "Sam Taylor", date: "Apr 29", items: "Fresh produce, Chicken, Rice" },
  { id: 3, retailer: "Countdown", amount: 23.45, buyer: "Jordan Lee", date: "Apr 27", items: "Snacks, Coffee, Tea" },
  { id: 4, retailer: "New World", amount: 31.89, buyer: "Alex Kim", date: "Apr 25", items: "Vegetables, Pasta, Sauce" },
];

const budgetUsed = 168;
const budgetTotal = 200;
const budgetRemaining = budgetTotal - budgetUsed;

export function Groceries() {
  return (
    <div className="p-8 space-y-6 max-w-screen-xl mx-auto bg-[#EEEBE3] min-h-screen">
      <div className="pt-4">
        <h1 className="text-2xl font-bold text-black">Grocery Kitty</h1>
        <p className="text-sm text-black/50 mt-1">Shared household expenses</p>
      </div>

      <GlassCard className="bg-[#EEEBE3]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-[#CA0013] rounded-full flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-[#EEEBE3]" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-black/50">May Budget</p>
            <p className="text-3xl font-bold text-black">${budgetTotal}</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-black/50">Remaining</span>
            <span className="font-semibold text-[#CA0013]">
              ${budgetRemaining} / ${budgetTotal}
            </span>
          </div>
          <Progress value={(budgetUsed / budgetTotal) * 100} className="h-3 [&>div]:bg-black" />
        </div>
      </GlassCard>

      <div className="space-y-3">
        <h2 className="font-semibold text-black">Recent Transactions</h2>
        {transactions.map((transaction) => (
          <GlassCard key={transaction.id} hover className="bg-[#EEEBE3]">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <StatusAvatar name={transaction.buyer} status="safe" size="sm" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-black">{transaction.retailer}</p>
                    <span className="text-xs text-black/40">{transaction.date}</span>
                  </div>
                  <p className="text-sm text-black/60 mb-1">{transaction.items}</p>
                  <p className="text-xs text-black/40">Purchased by {transaction.buyer}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-black">${transaction.amount.toFixed(2)}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="bg-[#EEEBE3]">
        <h3 className="font-semibold text-black mb-2">Budget Tip</h3>
        <p className="text-sm text-black/60">
          You're on track! At this rate, you'll have $32 remaining for the month. 💰
        </p>
      </GlassCard>
    </div>
  );
}
