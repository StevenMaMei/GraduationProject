"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumTS = void 0;
var NumTS;
(function (NumTS) {
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
    NumTS.matrixDotProduct = matrixDotProduct;
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
    NumTS.matrixSum = matrixSum;
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
    NumTS.matrixElemtWiseMult = matrixElemtWiseMult;
    function matrixMultWithSingleValue(a, b) {
        let n = a.length;
        let m = a[0].length;
        let toReturn = [];
        for (let i = 0; i < n; i++) {
            toReturn[i] = [];
            for (let j = 0; j < m; j++) {
                toReturn[i][j] = a[i][j] * b;
            }
        }
        return toReturn;
    }
    NumTS.matrixMultWithSingleValue = matrixMultWithSingleValue;
    function matrixTransposse(a) {
        let n = a.length;
        let m = a[0].length;
        let toReturn = [];
        for (let i = 0; i < m; i++) {
            toReturn[i] = [];
            for (let j = 0; j < n; j++) {
                toReturn[i][j] = a[j][i];
            }
        }
        return toReturn;
    }
    NumTS.matrixTransposse = matrixTransposse;
    function tanhPrime(a) {
        return 1 - Math.tanh(a) * Math.tanh(a);
    }
    function matrixTanh(a) {
        let n = a.length;
        let m = a[0].length;
        let toReturn = [];
        for (let i = 0; i < n; i++) {
            toReturn[i] = [];
            for (let j = 0; j < m; j++) {
                toReturn[i][j] = Math.tanh(a[i][j]);
            }
        }
        return toReturn;
    }
    NumTS.matrixTanh = matrixTanh;
    function matrixTanhPrime(a) {
        let n = a.length;
        let m = a[0].length;
        let toReturn = [];
        for (let i = 0; i < n; i++) {
            toReturn[i] = [];
            for (let j = 0; j < m; j++) {
                toReturn[i][j] = tanhPrime(a[i][j]);
            }
        }
        return toReturn;
    }
    NumTS.matrixTanhPrime = matrixTanhPrime;
    function mse(predictedOutput, targetOutput) {
        let ans = 0;
        for (let i = 0; i < targetOutput.length; i++) {
            for (let j = 0; j < targetOutput[i].length; j++) {
                let square = Math.pow((targetOutput[i][j] - predictedOutput[i][j]), 2);
                ans += square;
            }
        }
        ans /= targetOutput.length;
        return ans;
    }
    NumTS.mse = mse;
    function msePrime(predictedOutput, targetOutput) {
        let ans = [];
        ans[0] = [];
        for (let i = 0; i < targetOutput[0].length; i++) {
            ans[0][i] = 2 * (predictedOutput[0][i] - targetOutput[0][i]) / targetOutput[0].length;
        }
        return ans;
    }
    NumTS.msePrime = msePrime;
    function binary_cross_entropy(predictedOutput, targetOutput) {
        let sum_score = 0;
        for (let i = 0; i < targetOutput.length; i++) {
            for (let j = 0; j < targetOutput[i].length; j++) {
                sum_score += targetOutput[i][j] * Math.log(predictedOutput[i][j]);
            }
        }
        sum_score /= targetOutput.length;
        return -sum_score;
    }
    NumTS.binary_cross_entropy = binary_cross_entropy;
    function binary_cross_entropyPrime(predictedOutput, targetOutput) {
        let ans = [];
        ans[0] = [];
        for (let i = 0; i < targetOutput[0].length; i++) {
            ans[0][i] = (targetOutput[0][i] * (predictedOutput[0][i] - 1)) + ((1 - targetOutput[0][i]) * predictedOutput[0][i]);
        }
        return ans;
    }
    NumTS.binary_cross_entropyPrime = binary_cross_entropyPrime;
})(NumTS || (NumTS = {}));
exports.NumTS = NumTS;
