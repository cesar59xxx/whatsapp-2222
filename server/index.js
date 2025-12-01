import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import rateLimit from "express-rate-limit"
import dotenv from "dotenv"

dotenv.config()

console.log("🚀 WhatsApp CRM Backend iniciando...")
console.log("📦 Node.js:", process.version)
console.log("🌍 Ambiente:", process.env.NODE_ENV || "development")

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  },
})

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
)
app.use(compression())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: "50mb" }))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
})
app.use("/api/", limiter)

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  })
})

app.get("/", (req, res) => {
  res.json({
    message: "WhatsApp CRM Backend API",
    status: "running",
    version: "2.0.0",
    endpoints: {
      health: "/health",
      sessions: "/api/whatsapp/sessions",
    },
  })
})

app.get("/api/whatsapp/sessions", (req, res) => {
  console.log("[v0] GET /api/whatsapp/sessions")
  res.json({
    sessions: [],
    total: 0,
    message: "Backend funcionando - WhatsApp será implementado em breve",
  })
})

app.post("/api/whatsapp/sessions", (req, res) => {
  console.log("[v0] POST /api/whatsapp/sessions:", req.body)
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ error: "Nome da sessão é obrigatório" })
  }

  res.status(201).json({
    success: true,
    message: "Backend respondendo - sessão será criada em breve",
    session: {
      session_id: "temp-" + Date.now(),
      name,
      status: "pending",
    },
  })
})

app.use((err, req, res, next) => {
  console.error("❌ Erro:", err)
  res.status(500).json({
    error: err.message || "Erro interno do servidor",
  })
})

app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint não encontrado",
    path: req.path,
  })
})

const PORT = process.env.PORT || 5000

httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`
╔═══════════════════════════════════╗
║   ✅ SERVIDOR FUNCIONANDO!        ║
╠═══════════════════════════════════╣
║ 🔗 Porta: ${PORT.toString().padEnd(23)}║
║ 🌐 Health: /health ${" ".repeat(15)}║
║ 📱 Frontend: ${(process.env.FRONTEND_URL || "não configurado").substring(0, 18).padEnd(18)}║
╚═══════════════════════════════════╝
  `)
})

process.on("SIGTERM", () => {
  console.log("SIGTERM recebido, fechando servidor...")
  httpServer.close(() => {
    console.log("Servidor fechado")
    process.exit(0)
  })
})

process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err)
})

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err)
  process.exit(1)
})

global.io = io

export { io }
