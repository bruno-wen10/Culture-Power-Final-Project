import { connect, connection } from "mongoose";

export class MongooseConfig {
  static InicializeConnection() {
    try {
      connection
        .on("Error", (err) =>
          console.log("Failed to connect to MongoDB. Error:", err)
        )
        .on("open", () => {
          console.log("Connected to MongoDB.");
        })
        .on("close", () => {
          console.log(`Disconnected from MongoDB. Connection closed.`);
        });

      connect(process.env.MONGO_URL as string); // 'mongodb://localhost:5000/culturePower'
    } catch (error: any) {
      console.log("Connection fail. Error:", error);
      throw new Error(error);
    }
  }
  static finish (){
    connection.close();
  }
}
