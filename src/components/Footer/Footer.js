import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = "https://my-json-server.typicode.com/themeland/gameon-json/footer";

class Footer extends Component {
    state = {
        data: {},
        socialData: [],
        widgetData: []
    }
    componentDidMount(){
        axios.get(`${BASE_URL}`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    data: res.data,
                    socialData: [
                        {
                          "id": 1,
                          "link": "https://www.facebook.com/XOTIK-TECH-107782108459799/",
                          "icon": "icon-social-facebook"
                        },
                        {
                          "id": 2,
                          "link": "https://twitter.com/IoXotik/",
                          "icon": "icon-social-twitter"
                        },
                        
                        {
                          "id": 3,
                          "link": "https://www.youtube.com/channel/UCubUvwePG_87d9wRuj2jf3w/",
                          "icon": "icon-social-youtube"
                        },
                        {
                            "id": 4,
                            "link": "https://www.instagram.com/xotik.io/",
                            "icon": "icon-social-instagram"
                          }
            
                      ],
                    widgetData: [
                        {
                          "id": 1,
                          "text": "Features",
                          "link": "/blog"
                        },
                        {
                          "id": 2,
                          "text": "Roadmap",
                          "link": "/blog"
                        },
                        {
                          "id": 3,
                          "text": "How It Works",
                          "link": "/blog"
                        },
                        {
                          "id": 4,
                          "text": "Blog",
                          "link": "/blog"
                        },
                        {
                          "id": 5,
                          "text": "Privacy Policy",
                          "link": "/blog"
                        }
                      ]
                })
                // console.log(this.state.data)
            })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <footer className="footer-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 text-center">
                            {/* Footer Items */}
                            <div className="footer-items">
                                {/* Logo */}
                                <a className="navbar-brand" href="/home">
                                    <img src={this.state.data.img} alt="" />
                                </a>
                                {/* Social Icons */}
                                <div className="social-icons d-flex justify-content-center my-4">
                                    {this.state.socialData.map((item, idx) => {
                                        return (
                                            <a key={`fsd_${idx}`} className="facebook" href={item.link} target="_blank" rel="noreferrer">
                                                <i className={item.icon} />
                                                <i className={item.icon} />
                                            </a>
                                        );
                                    })}
                                </div>
                                {/* <ul className="list-inline">
                                    {this.state.widgetData.map((item, idx) => {
                                        return (
                                            <li key={`fwd_${idx}`} className="list-inline-item"><a href={item.link}>{item.text}</a></li>
                                        );
                                    })}
                                </ul> */}
                                {/* Copyright Area */}
                                <div className="copyright-area py-4">©2022 XOTIK, All Rights Reserved By <a href= "https://xotik.io" rel="noreferrer" target="_blank">XOTIK Faundation</a></div>
                                <div className="copyright-area py-4">Staking Contract: <a href= "https://polygonscan.com/address/0x901C20b7F24557666b731C4EF02dEee0b1e402dA" rel="noreferrer" target="_blank">Deployed on polygon Chain</a></div>
                            </div>
                            
                            {/* Scroll To Top */}
                            <div id="scroll-to-top" className="scroll-to-top">
                                <a href="#header" className="smooth-anchor">
                                    <i className="fa-solid fa-arrow-up" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;