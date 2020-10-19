import {NumTS} from "../../src/math/numTS";

describe.only("matrixDotProduct test",()=>{
    describe("when [[1,2]] and [[2],[3]] are passed",()=>{
        test("then result shold be [ [ 8 ] ] ",()=>{
            let result : number[][]=NumTS.matrixDotProduct([[1,2]], [[2],[3]]);
            expect(result).toStrictEqual([[8]]);
        });
    });
});

describe("matrixDotProduct test",()=>{
    describe("when [[1,2],[3,4]] and [[5],[6]] are passed",()=>{
        test("then result shold be [[17],[39]] ",()=>{
          
            const result : number[][]=NumTS.matrixDotProduct([[1,2],[3,4]], [[5],[6]]);
            expect(result).toStrictEqual([[17],[39]]);
        });
    });
});

describe("matrixDotProduct test",()=>{
    describe("when [[1,2],[3,4]] and [[5,6],[7,8]] are passed",()=>{
        test("then result shold be [[19,22],[43,50]] ",()=>{
 
            const result : number[][]=NumTS.matrixDotProduct([[1,2],[3,4]], [[5,6],[7,8]]);
            expect(result).toStrictEqual([[19,22],[43,50]]);
        });
    });
});

describe("matrixSum test",()=>{
    describe("when [[1,2],[3,4]] and [[5,6],[7,8]] are passed",()=>{
        test("then result shold be [[6,8],[10,12]] ",()=>{
            const result : number[][]=NumTS.matrixSum([[1,2],[3,4]], [[5,6],[7,8]]);
            expect(result).toStrictEqual([[6,8],[10,12]]);
        });
    });
});
describe("matrixElemtWiseMult test",()=>{
    describe("when [[1,2],[3,4]] and [[5,6],[7,8]] are passed",()=>{
        test("then result shold be [[5,12],[21,32]] ",()=>{
            const result : number[][]=NumTS.matrixElemtWiseMult([[1,2],[3,4]], [[5,6],[7,8]]);
            expect(result).toStrictEqual([[5,12],[21,32]]);
        });
    });
});
describe("matrixMultWithSingleValue test",()=>{
    describe("when [[1,2]] and 2 ",()=>{
        test("then result shold be [[2,4]] ",()=>{
           
            const result : number[][]=NumTS.matrixMultWithSingleValue([[1,2]],2);
            expect(result).toStrictEqual([[2,4]]);
        });
    });
});


describe("matrixTransposse test",()=>{
    describe("when [[1,2],[3,4]] ",()=>{
        test("then result shold be [[1,3],[2,4]] ",()=>{
           
            const result : number[][]=NumTS.matrixTransposse([[1,2],[3,4]]);
            expect(result).toStrictEqual([[1,3],[2,4]]);
        });
    });
});
describe("matrixTransposse test",()=>{
    describe("when [[5],[6]] ",()=>{
        test("then result shold be [[5,6]] ",()=>{
            const result : number[][]=NumTS.matrixTransposse([[5],[6]]);
            expect(result).toStrictEqual([[5,6]]);
        });
    });
});

describe("matrixTransposse test",()=>{
    describe("when [[5,6]] ",()=>{
        test("then result shold be [[5],[6]] ",()=>{
            const result : number[][]=NumTS.matrixTransposse([[5,6]]);
            expect(result).toStrictEqual([[5,6]]);
        });
    });
});

describe("matrixTransposse test",()=>{
    describe("when [[6]] ",()=>{
        test("then result shold be [[6]] ",()=>{
        
            const result : number[][]=NumTS.matrixTransposse([[6]]);
            expect(result).toStrictEqual([[6]]);
        });
    });
});

describe("matrixTanh test",()=>{
    describe("when [[1,2]] ",()=>{
        test("then result shold be [[0.7615941559557649,0.9640275800758169]] ",()=>{
        
            const result : number[][]=NumTS.matrixTanh([[1,2]]);
            expect(result).toStrictEqual([[0.7615941559557649,0.9640275800758169]]);
        });
    });
});

describe("matrixTanh test",()=>{
    describe("when [[2],[3]] ",()=>{
        test("then result shold be  [[0.964027580075816],[0.9950547536867305]]",()=>{
        
            const result : number[][]=NumTS.matrixTanh([[2],[3]]);
            expect(result).toStrictEqual([[0.964027580075816],[0.9950547536867305]]);
        });
    });
});

describe("matrixTanh test",()=>{
    describe("when [[10]] ",()=>{
        test("then result shold be [[0.9999999958776927]] ",()=>{
            const result : number[][]=NumTS.matrixTanh([[10]]);
            expect(result).toStrictEqual([[0.9999999958776927]]);
        });
    });
});


describe("matrixTanh test",()=>{
    describe("when [[1,2]] ",()=>{
        test("then result shold be [[0.7615941559557649,0.9640275800758169]] ",()=>{
        
            const result : number[][]=NumTS.matrixTanh([[1,2]]);
            expect(result).toStrictEqual([[0.7615941559557649,0.9640275800758169]]);
        });
    });
});

describe("matrixTanh test",()=>{
    describe("when [[2],[3]] ",()=>{
        test("then result shold be  [[0.964027580075816],[0.9950547536867305]]",()=>{
        
            const result : number[][]=NumTS.matrixTanh([[2],[3]]);
            expect(result).toStrictEqual([[0.964027580075816],[0.9950547536867305]]);
        });
    });
});

describe("matrixTanhPrime test",()=>{
    describe("when [[10]] ",()=>{
        test("then result shold be [[0.9999999958776927]] ",()=>{
            const result : number[][]=NumTS.matrixTanhPrime([[10]]);
            expect(result).toStrictEqual([[0.9999999958776927]]);
        });
    });
});


