import Product from "../model/product.js";
import slugify from "slugify";
import { cloudinary } from "../helpers/cloudinary.config.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      location,
      bedrooms,
      bathrooms,
      price,
      duration,
      featured,
      status,
    } = req.body;

    const imageFile = req.file; // Expect a single file

    if (!name || !location || !bedrooms || !bathrooms || !price || !duration || !featured || !status) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const slug = slugify(name);
    let uploadedImage = null;

    if (imageFile) {
      try {
        const imageResult = await cloudinary.uploader.upload(imageFile.path);
        uploadedImage = {
          url: imageResult.secure_url,
          imagePublicId: imageResult.public_id,
        };
      } catch (err) {
        console.error("Error uploading image to Cloudinary:", err);
        return res.status(500).json({ error: "Failed to upload image" });
      }
    }

    const newProduct = new Product({
      name,
      slug,
      location,
      bedrooms,
      bathrooms,
      price,
      duration,
      featured,
      status,
      images: uploadedImage ? [uploadedImage] : [],
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ success: false, message: "Failed to create product", error: err });
  }
};

export const getAllProducts = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 9;
      const skip = (page - 1) * limit;
  
      const products = await Product.find().skip(skip).limit(limit);
      const totalProducts = await Product.countDocuments();
  
      res.status(200).json({
        success: true,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        productCount: totalProducts,
        products,
      });
    } catch (err) {
      console.error("Error fetching all products:", err.message);
      res.status(500).json({ success: false, message: "Failed to fetch products", error: err.message });
    }
  };
  export const getProductById = async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
  
      res.status(200).json({ success: true, product });
    } catch (err) {
      console.error("Error fetching product by ID:", err.message);
      res.status(500).json({ success: false, message: "Failed to fetch product", error: err.message });
    }
  };


export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, location, bedrooms, bathrooms, price, duration, featured, status } = req.body;
    const imageFile = req.file;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    product.name = name || product.name;
    product.location = location || product.location;
    product.bedrooms = bedrooms || product.bedrooms;
    product.bathrooms = bathrooms || product.bathrooms;
    product.price = price || product.price;
    // product.duration = duration || product.duration;
    product.featured = featured || product.featured;
    product.status = status || product.status;

    if (status === 'For Rent') {
        product.duration = duration || product.duration;
      } else {
        product.duration = undefined; // Clear the duration if not "For Rent"
      }

    if (name) {
      const nameSlug = slugify(name);
      product.slug = nameSlug || product.slug;
    }

    // Delete previously uploaded images from Cloudinary
    if (product.images && product.images.length > 0) {
      await Promise.all(
        product.images.map(async (image) => {
          try {
            // Delete image from Cloudinary
            await cloudinary.uploader.destroy(image.imagePublicId);
          } catch (err) {
            console.error("Error deleting image from Cloudinary:", err);
          }
        })
      );
    }

    // Upload new image to Cloudinary
    let uploadedImage = null;

    if (imageFile) {
      try {
        const imageResult = await cloudinary.uploader.upload(imageFile.path);
        uploadedImage = {
          url: imageResult.secure_url,
          imagePublicId: imageResult.public_id,
        };
      } catch (err) {
        console.error("Error uploading image to Cloudinary:", err);
        return res.status(500).json({ error: "Failed to upload image" });
      }
    }

    // Update product images
    product.images = uploadedImage ? [uploadedImage] : product.images;

    // Save updated product
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: product,
    });
  } catch (err) {
    console.error("Error updating product:", err.message);
    res.status(500).json({ success: false, message: "Error updating product", error: err.message });
  }
};
export const deleteProductById = async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Product.findByIdAndDelete(productId);
  
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
  
      res.status(200).json({ success: true, message: `Product ID: ${productId} deleted successfully` });
    } catch (err) {
      console.error("Error deleting product by ID:", err.message);
      res.status(500).json({ success: false, message: "Failed to delete product", error: err.message });
    }
  };
