import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("❌ No se encontró MONGO_URI en las variables de entorno");
    }

    await mongoose.connect(uri);

    console.log(`
                  ************************************
                  ******* Conectado a MongoDB ********
                  URI: ${uri.includes("localhost") ? "Local MongoDB" : "Mongo Atlas"}
                  *************************************
    `);
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
    process.exit(1);
  }
};
