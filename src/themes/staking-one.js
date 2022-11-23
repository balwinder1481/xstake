import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Staking from '../components/Staking/StakingOne';
import Cta from '../components/Cta/Cta';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';

class StakingOne extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="main">
                <Header />
                {/* <Breadcrumb title="Staking" subpage="Staking" page="Staking" /> */}
                <Staking {...this.props} />
                {/* <Cta /> */}
                <Footer />
                <ModalSearch />
                <ModalMenu />
            </div>
        );
    }
}

export default StakingOne;