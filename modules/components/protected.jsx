import React from 'react';

const ProtectedComponent = () => <h3>Protected</h3>

class Protected extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      return <ProtectedComponent {...this.props} />
    }
};

export default Protected