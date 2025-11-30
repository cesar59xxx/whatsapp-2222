import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import rateLimit from "express-rate-limit"
import dotenv from "dotenv"
import { supabase } from "./config/supabase.js"

import authRoutes from "./routes/auth.routes.js"
import whatsappRoutes from "./routes/whatsapp.routes.js"
import contactRoutes from "./routes/contact.routes.js"
import messageRoutes from "./routes/message.routes.js"
import chatbotRoutes from "./routes/chatbot.routes.js"
import tenantRoutes from "./routes/tenant.routes.js"
import adminRoutes from "./routes/admin.routes.js"

dotenv.config()

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  },
})

// Middlewares de segurança
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
)
app.use(compression())

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)

// Rate limiting
const limiter = rateLimit({
  windowMs: Number.parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number.parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: "Muitas requisições deste IP, tente novamente mais tarde",
})
app.use("/api/", limiter)

// Body parser
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit: "50mb" }))

app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`)
  console.log(`   Origin: ${req.headers.origin || "No origin"}`)
  console.log(`   User-Agent: ${req.headers["user-agent"]?.substring(0, 50) || "Unknown"}`)
  next()
})

console.log("📍 Configurando rotas da API...")
app.use("/api/auth", authRoutes)
app.use("/api/whatsapp", whatsappRoutes)
app.use("/api/contacts", contactRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/chatbots", chatbotRoutes)
app.use("/api/tenants", tenantRoutes)
app.use("/api/admin", adminRoutes)
console.log("✅ Rotas configuradas com sucesso")

// Health check
app.get("/health", async (req, res) => {
  try {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: "supabase",
    })
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    })
  }
})

app.get("/api/health", async (req, res) => {
  try {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: "supabase",
    })
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    })
  }
})

app.get("/", (req, res) => {
  res.json({
    message: "WhatsApp CRM Backend API",
    version: "1.0.0",
    status: "running",
    routes: {
      auth: "/api/auth",
      whatsapp: "/api/whatsapp",
      contacts: "/api/contacts",
      messages: "/api/messages",
      chatbots: "/api/chatbots",
      tenants: "/api/tenants",
      admin: "/api/admin",
    },
  })
})

const PORT = process.env.PORT || 3001
httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`
🚀 Servidor rodando na porta ${PORT}
📱 WhatsApp CRM SaaS iniciado
🌍 Ambiente: ${process.env.NODE_ENV || "development"}
💾 Database: Supabase
🔗 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:3000"}
  `)
})

// Tratamento de erros não capturados
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err)
})

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err)
})

export { io, supabase }
