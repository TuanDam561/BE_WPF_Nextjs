"use client";

import { useEffect, useState } from "react";
import "./feedback.css";


type Image = {
    Image_Id: string;
    Url_Image: string;
};

type User = {
    Name: string;
    Email: string;
};

type Feedback = {
    Id: string;
    Content: string;
    Create_Date: string;
    User: User;
    Images: Image[];
};

export default function FeedbackPage() {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);

    const [activeImage, setActiveImage] = useState<string | null>(null);
    const [zoom, setZoom] = useState(1);

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [start, setStart] = useState({ x: 0, y: 0 });

    const openImage = (url: string) => {
        setActiveImage(url);
        setZoom(1);
        setPosition({ x: 0, y: 0 });
    };

    const closeImage = () => {
        setActiveImage(null);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (zoom <= 1) return;
        setDragging(true);
        setStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!dragging) return;

        setPosition({
            x: e.clientX - start.x,
            y: e.clientY - start.y
        });
    };

    const handleMouseUp = () => {
        setDragging(false);
    };



    useEffect(() => {
        const baseUrl = process.env.DOMAIN || process.env.DOMAINLOCAL
        fetch(baseUrl + "/feedback")
            .then((res) => res.json())
            .then((res) => {
                setFeedbacks(res.data);
                setLoading(false);
            });
    }, []);

    // const openImage = (url: string) => {
    //     setActiveImage(url);
    //     setZoom(1);
    // };

    // const closeImage = () => {
    //     setActiveImage(null);
    //     setZoom(1);
    // };

    if (loading) return <div className="loading">Đang tải dữ liệu...</div>;

    return (
        <div className="page">
            <div className="container">

                <h1 className="title">Feedback người dùng</h1>

                {feedbacks.map((fb) => (
                    <div key={fb.Id} className="card">

                        <div className="header">
                            <div className="avatar">
                                {fb.User?.Name?.charAt(0)}
                            </div>

                            <div>
                                <div className="name">{fb.User?.Name}</div>
                                <div className="email">{fb.User?.Email}</div>
                                <div className="date">
                                    {new Date(fb.Create_Date).toLocaleString()}
                                </div>
                            </div>
                        </div>

                        <div className="content">{fb.Content}</div>

                        {fb.Images.length > 0 && (
                            <div className="imageGrid">
                                {fb.Images.map((img) => (
                                    <img
                                        key={img.Image_Id}
                                        src={img.Url_Image}
                                        onClick={() => openImage(img.Url_Image)}
                                    />
                                ))}
                            </div>
                        )}

                    </div>
                ))}

            </div>

            {/* IMAGE OVERLAY */}
            {activeImage && (
                <div className="overlay" onClick={closeImage}>

                    <div className="overlayContent" onClick={(e) => e.stopPropagation()}>

                        <img
                            src={activeImage}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            style={{
                                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                                cursor: zoom > 1 ? (dragging ? "grabbing" : "grab") : "default"
                            }}
                        />

                        <div className="overlayControls">

                            <button onClick={() => setZoom((z) => z + 0.2)}>+</button>

                            <button
                                onClick={() =>
                                    setZoom((z) => (z > 0.4 ? z - 0.2 : z))
                                }
                            >
                                -
                            </button>

                            <button onClick={closeImage}>✕</button>

                        </div>

                    </div>

                </div>
            )}
        </div>
    );
}