// ✅ server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // Node 18 이상이면 기본 내장 fetch 사용 가능

const app = express();
const PORT = 5000;

// ✅ 환경 설정
app.use(cors());
app.use(express.json());

// ✅ Gemini API 요청 프록시
app.post("/api/gemini", async (req, res) => {
  try {
    const API_KEY = "AIzaSyAWv2SjUdrM1n-flUSaHa3wHCiS1zfuGX8";
    const GEMINI_URL =
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;

    // 클라이언트(React)에서 보낸 payload 받기
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data); // 그대로 React로 전달
  } catch (error) {
    console.error("❌ Gemini API Proxy Error:", error);
    res.status(500).json({ error: "서버에서 오류가 발생했습니다." });
  }
});

// ✅ 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 Gemini Proxy Server is running on http://localhost:${PORT}`);
});
