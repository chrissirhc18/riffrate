import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { getRecentReviews } from "../../firebase/firebaseHelper";
import ReviewCard from "./ReviewCard";

export default function Home() {
    const navigate = useNavigate();

    const [recentReviews, setRecentReviews] = useState([]);

    // Load 3 most recent reviews
    useEffect(() => {
        async function load() {
            const latest = await getRecentReviews(3);
            setRecentReviews(latest);
        }
        load();
    }, []);

    return (
        <div className="home-page">
            <section className="hero-section glass-panel">
                <p className="hero-eyebrow">Live music intel, curated by fans</p>
                <h1>Welcome to Riffrate</h1>
                <p className="hero-subtitle">
                    Track the artists and venues you love, share your standout shows, and help friends
                    discover where the next great night will be.
                </p>

                <div className="hero-buttons">
                    <Button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => navigate("/ReviewByBand")}
                    >
                        See Reviews by Band
                    </Button>

                    <Button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => navigate("/ReviewByVenue")}
                    >
                        See Reviews by Venue
                    </Button>

                    <Button
                        type="button"
                        className="btn btn-cta"
                        onClick={() => navigate("/ReviewPage")}
                    >
                        Write a Review
                    </Button>
                </div>

                <p className="hero-subtext">
                    Join a community of show-goers comparing notes on sound, vibes, and setlists.
                </p>
            </section>

            <section className="feature-grid">
                <div className="feature-card glass-panel">
                    <span className="feature-icon">🎸</span>
                    <h3>Follow Favorite Acts</h3>
                    <p>Pin your go-to artists and never miss when they surface with a new review.</p>
                </div>
                <div className="feature-card glass-panel">
                    <span className="feature-icon">📍</span>
                    <h3>Scout Venues</h3>
                    <p>See how the room sounded, whether the crowd was lively, and if the bar was on point.</p>
                </div>
                <div className="feature-card glass-panel">
                    <span className="feature-icon">💬</span>
                    <h3>Share the Experience</h3>
                    <p>Drop your take in minutes and guide the next listener to an unforgettable show.</p>
                </div>
            </section>

            <section className="recent-section glass-panel">
                <div className="section-header">
                    <div>
                        <p className="hero-eyebrow">Latest buzz</p>
                        <h2>Most Recent Reviews</h2>
                    </div>

                    <Button
                        type="button"
                        className="btn btn-cta btn-cta-outline"
                        onClick={() => navigate("/ReviewPage")}
                    >
                        Add Yours
                    </Button>
                </div>

                <div className="review-grid">
                    {recentReviews.map((review) => (
                        <div className="review-card-wrapper" key={review.id}>
                            <ReviewCard {...review} />
                        </div>
                    ))}
                </div>

                {recentReviews.length === 0 && (
                    <p className="empty-state">
                        No reviews yet — start the conversation with your latest show.
                    </p>
                )}
            </section>
        </div>
    );
}
