pragma circom 2.0.0;


template Adder() {  

    signal input a;  
    signal input b;  
    signal output c;
    signal tmp;
    tmp<==a*b;  
    c<==tmp*0+a+b;
}

component main = Adder();
