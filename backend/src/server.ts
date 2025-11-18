import {connect} from "mongoose"
import app from "./app"
import { config } from "./config"


connect(`${config.mongoUri}`)
  .then(() => {
    console.log(" MongoDB connected")
    app.listen(config.port || 8080, () =>
      console.log(`Server running on port ${config.port || 8080}`)
    )
  })
  .catch((err) => console.error("DB connection error: ", err.message))
