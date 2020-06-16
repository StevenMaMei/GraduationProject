"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numTS = void 0;
var numTS;
(function (numTS) {
    function matrixDotProduct(a, b) {
        let n = a.length;
        let m = b[0].length;
        let toReturn = [];
        for (let i = 0; i < n; i++) {
            toReturn[i] = [];
            for (let j = 0; j < m; j++) {
                let ans = 0;
                for (let k = 0; k < b.length; k++) {
                    ans += a[i][k] * b[k][j];
                }
                toReturn[i][j] = ans;
            }
        }
        return toReturn;
    }
    numTS.matrixDotProduct = matrixDotProduct;
    function matrixSum(a, b) {
        let n = a.length;
        let m = b[0].length;
        let toReturn = [];
        for (let i = 0; i < n; i++) {
            toReturn[i] = [];
            for (let j = 0; j < m; j++) {
                toReturn[i][j] = a[i][j] + b[i][j];
            }
        }
        return toReturn;
    }
    numTS.matrixSum = matrixSum;
    function matrixElemtWiseMult(a, b) {
        let n = a.length;
        let m = b[0].length;
        let toReturn = [];
        for (let i = 0; i < n; i++) {
            toReturn[i] = [];
            for (let j = 0; j < m; j++) {
                toReturn[i][j] = a[i][j] * b[i][j];
            }
        }
        return toReturn;
    }
    numTS.matrixElemtWiseMult = matrixElemtWiseMult;
})(numTS || (numTS = {}));
exports.numTS = numTS;
