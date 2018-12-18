define('JSXComponent', [], function () {
    return class JSXComponent {
        constructor(props) {
            this.state = {};
            this.refs = null;
            this.props = props;
        }
        render() {
            throw new Error('Not Implemented');
        }
        setState(state, callback) {
            this.state = state;
        }
        forceUpdate(callBack) {
            throw new Error('Not Implemented');
        }
    };
});
