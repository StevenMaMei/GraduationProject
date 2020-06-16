
module numTS{
    
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

}

export{numTS};