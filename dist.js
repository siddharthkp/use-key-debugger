"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var symbolKeys = {
  ArrowRight: '▶',
  ArrowLeft: '◀',
  ArrowUp: '▲',
  ArrowDown: '▼'
};

var useKeyDebugger = function useKeyDebugger() {
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      keys = _useState2[0],
      setKeys = _useState2[1];
  /* keydown */


  (0, _react.useEffect)(function () {
    var handleKeyDown = function handleKeyDown(event) {
      setKeys(keys.concat([event.key]));
    };

    window.addEventListener('keydown', handleKeyDown);
    return function cleanup() {
      return window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keys.length]);
  /* keyup with delay */

  (0, _react.useEffect)(function () {
    var timeout;

    var handleKeyUp = function handleKeyUp(event) {
      timeout = setTimeout(function () {
        setKeys([]);
      }, 1000);
    };

    window.addEventListener('keyup', handleKeyUp);
    return function cleanup() {
      window.removeEventListener('keyup', handleKeyUp);
      clearTimeout(timeout);
    };
  }, [keys.length]);
  return function (props) {
    if (keys.length) {
      var list = keys.map(function (key) {
        return symbolKeys[key] || key;
      }).join(' ');
      return _react.default.createElement("div", _extends({
        style: styles
      }, props), list);
    } else return null;
  };
};

var _default = useKeyDebugger;
exports.default = _default;
var styles = {
  position: 'fixed',
  top: '30px',
  right: '30px',
  minHeight: '50px',
  minWidth: '50px',
  padding: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#aaa',
  background: '#eff0f2',
  fontSize: '28px',
  borderRadius: '5px',
  borderTop: '1px solid #f5f5f5',
  boxShadow: 'inset 0 0 25px #e8e8e8, 0 1px 0 #c3c3c3, 0 2px 0 #c9c9c9',
  textShadow: '0px 1px 0px #f5f5f5'
};
