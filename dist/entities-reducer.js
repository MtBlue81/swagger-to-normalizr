"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetMetaCreator = resetMetaCreator;
exports.createReducer = createReducer;

var _immutable = require("immutable");

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function getNewEntities(action) {
  return action.payload && action.payload.entities;
}

function resetMetaCreator() {
  return {
    reset: true
  };
}
/**
 * immutable.js based entities reducer
 */


var EntitiesReducer = /*#__PURE__*/function () {
  function EntitiesReducer() {
    var Models = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _immutable.Map)();
    var additionalReducer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (state) {
      return state;
    };

    _classCallCheck(this, EntitiesReducer);

    this.Models = Models;
    this.initialState = initialState;
    this.additionalReducer = additionalReducer;
    this.reduce = this.reduce.bind(this);
  }

  _createClass(EntitiesReducer, [{
    key: "reduce",
    value: function reduce() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.initialState;
      var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var newEntities = getNewEntities(action);

      if (newEntities) {
        state = this._mergeEntities(state, newEntities, action);
      }

      return this.additionalReducer(state, action);
    }
  }, {
    key: "_mergeEntities",
    value: function _mergeEntities(state, newEntities) {
      var _this = this;

      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          meta = _ref.meta;

      var reset = meta && meta.reset;
      return state.withMutations(function (state) {
        (0, _immutable.fromJS)(newEntities).forEach(function (entities, modelName) {
          entities.forEach(function (entity, id) {
            if (reset || !state.hasIn([modelName, id])) {
              state.setIn([modelName, id], _this._instantiate(entity, modelName));
            } else {
              state.updateIn([modelName, id], function (oldEntity) {
                return oldEntity.mergeDeepWith(merger, _this._instantiate(entity, modelName));
              });
            }
          });
        });
      });
    }
  }, {
    key: "_instantiate",
    value: function _instantiate(entity, modelName) {
      return this.Models[modelName] ? new this.Models[modelName](entity) : entity;
    }
  }]);

  return EntitiesReducer;
}();

var merger = function merger(prev, next) {
  return (0, _isUndefined.default)(next) ? prev : next;
};

function createReducer(Models) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      initialState = _ref2.initialState,
      additionalReducer = _ref2.additionalReducer;

  var reducer = new EntitiesReducer(Models, initialState, additionalReducer);
  return reducer.reduce;
}