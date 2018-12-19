define('JSXComponent', ['Backbone'], function (ReactNode) {
    return /** @class */ (function () {
        function JSXComponent(props) {
            this.refs = null;
            this.props = props;
        }
        JSXComponent.prototype.render = function () {
            throw new Error('Not Implemented');
        };
        JSXComponent.prototype.setState = function (state, callback) {
            this.state = state;
        };
        JSXComponent.prototype.forceUpdate = function (callBack) {
            throw new Error('Not Implemented');
        };
        return JSXComponent;
    }());
});
