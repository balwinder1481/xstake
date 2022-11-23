import React, { Component } from 'react';


class Content extends Component {
    state = {
        data: {},
        contentData: []
    }
    componentDidMount(){
        const contentData = [
            {
                "id": 1,
                "icon": "fa fa-shopping-cart",
                "featured": "",
                "title": "Purchase $XTK",
                "content": "$XTK is available on https://xswap.uk"
            },
            {
                "id": 2,
                "icon": "fa-brands fa-hotjar",
                "featured": "featured",
                "title": "Visit on-chain Staking Page",
                "content": "Head to https://xstake.live/. Choose staking there and stake your desired amount to the contract. You will get great rewads of staking."
            },
            {
                "id": 3,
                "icon": "fa-solid fa-rocket",
                "featured": "",
                "title": "Start Staking",
                "content": "You will get extra ordenary staking yeids because $XTK is lequidity provider itself and providing multi-chain lequidity already to various projects."
            }
        ]
        this.setState({
            data: [],
            contentData
        })
    }
    render() {
        return (
            <section className="content-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-6">
                            <div className="content intro">
                            <span className="intro-text">Participate in $XTK Stake</span>
                            <h2>Multi-chain liquidity Programe</h2>
                            <p>Purchase $XTK in a single click https://xswap.uk. Become a part of worlds#1 liquidity provider and get rewarded by staking $XTK on-chain staking programe.</p>
                            <ul className="list-unstyled items mt-5">
                                {this.state.contentData.map((item, idx) => {
                                    return (
                                        <li key={`cd_${idx}`} className="item">
                                            {/* Content List */}
                                            <div className="content-list d-flex align-items-center">
                                                <div className="content-icon">
                                                <span className={item.featured}>
                                                    <i className={item.icon} />
                                                </span>
                                                </div>
                                                <div className="content-body ml-4">
                                                <h3 className="m-0">{item.title}</h3>
                                                <p className="mt-3">{item.content}</p>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            {/* Blockchain Animation */}
                            <div className="wrapper-animation d-none d-md-block">
                                <div className="blockchain-wrapper">
                                    <div className="pyramid">
                                        <div className="square">
                                            <div className="triangle" />
                                            <div className="triangle" />
                                            <div className="triangle" />
                                            <div className="triangle" />
                                        </div>
                                    </div>
                                    <div className="pyramid inverse">
                                        <div className="square">
                                            <div className="triangle" />
                                            <div className="triangle" />
                                            <div className="triangle" />
                                            <div className="triangle" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Content;