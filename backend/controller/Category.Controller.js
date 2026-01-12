import Category from "../model/CategorySchema.js";

export const getCategory = async (req, res) => {
  try {
    const categories = await Category.find().select("name");
    res.status(200).json({ categories });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
