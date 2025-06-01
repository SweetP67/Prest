import { useEffect, useState } from "react";
import "./dashboard.css";
import apiRequest from "../../utils/apiRequest";

const Dashboard = () => {
    const [stats, setStats] = useState({ pins: 0, users: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await apiRequest.get("/stats");
                setStats(res.data);
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="dashboard">
            <h1>Dashboard Overview</h1>
                <div className="cards-container">
                    <div className="card">
                        <div className="card-header">
                            <h2>Tổng số ảnh</h2>
                            <h4>Tổng số ảnh trên hệ thống</h4>
                            <i className="fas fa-thumbtack icon blue"></i>
                        </div>
                        <p className="count">{stats.pins}</p>
                        <div className="progress-bar">
                            <div className="progress-fill blue" style={{ width: "100%" }}></div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h2>Số người dùng</h2>
                            <h4>Tổng số người dùng đã đăng ký</h4>
                            <i className="fas fa-users icon purple"></i>
                        </div>
                        <p className="count">{stats.users}</p>
                        <div className="progress-bar">
                            <div className="progress-fill purple" style={{ width: "100%" }}></div>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default Dashboard;
