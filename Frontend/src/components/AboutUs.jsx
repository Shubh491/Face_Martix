import React from 'react';
import { useNavigate } from "react-router-dom";

const AboutUs = () =>{
    const navigate = useNavigate();
    return(
        <>
        <div className='app-container'>
        <h2 className='title'>Meet Our Team</h2>
        <div class="team">
            <div class="row">
                <div class="card">
                    <div class="content">
                        <img src="./team1.jpg" alt="Team Member 1"/>
                        <div class="image_overlay image_overlay--blur">
                            <div class="image_title">Rohan Mishra</div>
                            <p class="image_description">
                                Backend Developer
                                    (Leader)
                            </p>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="content">
                        <img src="./team2.jpg" alt="Team Member 2"/>
                        <div class="image_overlay image_overlay--blur">
                            <div class="image_title">Vinay Gore</div>
                            <p class="image_description">
                                Frontend(UI/UX) Designer
                            </p>
                        </div>   
                    </div>
                </div>
                <div class="card">
                    <div class="content">
                        <img src="./team3.jpg" alt="Team Member 3"/>
                        <div class="image_overlay image_overlay--blur">
                            <div class="image_title">Sarvyagya Prakash</div>
                            <p class="image_description">
                                Frontend Developer
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="card">
                    <div class="content">
                        <img src="./team4.jpg" alt="Team Member 4"/>
                        <div class="image_overlay image_overlay--blur">
                            <div class="image_title">Rishit Singh</div>
                            <p class="image_description">
                                Database Developer
                            </p>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="content">
                        <img src="./team5.jpg" alt="Team Member 5"/>
                        <div class="image_overlay image_overlay--blur">
                            <div class="image_title">Gautham Suresh</div>
                            <p class="image_description">
                                Backend Developer
                            </p>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="content">
                        <img class="image_img" src="./team6.jpg" alt="Team Member 6"/>
                        <div class="image_overlay image_overlay--blur">
                            <div class="image_title">Abhijeet Kumar</div>
                            <p class="image_description">
                                Database Developer
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button className='button topbtn btwo' onClick={() => navigate("/")}>Home</button>
        </div>
        </>
    );
};

export default AboutUs;