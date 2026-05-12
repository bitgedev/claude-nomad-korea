import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #1B9AAA 0%, #2D9E7A 50%, #2D6A4F 100%)",
          fontFamily: "sans-serif",
          gap: 24,
          position: "relative",
        }}
      >
        {/* 배경 장식 원 */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: "rgba(255,107,53,0.15)",
            display: "flex",
          }}
        />

        {/* 이모지 아이콘 */}
        <div style={{ display: "flex", fontSize: 80, lineHeight: 1 }}>🌿</div>

        {/* 브랜드명 */}
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-1px",
          }}
        >
          Nomad Korea
        </div>

        {/* 설명 — br 대신 flex column으로 줄바꿈 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 26,
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.5,
            gap: 0,
          }}
        >
          <span>실제 노마드들의 리뷰와 데이터로</span>
          <span>최적의 한국 거점 도시를 찾아보세요</span>
        </div>

        {/* 태그 뱃지 */}
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          {["코워킹 스페이스", "밋업", "생활비 정보"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "8px 20px",
                borderRadius: 9999,
                background: "rgba(255,255,255,0.15)",
                color: "#ffffff",
                fontSize: 18,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
