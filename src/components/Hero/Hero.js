import React, { Component } from 'react';

const initData = {
    sub_heading: "XOTIK",
    heading: "The Next Generation Staking & liquidity provider protocol token",
    content: "Ecosystem to provide liquidity to great projects for smooth trading & value creation"
}

class Hero extends Component {
    state = {
        initData: {}
    }
    componentDidMount(){
        this.setState({
            initData: initData
        })
    }
    render() {
        return (
            <section className="hero-section">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                    <div className="col-12 col-md-6 col-lg-9 text-center">
                        {/* Hero Content */}
                        <div className="hero-content">
                        <div className="intro text-center mb-5">
                            <span className="intro-text">{this.state.initData.sub_heading}</span>
                            <h3 className="mt-4">{this.state.initData.heading}</h3>
                            <p>{this.state.initData.content}</p>
                        </div>
                        {/* Buttons */}
                        <div className="button-group">
                        <a className="btn btn-bordered active d-inline-block" href="https://xswap.uk/swap" target="blank"><i className="{this.state.data.btnIcon}" />Purchase $XTK</a>
                            <a className="btn btn-bordered-white" href="/staking"><i className="icon-rocket mr-2" />Stake $XTK</a>
                            {/* <a className="btn btn-bordered-white" href="/apply"><i className="icon-note mr-2" />WhitePaper</a> */}
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Hero;