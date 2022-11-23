import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = "https://my-json-server.typicode.com/themeland/gameon-json/cta";

class Cta extends Component {
    state = {
        data: {}
    }
    componentDidMount(){
        axios.get(`${BASE_URL}`)
            .then(res => {
                this.setState({
                    data: res.data
                })
                // console.log(this.state.data)
            })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <section className="cta-area p-0">
                <div className="container">
                    <div className="row">
                        <div className="col-12 card">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-12 col-md-5 text-center">
                                    <img src={this.state.data.img} alt="" />
                                </div>
                                <div className="col-12 col-md-6 mt-4 mt-md-0">
                                    <h2 className="m-0">Purchase $XTK Now</h2>
                                    <p>Get access to huge community and become a contributor to bring blockchain technology to next level.</p>
                                    <a className="btn btn-bordered active d-inline-block" href="/swap"><i className="{this.state.data.btnIcon}" />Purchase $XTK</a>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Cta;