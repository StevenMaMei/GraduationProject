
module NumTS{
    
    export function matrixDotProduct(a: number[][], b:number[][]):number[][]{
        let n: number= a.length;
        let m: number = b[0].length;
        let toReturn: number[][]=[];
    
        for(let i:number=0; i<n;i++){
            toReturn[i]=[];
            for(let j:number=0;j<m;j++){
                let ans:number =0;
                for(let k: number=0; k<b.length;k++){
                    ans += a[i][k]*b[k][j];
                }
                toReturn[i][j]=ans;
            }
        }
        return toReturn;
    }

    export function matrixSum(a: number[][], b:number[][]):number[][]{
        let n: number= a.length;
        let m: number = b[0].length;
        let toReturn: number[][]=[];
    
        for(let i:number=0; i<n;i++){
            toReturn[i]=[];
            for(let j:number=0;j<m;j++){
                toReturn[i][j]=a[i][j]+b[i][j];
            }
        }
        return toReturn;
    }

    export function matrixElemtWiseMult(a: number[][], b:number[][]):number[][]{
        let n: number= a.length;
        let m: number = b[0].length;
        let toReturn: number[][]=[];
    
        for(let i:number=0; i<n;i++){
            toReturn[i]=[];
            for(let j:number=0;j<m;j++){
                toReturn[i][j]=a[i][j]*b[i][j];
            }
        }
        
        return toReturn;
    }
    export function matrixMultWithSingleValue(a: number[][], b:number):number[][]{
        let n: number= a.length;
        let m: number = a[0].length;
        let toReturn: number[][]=[];
    
        for(let i:number=0; i<n;i++){
            toReturn[i]=[];
            for(let j:number=0;j<m;j++){
                toReturn[i][j]=a[i][j]*b;
            }
        }
        return toReturn;
    }
    export function matrixTransposse(a: number[][]):number[][]{
        let n: number= a.length;
        let m: number = a[0].length;
        let toReturn: number[][]=[];
    
        for(let i:number=0; i<m;i++){
            toReturn[i]=[];
            for(let j:number=0;j<n;j++){
                toReturn[i][j]=a[j][i];
            }
        }
        return toReturn;
    }
    function tanhPrime(a: number):number{
        return 1- Math.tanh(a)*Math.tanh(a);
    }
    export function matrixTanh(a:number[][]): number[][]{
        let n: number= a.length;
        let m: number = a[0].length;
        let toReturn: number[][]=[];
        for(let i:number=0; i<n;i++){
            toReturn[i]=[];
            for(let j:number=0;j<m;j++){
                toReturn[i][j]=Math.tanh(a[i][j]);
            }
        }
        return toReturn;
    }
    export function matrixTanhPrime(a:number[][]):number[][]{
        let n: number= a.length;
        let m: number = a[0].length;
        let toReturn: number[][]=[];
        for(let i:number=0; i<n;i++){
            toReturn[i]=[];
            for(let j:number=0;j<m;j++){
                toReturn[i][j]=tanhPrime(a[i][j]);
            }
        }
        return toReturn;
    }

    export function mse(predictedOutput: number[][], targetOutput: number[][]):number{
        let ans:number=0;
        for(let i = 0; i<targetOutput.length;i++){
            for(let j = 0; j<targetOutput[i].length;j++){
                let square=Math.pow((targetOutput[i][j] - predictedOutput[i][j]),2);
                ans += square;
            }
        }  
        ans /= targetOutput.length;
        return ans;
    }

    export function msePrime(predictedOutput: number[][], targetOutput: number[][]):number[][]{
        let ans : number[][]=[];
        ans[0]=[];
        for(let i=0 ; i<targetOutput[0].length;i++){
            ans[0][i]= 2*(predictedOutput[0][i] - targetOutput[0][i])/targetOutput[0].length;
        }
        return ans;
    }
}

export{NumTS};