describe("matrixTanhPrime test",()=>{
    describe("when [[1,2]] ",()=>{
        test("then result shold be [[0.41997434161402614,0.07065082485316443]] ",()=>{
            const result : number[][]=NumTS.matrixTanhPrime([[1,2]]);
            expect(result).toStrictEqual([[0.41997434161402614,0.07065082485316443]]);
        });
    });
});

describe("matrixTanhPrime test",()=>{
    describe("when [[1]] ",()=>{
        test("then result shold be [[0.41997434161402614]] ",()=>{
            const result : number[][]=NumTS.matrixTanhPrime([[1]]);
            expect(result).toStrictEqual([[0.41997434161402614]]);
        });
    });
});

describe("matrixSigmoid test",()=>{
    describe("when [[2],[3]] ",()=>{
        test("then result shold be [[0.07065082485316443],[0.009866037165440211]] ",()=>{
            const result : number[][]=NumTS.matrixSigmoid([[2],[3]]);
            expect(result).toStrictEqual([[0.07065082485316443],[0.009866037165440211]]);
        });
    });
});

describe("mse test",()=>{
    describe("when [[0.1,0.2,0.3]] AND [[0.15,0.23,0.26]] ",()=>{
        test("then result shold be [[0.07065082485316443],[0.009866037165440211]] ",()=>{
            const result : number=NumTS.mse([[0.1,0.2,0.3]],[[0.15,0.23,0.26]]);
            expect(result).toBe(0.004999999999999997);
        });
    });
});

describe("msePrime test",()=>{
    describe("when [[0.1,0.2,0.3]] AND [[0.15,0.23,0.26]] ",()=>{
        test("then result shold be [[-0.033333333333333326,-0.02,0.026666666666666655]] ",()=>{
            const result : number[][]=NumTS.msePrime([[0.1,0.2,0.3]],[[0.15,0.23,0.26]]);
            expect(result).toStrictEqual([[-0.033333333333333326,-0.02,0.026666666666666655]]);
        });
    });
});


describe("matrixSigmoidPrime test",()=>{
    describe("when [[10]] ",()=>{
        test("then result shold be [[0.9999546021312976]] ",()=>{
            const result : number[][]=NumTS.matrixSigmoidPrime([[10]]);
            expect(result).toStrictEqual([[0.9999546021312976]]);
        });
    });
});

describe("matrixSigmoidPrime test",()=>{
    describe("when [[1,2]] ",()=>{
        test("then result shold be [[0.7310585786300049,0.8807970779778823]] ",()=>{
            const result : number[][]=NumTS.matrixSigmoidPrime([[1,2]]);
            expect(result).toStrictEqual([[0.7310585786300049,0.8807970779778823]]);
        });
    });
});

describe("matrixSigmoidPrime test",()=>{
    describe("when [[2],[3]] ",()=>{
        test("then result shold be [[0.8807970779778823],[0.9525741268224334]] ",()=>{
            const result : number[][]=NumTS.matrixSigmoidPrime([[2],[3]]);
            expect(result).toStrictEqual([[0.8807970779778823],[0.9525741268224334]]);
        });
    });
});


describe("matrixLinear test",()=>{
    describe("when [[0.1,0.2,0.3]] and 2.3 ",()=>{
        test("then result shold be [[0.22999999999999998, 0.45999999999999996, 0.69 ] ] ",()=>{
            const result : number[][]=NumTS.matrixLinear([[0.1,0.2,0.3]],2.3);
            expect(result).toBe([[0.22999999999999998, 0.45999999999999996, 0.69 ] ]);
        });
    });
});


describe("matrixLinearPrime test",()=>{
    describe("when [[10]] ",()=>{
        test("then result shold be 1 ",()=>{
            const result : number[][]=NumTS.matrixLinearPrime([[10]]);
            expect(result).toStrictEqual(10);
        });
    });
});

describe("matrixLinearPrime test",()=>{
    describe("when [[1,2]] ",()=>{
        test("then result shold be [[1,2]] ",()=>{
            const result : number[][]=NumTS.matrixLinearPrime([[1,2]]);
            expect(result).toStrictEqual([[1,2]]);
        });
    });
});

describe("matrixLinearPrime test",()=>{
    describe("when [[2],[3]] ",()=>{
        test("then result shold be [[2],[3]] ",()=>{
            const result : number[][]=NumTS.matrixLinearPrime([[2],[3]]);
            expect(result).toStrictEqual([[2],[3]]);
        });
    });
});

describe("binary_cross_entropy test",()=>{
    describe("when [[0.1,0.2,0.3]] AND [[0.15,0.23,0.26]] ",()=>{
        test("then result shold be 1.0285914129336933 ",()=>{
            const result : number=NumTS.binary_cross_entropy([[0.1,0.2,0.3]],[[0.15,0.23,0.26]]);
            expect(result).toBe(1.0285914129336933);
        });
    });
});

describe("binary_cross_entropyPrime test",()=>{
    describe("when [[0.1,0.2,0.3]] AND [[0.15,0.23,0.26]] ",()=>{
        test("then result shold be [ [ -0.05, -0.03, 0.04000000000000001 ] ] ",()=>{
            const result : number[][]=NumTS.binary_cross_entropyPrime([[0.1,0.2,0.3]],[[0.15,0.23,0.26]]);
            expect(result).toBe([ [ -0.05, -0.03, 0.04000000000000001 ] ]);
        });
    });
});


//TODO mATRIX LINEAR TEST
//TODO BINARY CROSS ENTROPHY
//TODO mse Testing