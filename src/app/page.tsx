export default function HomePage() {
    return (
        <main
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                fontFamily: "Arial",
                textAlign: "center",
            }}
        >
            <h1>Hệ thống quản lý Feedback</h1>

            <p>Trang quản trị dùng để xem phản hồi người dùng từ ứng dụng.</p>

            <a
                href="/feedback"
                style={{
                    marginTop: 20,
                    padding: "10px 20px",
                    background: "#0070f3",
                    color: "#fff",
                    borderRadius: 6,
                    textDecoration: "none",
                    fontWeight: "bold",
                }}
            >
                Xem danh sách Feedback
            </a>
        </main>
    );
}