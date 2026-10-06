import expenseModel from "../models/expenseModel.js";
import getDateRange from "../utils/dateFilter.js";// Import the getDataRange function
import XLSX from "xlsx";



//  Add expense

export async function addExpense(req, res) {
  const userId = req.user._id; // Assuming you have user authentication and userId is available in the request
  const { description, amount, category, date } = req.body;

  try {
    if (!description || !amount || !category || !date) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const newExpense = new expenseModel({
      userId,
      description,
      amount,
      category,
      date: new Date(date), // Ensure the date is stored as a Date object
    });
    await newExpense.save();
    res.json({
      success: true,
      message: "Expense added successfully",
      expense: newExpense,
    });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// Get all expenses

export async function getAllExpenses(req, res) {
  const userId = req.user._id; // Assuming you have user authentication and userId is available in the request
  try {
    const expenses = await expenseModel.find({ userId }).sort({ date: -1 });
    res.json({ success: true, expenses });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// to update expense

export async function updateExpense(req, res) {
  const { id } = req.params;
  const userId = req.user._id; // Assuming you have user authentication and userId is available in the request
  const { description, amount } = req.body;
  try {
    const updatedExpense = await expenseModel.findOneAndUpdate(
      { _id: id, userId }, // Ensure the expense belongs to the authenticated user
      { description, amount },
      { new: true }, // Return the updated document
    );
    if (!updatedExpense) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Expense not found or you are not authorized to update it",
        });
    }
    res.json({
      success: true,
      message: "Expense updated successfully",
      data: updatedExpense,
    });
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// to delete expense

export async function deleteExpense(req, res) {
  try {
    const expense = await expenseModel.findByIdAndDelete({
      _id: req.params.id,
    });
    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// to download the data in excel format
export async function downloadExpenseExcel(req, res) {
  const userId = req.user._id; // Assuming you have user authentication and userId is available in the request
  try {
    const expense = await expenseModel.find({ userId }).sort({ date: -1 });
    const plainData = expense.map((exp) => ({
      Description: exp.description,
      Amount: exp.amount,
      Category: exp.category,
      date: new Date(exp.date).toLocaleDateString(), // Format the date as needed
    }));

    const worksheet = XLSX.utils.json_to_sheet(plainData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "expenseModel");
    XLSX.writeFile(workbook, "expense_details.xlsx");
    res.download("expense_details.xlsx");
  } catch (error) {
    console.error("Error downloading expense data:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// to get the overview of the expense based on the date range


export async function getExpenseOverview(req, res) {
       try {
            const userId = req.user._id;
            const { range = "monthly" } = req.query; // Default to monthly if no range is provided
            const { start, end } = getDateRange(range); // Use the utility function to get the date range
            const expense = await expenseModel.find({
                userId,
                date: { $gte: start, $lte: end },
            }).sort({ date: -1 });
 
         const totalExpense = expense.reduce((acc, cur) => acc + cur.amount, 0);
    const averageExpense =
      expense.length > 0 ? totalExpense / expense.length : 0;
    const numberOfTransactions = expense.length;

    const recentTransactions = expense.slice(0, 5);

            res.json({
                success: true,
                data: {
                    totalExpense,
                    averageExpense,  
                    numberOfTransactions,
                    recentTransactions,
                    range

                },
            });
        }
        catch (error) {
            console.error("Error fetching income overview:", error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    }