    operatorsValue = ['+', '-', '*', '/']; //taking all operators into an array
    $(document).ready(function () { //when the document is ready
        $('.calc-display').val(0); //initlialize the display value to zero 
    });
    $('.calc-display').keydown(function (event) { //whenever a key is pressed inside display box
        keyPressed = event.keyCode || event.which; //capture the key code of keypressed
        allowedKeysArray = [110, 190, 8, 111, 144];
        operatorsArray = [106, 107, 109, 111];
        isAllowed = false; // initialize the key is not allowed to be entered
        if (keyPressed > 47 && keyPressed < 58) { //check if key pressed is 0 to 9 in keyboard

            isAllowed = true; // if true then allow the key to be entered 
        };
        if (keyPressed > 8 && keyPressed < 46) { //
            isAllowed = true;
        }


        if (!isAllowed && (keyPressed > 94 && keyPressed < 106)) { // if key restricted,but keypressed is from numpad
            isAllowed = true; //if true then allow the key to be enterd
        }
        if (!isAllowed && (allowedKeysArray.indexOf(keyPressed) != -1)) { //
            isAllowed = true;
        }
        if (!isAllowed && operatorsArray.indexOf(keyPressed) != -1) {
            isAllowed = true;
        }

        if (isAllowed && keyPressed == 110 && $(this).val().indexOf('.') >= 0) { // if key allowed and 110  key is pressed, then a single decimal value shoud be allowed
            isAllowed = false; 
        }

        if (!isAllowed) { // if key restricted and event is prevented
            event.preventDefault();
            return;
        }

        if ($(this).val().length == 1 && $(this).val() == '0') { //if this refernce is allowed, then any value entered in text box should replace with 0 of single number
            event.preventDefault();
            if ((keyPressed > 47 && keyPressed < 58) || (keyPressed > 94 && keyPressed < 106)) { // check if key pressed from keyboard 0 to 9 and numpad keys from 0 to 9
                $(this).val(event.key) // if this is passed, then event shoud execute 
            }
            if (keyPressed == 110) { 
                $(this).val('0.');
            }
            return;
        }
        if (operatorsArray.indexOf(keyPressed) != -1) {

            value = $(this).val();
            lastcharacter = value[value.length - 1];
            if (event.key == lastcharacter) {
                event.preventDefault();
            } else if (operatorsValue.indexOf(lastcharacter) != -1) {
                event.preventDefault();
                removelastcharacter = $(this).val().substring(0, value.length - 1);
                console.log('removelastcharacter', removelastcharacter);
                $(this).val(removelastcharacter + event.key)
            }

        }
        if (keyPressed == 13) {
            calculate();
        }
    });
    $('.calc-display').keyup(function (event) {
        if (!$(this).val()) {
            $(this).val(0);
        }
    })

    function calculate() {
        calculation = $('.calc-display').val();
        console.log('calculation', calculation);
        for (var i = 0; i < operatorsValue.length; i++) {
            splitcalculation = calculation.split(operatorsValue[i]);
            if (operatorsValue[i] == '+' && splitcalculation.length == 2) {
                add(splitcalculation);
            }
            if (operatorsValue[i] == '-' && splitcalculation.length == 2) {
                subtract(splitcalculation);
            }
            if (operatorsValue[i] == '*' && splitcalculation.length == 2) {
                multiply(splitcalculation);
            }
            if (operatorsValue[i] == '/' && splitcalculation.length == 2) {
                divide(splitcalculation);
            }
        }
        console.log('splitcalculation', splitcalculation);
    }

    function add(values) {
        result = parseInt(values[0]) + parseInt(values[1]);
        displayresult(result);
    }

    function subtract(values) {
        result = parseInt(values[0]) - parseInt(values[1]);
        displayresult(result);
    }

    function multiply(values) {
        result = parseInt(values[0]) * parseInt(values[1]);
        displayresult(result);
    }

    function divide(values) {
        result = parseInt(values[0]) / parseInt(values[1]);
        displayresult(result);
    }

    function displayresult(result) {
        $('.calc-display').val(result);
    }

$('.btn-calculator').click(function(event){
    btnValue=$(this).text();
  if(checkFirstDisplayValue(btnValue)){
      event.preventDefault();
      event.stopPropagation();
      return;
  }
    if(btnValue=='='){   
        calculate();
        return;
    }
    calcDisplay=$('.calc-display').val();
    newDisplayValue=calcDisplay+btnValue;
    $('.calc-display').val(newDisplayValue);
    
})

function checkFirstDisplayValue(btnValue){
    isValueSet=false;
 displayValue=$('.calc-display').val();
    if(displayValue.length> 1){
         isValueSet=false;
    }
    if(displayValue==0){
        $('.calc-display').val(btnValue);
        isValueSet=true;
    }
    return isValueSet;
}











































