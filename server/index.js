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

const mockSessions = []

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

app.get("/api/auth/me", (req, res) => {
  console.log("[v0] GET /api/auth/me")
  res.json({
    user: {
      id: "demo-user",
      email: "cesar.mediotec@gmail.com",
      name: "Demo User",
      role: "admin",
    },
    message: "Auth funcionando - usuário demo",
  })
})

app.post("/api/auth/login", (req, res) => {
  console.log("[v0] POST /api/auth/login:", req.body)
  const { email, password } = req.body

  res.json({
    success: true,
    user: {
      id: "demo-user",
      email: email || "demo@example.com",
      name: "Demo User",
      role: "admin",
    },
    token: "demo-token-" + Date.now(),
    message: "Login funcionando - auth será implementado em breve",
  })
})

app.post("/api/auth/register", (req, res) => {
  console.log("[v0] POST /api/auth/register:", req.body)
  const { email, password, name } = req.body

  res.status(201).json({
    success: true,
    user: {
      id: "demo-user-" + Date.now(),
      email,
      name,
      role: "user",
    },
    token: "demo-token-" + Date.now(),
    message: "Registro funcionando - auth será implementado em breve",
  })
})

app.post("/api/auth/logout", (req, res) => {
  console.log("[v0] POST /api/auth/logout")
  res.json({
    success: true,
    message: "Logout realizado com sucesso",
  })
})

app.post("/api/auth/refresh", (req, res) => {
  console.log("[v0] POST /api/auth/refresh")
  res.json({
    success: true,
    token: "demo-token-refreshed-" + Date.now(),
    message: "Token refresh funcionando",
  })
})

app.get("/", (req, res) => {
  res.json({
    message: "WhatsApp CRM Backend API",
    status: "running",
    version: "2.0.0",
    endpoints: {
      health: "/health",
      auth: "/api/auth/*",
      sessions: "/api/whatsapp/sessions",
      qr: "/api/whatsapp/sessions/:sessionId/qr",
      disconnect: "/api/whatsapp/sessions/:sessionId/disconnect",
      connect: "/api/whatsapp/sessions/:sessionId/connect",
      sendMessage: "/api/whatsapp/send",
    },
  })
})

app.get("/api/whatsapp/sessions", (req, res) => {
  console.log("[v0] GET /api/whatsapp/sessions")
  res.json({
    sessions: mockSessions,
    total: mockSessions.length,
    message: "Backend funcionando - WhatsApp será implementado em breve",
  })
})

app.post("/api/whatsapp/sessions", (req, res) => {
  console.log("[v0] POST /api/whatsapp/sessions:", req.body)
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ error: "Nome da sessão é obrigatório" })
  }

  const newSession = {
    _id: "session-" + Date.now(),
    sessionId: "session-" + Date.now(),
    name,
    status: "qr",
    isConnected: false,
    lastConnected: null,
    phoneNumber: null,
  }

  mockSessions.push(newSession)

  res.status(201).json({
    success: true,
    message: "Sessão criada - conecte para gerar QR code",
    session: newSession,
  })
})

app.get("/api/whatsapp/sessions/:sessionId/qr", (req, res) => {
  console.log("[v0] GET /api/whatsapp/sessions/:sessionId/qr:", req.params.sessionId)

  const mockQRCode =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAIAAAD2HxkiAAAG6ElEQVR42u3dQW4jMQwFwJz/0r5Fjt5dBRaQzVSSH4UBBpPJZP78+fPnz58/f/78+fPnz58/f/78+fPnz58/f/78+fPnz58/f/78+fPnz58/f/78+fPnz58/f/78+fPnz58/f/78+fPnz58/f/78+fPnz58/f/78+fPnz58/f/78+fPnz58/f/78+fPnz58/f/78+fPnz58/f/78+fPnz58/f/78+fPnz58/f/78+fPnz58/f/78+fPnz58/f/78+fPnz58/f/78+Q=="

  res.json({
    qrCode: mockQRCode,
    status: "qr",
    message: "QR code demo - escaneie para testar (não funcionará de verdade ainda)",
  })
})

app.post("/api/whatsapp/sessions/:sessionId/disconnect", (req, res) => {
  console.log("[v0] POST /api/whatsapp/sessions/:sessionId/disconnect:", req.params.sessionId)
  res.json({
    success: true,
    message: "Desconexão será implementada em breve",
  })
})

app.post("/api/whatsapp/sessions/:sessionId/connect", (req, res) => {
  console.log("[v0] POST /api/whatsapp/sessions/:sessionId/connect:", req.params.sessionId)
  res.json({
    success: true,
    message: "Conexão será implementada em breve",
  })
})

app.post("/api/whatsapp/send", (req, res) => {
  console.log("[v0] POST /api/whatsapp/send:", req.body)
  res.json({
    success: true,
    message: "Envio de mensagens será implementado em breve",
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
