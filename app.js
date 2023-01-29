let display = document.getElementById('display');
let resultDisplay = document.getElementById('displayResult')
let allButtons = document.querySelectorAll('.button');

/* ARRAY OF ELEMENTS */

const numbersArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const symbolsArray = ['/', 'x', '-', '+'];

/* ARRAY OF TOTALS */

let total = [];
let partialTotal = [];

/* STATES */

const states = {
    equal: true,
};

function count(numb) {
    if (Number.isInteger(numb)) {
        return 0;
    } else {
        return numb.toString().split('.')[1].length;
    }
};

function roundNum(n) {
    if(count(n) >= 3){
        return parseFloat((n).toFixed(3)); 
    } else if(count(n) < 3) {
        return n;
    }
};



function calculator(n) {

    let content = n.textContent;
    
    const endOfArr = (n) => n[n.length - 1];
    
    const calculateTwoNum = (n, e) => {
      
        if(e == '+'){       
            return roundNum((n[0] + endOfArr(n)));
        } else if(e == '-') {
            return roundNum(n[0] - endOfArr(n));
        } else if(e == 'x') {
            return roundNum(n[0] * endOfArr(n));
        } else if(e == '/') {
            return roundNum(n[0]  / endOfArr(n));
        }
    };

    const allLogs = () => {
        return (`resultDisplay = ${resultDisplay.textContent}, 
        display = ${display.textContent}, 
        total = ${total}
        partialTotal = ${partialTotal}, 
        Equal state = ${states['equal']}`)
    };

    const clear = () => {
        total = [];
        partialTotal = [];
        display.innerText = '';
        resultDisplay.innerText = '';
        states['equal'] = true;
    };
    

    if(content === 'CLEAR'){

        clear();

    } else if(numbersArray.includes(content) && display.textContent != '0' || content == '.' && endOfArr(partialTotal) !== '.' && !partialTotal.includes('.') && display.textContent !== ''){

        if(resultDisplay.textContent == '') {

            partialTotal.push(content)
            display.innerText = partialTotal.join('');
            console.log(allLogs()); 

        } else if(resultDisplay.textContent !== '' && states['equal'] == true) {
            
            partialTotal.push(content);
            display.innerText = partialTotal.join('');
            
            console.log(allLogs()); 

        } else if(resultDisplay.textContent !== '' && states['equal'] == false && total.length == 3 && content !== '.') {

            console.log(allLogs()); 
            
           

            total = [];
            total.push(parseFloat(display.textContent))
            display.innerText = '';
            partialTotal.push(content);
            display.innerText = partialTotal.join('');
            resultDisplay.innerText = total.join('');
            states['equal'] = true;
            console.log(allLogs()); 
        }
        
        

    } else if(symbolsArray.includes(content)) {

        if(resultDisplay.textContent == '' && display.textContent !== '') {
            partialTotal = [];
            total.push(parseFloat(display.innerText))
            total.push(content)
            resultDisplay.innerText = total.join('')
            display.textContent = '';
            console.log(allLogs()); 
        }else if (resultDisplay.textContent !== '' && states['equal'] == false && total.length == 3) {
            
            partialTotal = [];
            total = [];

            total.push(parseFloat(display.innerText))
            total.push(content)
            resultDisplay.innerText = total.join('')
            display.textContent = '';
            states['equal'] = true;
            console.log(allLogs());   

        } else if(resultDisplay.textContent !== '' && states['equal'] == true && display.textContent !== '' && !symbolsArray.includes(endOfArr(total))) {

            partialTotal = [];
            
            total.push(content)
            total.push(parseFloat(display.innerText))
            
            resultDisplay.innerText = total.join('')
            display.textContent = calculateTwoNum(total, total[1]);;
            console.log(allLogs()); 
            states['equal'] = false; 
        }
        
            
            

    } else if(content == '=' && resultDisplay.textContent !== '' && display.textContent !== '' && states['equal'] == true) {

            if (symbolsArray.includes(endOfArr(total))) {

                states['equal'] = false;
                let lastSymbol = endOfArr(total);
                total.push(parseFloat(display.innerText));
                resultDisplay.innerText = total.join('');
                display.innerText = calculateTwoNum(total, lastSymbol);
                partialTotal = [];
                
                console.log(allLogs()) ;
            }
    }
}


allButtons.forEach((n) => {
    n.addEventListener('click', () => {
       return calculator(n);
    })
})

