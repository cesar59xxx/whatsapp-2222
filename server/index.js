import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import rateLimit from "express-rate-limit"
import dotenv from "dotenv"

import whatsappRoutes from "./routes/whatsapp.routes.js"

dotenv.config()

console.log("🚀 WhatsApp CRM SaaS iniciando...")
console.log("📦 Node.js version:", process.version)
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

// Middleware de segurança
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
)
app.use(compression())

app.use(cors())
app.use(express.json())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Muitas requisições deste IP, tente novamente mais tarde",
})
app.use("/api/", limiter)

app.use(express.urlencoded({ extended: true, limit: "50mb" }))

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

console.log("📍 Configurando rotas da API...")
app.use("/api/whatsapp", whatsappRoutes)

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() })
})

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  })
})

app.get("/", (req, res) => {
  res.json({
    message: "WhatsApp CRM Backend",
    status: "running",
    version: "1.0.0",
  })
})

app.get("/api/whatsapp/sessions", (req, res) => {
  console.log("[v0] GET /api/whatsapp/sessions chamado")
  res.json([])
})

app.post("/api/whatsapp/sessions", (req, res) => {
  console.log("[v0] POST /api/whatsapp/sessions chamado:", req.body)
  res.json({
    success: true,
    message: "Backend respondendo - WhatsApp em desenvolvimento",
    data: { sessionName: req.body.sessionName || "test" },
  })
})

console.log("✅ Rotas configuradas")

app.use((err, req, res, next) => {
  console.error("[v0] Erro:", err)
  res.status(500).json({ error: err.message })
})

const PORT = process.env.PORT || 5000

httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`
=================================
✅ Servidor FUNCIONANDO!
🔗 Porta: ${PORT}
🌐 Health: http://localhost:${PORT}/health
📱 Frontend: ${process.env.FRONTEND_URL || "não configurado"}
=================================
  `)
})

// Tratamento de erros não capturados
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err)
})

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err)
  process.exit(1)
})

// Exportar io para uso em outros módulos
global.io = io

export { io }
