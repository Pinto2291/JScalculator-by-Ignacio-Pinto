let down_display = document.getElementById('display');
let up_display = document.getElementById('displayResult')
let allButtons = document.querySelectorAll('.button');
let back_delete = document.querySelector('.back');

/* ARRAY OF ELEMENTS */

const numbersArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const symbolsArray = ['/', 'x', '-', '+'];

/* STATE */

const states = {
    symbol: true,
}

/* TOTALS */

let total = [];
let finalTotal = [];

/* FUNCTIONS */

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

function calculateTwoNumbers(n) {
    let symbol = n[1];
    let firstN = parseFloat(n[0]);
    let secondN = parseFloat(n[2]);

    if(symbol == '+'){
        return (firstN + secondN);
    } else if(symbol == '-'){
        return (firstN  - secondN);
    } else if(symbol == 'x'){
        return (firstN  * secondN);
    } else if(symbol == '/'){
        return (firstN  / secondN);
    }
};

function deleteLastDigit(){
    total.pop()
    down_display.textContent = total.join('')
}

function calculator(n) {

    let content = n.textContent;
    
    function clear() {
        total = [];
        finalTotal = [];
        down_display.innerText = '';
        up_display.innerText = '';
        states['symbol'] = true;
        console.log(total, down_display.textContent, states['symbol'], finalTotal);
    };
    

    function showAll(){
        return`total = ${total}
down_display = ${down_display.textContent}`;
    }

    if(numbersArray.includes(content)){
        
        if(content != '.' && (down_display.textContent !== '0') || content == '.' && total.length > 0 && !total.includes('.')){

            total.push(content)
            down_display.textContent = total.join('');
            
        } 

    } else if(symbolsArray.includes(content) && down_display.textContent !== '' && states['symbol'] == true){

            total = [];
            finalTotal.push(parseFloat(down_display.textContent))
            down_display.textContent = '';
            finalTotal.push(content);
            up_display.textContent = finalTotal.join(' '); 
            states['symbol'] = false;
            
        

    } else if(content == '=' && states['symbol'] == false && parseFloat(down_display.textContent) > 0 && finalTotal.length >= 2 && finalTotal.length <= 3) {
        
        total = [];
        finalTotal.push(parseFloat(down_display.textContent));
        down_display.textContent = '';
        up_display.textContent = `${finalTotal.join(' ')} = ${roundNum(calculateTwoNumbers(finalTotal))}`;
        down_display.textContent = roundNum(calculateTwoNumbers(finalTotal));
        console.log(finalTotal)
        finalTotal = [];
        states['symbol'] = true;


    } else if (content == 'CLEAR'){
        clear();  

    }
    

}


allButtons.forEach((n) => {n.addEventListener('click', () => calculator(n) )})

back_delete.addEventListener('click', () => { deleteLastDigit() })
