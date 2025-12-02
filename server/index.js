import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import rateLimit from "express-rate-limit"
import dotenv from "dotenv"
import { whatsappManager } from "./services/whatsapp-manager.service.js"
import { supabase } from "./config/supabase.js"

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

app.get("/api/whatsapp/sessions", async (req, res) => {
  try {
    console.log("[v0] GET /api/whatsapp/sessions - fetching real sessions")

    const { data: sessions, error } = await supabase
      .from("whatsapp_sessions")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    const transformedSessions =
      sessions?.map((session) => ({
        _id: session.id,
        sessionId: session.session_id,
        name: session.name,
        phoneNumber: session.phone_number,
        status: session.status,
        qrCode: session.qr_code,
        lastConnected: session.last_connected,
        isConnected: session.status === "ready",
      })) || []

    res.json({
      sessions: transformedSessions,
      total: transformedSessions.length,
    })
  } catch (error) {
    console.error("Error fetching sessions:", error)
    res.status(500).json({ error: error.message })
  }
})

app.post("/api/whatsapp/sessions", async (req, res) => {
  try {
    console.log("[v0] POST /api/whatsapp/sessions:", req.body)
    const { name } = req.body

    if (!name) {
      return res.status(400).json({ error: "Nome da sessão é obrigatório" })
    }

    const sessionId = `session-${Date.now()}`

    const { data: newSession, error } = await supabase
      .from("whatsapp_sessions")
      .insert([
        {
          session_id: sessionId,
          name,
          status: "disconnected",
          is_active: true,
        },
      ])
      .select()
      .single()

    if (error) throw error

    const transformedSession = {
      _id: newSession.id,
      sessionId: newSession.session_id,
      name: newSession.name,
      status: newSession.status,
      isConnected: false,
    }

    setTimeout(async () => {
      try {
        await whatsappManager.initializeSession(sessionId)
        console.log(`[v0] Auto-initialized WhatsApp session: ${sessionId}`)
      } catch (error) {
        console.error(`[v0] Failed to auto-initialize session ${sessionId}:`, error)
      }
    }, 1000)

    res.status(201).json({
      success: true,
      message: "Sessão criada - iniciando conexão...",
      session: transformedSession,
    })
  } catch (error) {
    console.error("Error creating session:", error)
    res.status(500).json({ error: error.message })
  }
})

app.get("/api/whatsapp/sessions/:sessionId/qr", async (req, res) => {
  try {
    const { sessionId } = req.params
    console.log("[v0] GET /api/whatsapp/sessions/:sessionId/qr:", sessionId)

    const { data: session, error } = await supabase
      .from("whatsapp_sessions")
      .select("qr_code, status")
      .eq("session_id", sessionId)
      .single()

    if (error) throw error

    res.json({
      qrCode: session.qr_code,
      status: session.status,
      message: session.qr_code ? "Escaneie o QR code no WhatsApp" : "Conecte a sessão para gerar QR code",
    })
  } catch (error) {
    console.error("Error fetching QR code:", error)
    res.status(500).json({ error: error.message })
  }
})

app.post("/api/whatsapp/sessions/:sessionId/disconnect", async (req, res) => {
  try {
    const { sessionId } = req.params
    console.log("[v0] POST /api/whatsapp/sessions/:sessionId/disconnect:", sessionId)

    await whatsappManager.disconnectSession(sessionId)

    res.json({
      success: true,
      message: "Sessão desconectada com sucesso",
    })
  } catch (error) {
    console.error("Error disconnecting session:", error)
    res.status(500).json({ error: error.message })
  }
})

app.post("/api/whatsapp/sessions/:sessionId/connect", async (req, res) => {
  try {
    const { sessionId } = req.params
    console.log("[v0] POST /api/whatsapp/sessions/:sessionId/connect:", sessionId)

    await whatsappManager.initializeSession(sessionId)

    res.json({
      success: true,
      message: "Sessão iniciando - aguarde o QR code",
    })
  } catch (error) {
    console.error("Error connecting session:", error)
    res.status(500).json({ error: error.message })
  }
})

app.post("/api/whatsapp/send", async (req, res) => {
  try {
    console.log("[v0] POST /api/whatsapp/send:", req.body)
    const { sessionId, to, content } = req.body

    if (!sessionId || !to || !content) {
      return res.status(400).json({ error: "sessionId, to e content são obrigatórios" })
    }

    const sentMessage = await whatsappManager.sendMessage(sessionId, to, content)

    res.json({
      success: true,
      message: "Mensagem enviada com sucesso",
      messageId: sentMessage.id._serialized,
    })
  } catch (error) {
    console.error("Error sending message:", error)
    res.status(500).json({ error: error.message })
  }
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
║ 💬 WhatsApp: ATIVO ${" ".repeat(14)}║
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
